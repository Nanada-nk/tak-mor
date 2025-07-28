import jwt from 'jsonwebtoken';

const jwtService = {};

// ✅ กระชับขึ้น
jwtService.genAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: "15m"
    });
};

// ✅ กระชับขึ้น
jwtService.genRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

// ✅ กระชับขึ้น
jwtService.verifyToken = (token, secret) => {
    return jwt.verify(token, secret, {
        algorithms: ['HS256']
    });
};

export default jwtService;