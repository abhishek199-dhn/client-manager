import jwt, {
    Secret,
    VerifyOptions,
    VerifyErrors,
    SignOptions
} from "jsonwebtoken";
import {IncomingHttpHeaders} from "http";

export interface AuthenticatorOptions {
    secretKey: Secret,
    jwtVerifyOptions?: VerifyOptions
    jwtSignOptions: SignOptions
}

export interface JwtData {
    header: Object,
    payload: Object,
    signature: string
}

class Authenticator {
    options: AuthenticatorOptions;

    constructor(options: AuthenticatorOptions) {
        if (typeof options === "object") {
            this.options = options;
        } else {
            throw new Error("options required of type Authenticator");
        }
    }

    getTokenFromHeaders = (headers: IncomingHttpHeaders) => {
        try {
            const tokenWithBearer = headers.authorization || "";
            return tokenWithBearer.split(" ")[1];
        } catch (e) {
            return null;
        }
    };

    verifyToken = (token: string): Promise<JwtData> => {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.options.secretKey,
                this.options.jwtVerifyOptions,
                (error: VerifyErrors, decoded: JwtData) => {
                    if (error) {
                       return resolve(null);
                    }
                    resolve(decoded);
                }
            );
        });
    };

    generateUserToken = (payload: Object): string => {
        return jwt.sign(payload, this.options.secretKey, this.options.jwtSignOptions);
    }
}

export default Authenticator;