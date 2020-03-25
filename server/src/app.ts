import config from "config";
import {AppConfig} from "index";
import {Secret} from "jsonwebtoken";
import {ApolloServer} from "apollo-server";
import typeDefs from "./schemas";
import resolvers from "./resolvers";
import getServices from "./services";
import Logger from "./utils/logger/logger";
import {isProductionEnv} from "./utils/utils";
import Authenticator from "./utils/Authenticator";
import AuthDirective from "./directives/AuthDirective";
import DateFormatDirective from "./directives/DateFormatDirective";

(async function () {
    try {
        let port = 3005; // default port
        const appConfig: AppConfig = config.get("app");

        const issuer: string = config.get("jwt.issuer");
        const secretKey: Secret = config.get("jwt.secret");
        const expiresIn: string = config.get("jwt.expiresIn");
        const tokenCookieKey: string = config.get("jwt.tokenCookieKey");

        // get port from config.
        if (appConfig && appConfig.port) {
            port = appConfig.port;
        }

        const authenticator = new Authenticator({
            secretKey: secretKey,
            jwtVerifyOptions: {
                issuer
            },
            jwtSignOptions: {
                issuer,
                expiresIn
            }
        });

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            schemaDirectives: {
                auth: AuthDirective,
                date: DateFormatDirective
            },
            debug: !isProductionEnv(), // enabled only in dev env
            introspection: true,
            tracing: true,
            context: async ({req}) => {

                // get the user token from the headers
                let token = authenticator.getTokenFromHeaders(req.headers);

                // if not then from cookie
                if (!token && req.cookies) {
                    token = req.cookies[tokenCookieKey];
                    req.headers = {
                        ...req.headers,
                        Authorization: `Bearer ${token}`
                    };
                }

                return {
                    request: req,
                    services: getServices(),
                    aclContext: {
                        token,
                        authenticator
                    }
                };
            },
            formatError: (error: Error) => {
                Logger.error("GraphQL error: " + error);
                return error;
            },
            formatResponse: (response: any, query: any) => {
                if (
                    query &&
                    query.context &&
                    query.context.request &&
                    query.context.request.body &&
                    query.context.request.body.operationName
                ) {
                    const info = JSON.stringify({
                        query: query.context.request.body.query,
                        variables: query.context.request.body.variables
                    });

                    Logger.info("GraphQL request: " + info);
                }
                return response;
            },
            onHealthCheck: () => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            },
        });

        server.listen({port: port}).then(({url}: { url: string }) => {
            Logger.info(
                `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
            );
            Logger.info(
                `Try your health check at: http://localhost:${port}/.well-known/apollo/server-health`
            );
        });

    } catch (e) {
        Logger.error("App initialization failed. " + e);
        process.exit(1);
    }
})();
