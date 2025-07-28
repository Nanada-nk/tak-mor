import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import crypto from 'crypto';

import authService from '../services/auth.service.js';
import hashService from '../services/hash.service.js';
import generateHN from '../utils/generateHN.js';
import createError from '../utils/create-error.js';

/**
 * ----------------------------------------------------------------
 * Local Strategy (สำหรับ Login ด้วย Email/Password)
 * ----------------------------------------------------------------
 */
passport.use(new LocalStrategy(
    {
        usernameField: 'email', // บอก Passport ว่าเราใช้ 'email' แทน 'username'
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await authService.findAccountByEmail(email);

            // กรณีไม่พบ User หรือ Password ไม่ถูกต้อง
            if (!user) {
                return done(null, false, { message: 'Invalid email or password.' });
            }

            const isMatch = await hashService.comparePassword(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid email or password.' });
            }

            // ถ้าทุกอย่างถูกต้อง ส่ง user กลับไป
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

/**
 * ----------------------------------------------------------------
 * Google OAuth 2.0 Strategy
 * ----------------------------------------------------------------
 */
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback" // URL ที่ Google จะ redirect กลับมา
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;

        let user = await authService.findAccountByEmail(email);

        if (user) {
            // ถ้ามี User อยู่แล้ว แต่ยังไม่ได้ผูก Google ID
            if (!user.googleId) {
                user = await authService.linkGoogleToAccount(user.id, googleId);
            }
        } else {
            // ถ้าไม่มี User ให้สร้างใหม่
            const randomPassword = crypto.randomBytes(32).toString('hex');
            const hashedPassword = await hashService.hash(randomPassword);

            // สร้าง Account หลัก
            user = await authService.createAccount({
                email,
                password: hashedPassword,
                googleId: googleId,
                role: 'PATIENT' // กำหนดค่าเริ่มต้นเป็น PATIENT
            });

            // สร้าง Patient Profile ที่ผูกกัน
            await authService.createPatientProfile({
                accountId: user.id,
                hn: generateHN(),
                firstName,
                lastName
            });
        }
        
        // ส่ง user ที่สมบูรณ์กลับไป
        return done(null, user);
    } catch (err) {
        return done(err);
    }
  }
));


/**
 * ----------------------------------------------------------------
 * Facebook Strategy
 * ----------------------------------------------------------------
 */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name'] // ขอข้อมูล email และชื่อจาก Facebook
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const facebookId = profile.id;
        const firstName = profile.name.givenName;
        const lastName = profile.name.familyName;

        if (!email) {
            return done(createError(400, "Could not retrieve email from Facebook."), false);
        }

        let user = await authService.findAccountByEmail(email);

        if (user) {
            // ถ้ามี User อยู่แล้ว แต่ยังไม่ได้ผูก Facebook ID
             if (!user.facebookId) {
                user = await authService.linkFacebookToAccount(user.id, facebookId);
            }
        } else {
            // ถ้าไม่มี User ให้สร้างใหม่
            const randomPassword = crypto.randomBytes(32).toString('hex');
            const hashedPassword = await hashService.hash(randomPassword);

            user = await authService.createAccount({
                email,
                password: hashedPassword,
                facebookId: facebookId,
                role: 'PATIENT' // กำหนดค่าเริ่มต้นเป็น PATIENT
            });

            await authService.createPatientProfile({
                accountId: user.id,
                hn: generateHN(),
                firstName,
                lastName
            });
        }
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
  }
));


/**
 * ----------------------------------------------------------------
 * Session Management (Serialize/Deserialize)
 * ----------------------------------------------------------------
 */

// ฟังก์ชันนี้จะถูกเรียกหลังจากการยืนยันตัวตนสำเร็จ
// เพื่อบอกว่าควรจะเก็บข้อมูลอะไรของผู้ใช้ไว้ใน session
// เราจะเก็บแค่ ID เพื่อให้ session มีขนาดเล็ก
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// ฟังก์ชันนี้จะถูกเรียกในทุกๆ request ที่มี session
// เพื่อดึงข้อมูลผู้ใช้ทั้งหมดจาก ID ที่เก็บไว้ใน session
// ข้อมูลที่ได้จะไปอยู่ใน `req.user`
passport.deserializeUser(async (id, done) => {
    try {
        const user = await authService.findAccountById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});