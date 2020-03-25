import config from "config";
import {AppContext} from "index";
import {AuthenticationError} from "apollo-server";
import Logger from "../../utils/logger/logger";

interface AddUsersInput {
    auth: {
        username: string;
        password: string
    }
}

interface AuthResponse {
    token: string
}

const tokenCookieKey: string = config.get("jwt.tokenCookieKey");
const tokenMaxAge: number = config.get("jwt.tokenMaxAge");

const AuthResolver = {
    Mutation: {
        login: async (
            parent: Object,
            args: AddUsersInput,
            {services, aclContext, request}: AppContext
        ): Promise<AuthResponse> => {
            try {
                const data = await services.UsersService.isAuthenticated(
                    args.auth.username,
                    args.auth.password
                );

                if (data && data.isVerified) {

                    const token = aclContext.authenticator.generateUserToken({
                        userId: data.user._id
                    });

                    if (token) {
                        // @ts-ignore
                        request.res.cookie(tokenCookieKey, token, {
                            httpOnly: true,
                            maxAge: tokenMaxAge,
                            domain: "localhost",
                            secure: process.env.NODE_CONFIG_ENV === "production"
                        });
                    }

                    return {
                        token
                    };
                }

                throw new AuthenticationError("Authentication Error");
            } catch (e) {
                Logger.error("Error while Login: " + e);
                throw new AuthenticationError("Token creation failed");
            }
        },
    },
};

export default AuthResolver;
