import {NextFunction, Request, Response} from 'express';
import {decodeJWT, JWTPayload} from 'src/services/jwt';

declare module 'express' {
  export interface Request {
    auth?: {
      user?: JWTPayload;
      error?: Error;
    };
  }
}

const authMiddleware = () => {
  return function (req: Request, res: Response, next: NextFunction) {
    const jwtPayloadResult = decodeJWT(req.cookies.ACCESS_TOKEN);
    if (jwtPayloadResult instanceof Error) {
      req.auth = {
        error: jwtPayloadResult,
      };
    } else {
      if(!jwtPayloadResult.isRefreshToken) {
        req.auth = {
          user: jwtPayloadResult,
        };
      }
    }

    next();
  };
};

export default authMiddleware;
