import twilio from 'twilio'
import createError from '../utils/create-error.js'

const {AccessToken} = twilio.jwt
const {VideoGrant} = AccessToken

const twilioService = {}

twilioService.generateVideoCallToken = (identity, roomName) => {

}

export default twilioService