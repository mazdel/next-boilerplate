import globalConfig from "@/configs/global";
import * as jose from "jose";

export class AuthError extends Error {}
/**
 * Asynchronously create a JWT
 * @param {Object} payload payload to be inserted
 * @returns {Promise<string>} Promise of token signed JWT
 */
export const AuthSign = async (payload) => {
  const secret = new TextEncoder().encode(globalConfig.secret);
  try {
    const result = await new jose.SignJWT(payload)
      .setExpirationTime(globalConfig.JWT.exp)
      .setIssuedAt()
      .setProtectedHeader({ alg: globalConfig.JWT.alg })
      .sign(secret);
    return result;
  } catch (error) {
    throw new Error("failed to sign the payload");
  }
};
/**
 * Decode a token without verify it
 * @param {string} token JWT to be decoded
 * @returns {Object} Payload of the JWT
 */
export const AuthDecode = (token) => {
  return jose.decodeJwt(token);
};

/**
 * Verify JWT auth token from NextRequest cookie
 * @param {string} token token to be verified
 * @returns {Promise<JWTVerifyResult<PayloadType>>>}
 */
export const AuthVerify = async (token) => {
  const secret = new TextEncoder().encode(globalConfig.secret);
  try {
    const verified = await jose.jwtVerify(token, secret);
    return verified.payload;
  } catch (error) {
    throw new AuthError("Token has Expired");
  }
};
