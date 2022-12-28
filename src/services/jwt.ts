import {Jwt, JwtPayload, sign, verify, decode} from 'jsonwebtoken';
import {ulid} from 'ulid';
import CONFIG from '../config/environments';
import {readFileSync} from 'fs';
import {resolve} from 'path';

/**
 * To Generate private and public keys @see https://rietta.com/blog/openssl-generating-rsa-key-from-command/
 */

export interface JWTPayload {
  id: string;
  isRefreshToken?: boolean;
  verificationId?: string;
}

type JWTData = JwtPayload & {data: JWTPayload }

const PRIVATE_KEY = readFileSync(resolve('keys', 'private.pem'), "utf8");
const PUBLIC_KEY = readFileSync(resolve('keys', 'public.pem'), "utf8");

function encodeJWT(payload: JWTPayload, expiresIn: string): string {
  return sign(
    {
      payload,
    },
    {
      key: PRIVATE_KEY,
      passphrase: CONFIG.JWT_KEY_PHRASE,
    },
    {
      algorithm: 'RS256',
      jwtid: ulid(),
      expiresIn,
      issuer: 'POLvsARG_Ahmed_Visa',
    }
  );
}

function decodeJWT(token: string): JWTPayload | Error  {
  let jwtPayload: JWTData;

  try {
   jwtPayload = verify(token, PUBLIC_KEY) as JWTData;
  } catch (error) {
    return error as Error
  }

  return jwtPayload.payload
}

export {encodeJWT, decodeJWT};
