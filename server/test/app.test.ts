// @ts-ignore
import config from "config";
import gql from "graphql-tag";
import {createTestClient} from "apollo-server-testing";
import {ApolloServer} from "apollo-server";
import typeDefs from "../src/schemas";
import resolvers from "../src/resolvers";
import {AppConfig} from "../src/types";

describe("Check for Graphql Server", () => {

    it("Check if server crashes or not", async () => {

        let port = 3005; // default port
        const appConfig: AppConfig = config.get("app");

        // get port from config.
        if (appConfig && appConfig.port) {
            port = appConfig.port;
        }

        const GET_BLANK_QUERY = gql`
            query {
                _blank
            }
        `;

        const mocks = {
            String: () => "Hello",
        };

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            mocks,
            context: async ({req}: any) => {
                return {
                    request: req
                };
            }
        });

        // use the test server to create a query function
        const {query} = createTestClient(server);

        // run query against the server and snapshot the output
        const res = await query({query: GET_BLANK_QUERY});
        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res.data._blank).toBe("Hello");
        expect(res.errors).not.toBeDefined();
    });

    it("Check for clientTransaction api", async () => {

        let port = 3005; // default port
        const appConfig: AppConfig = config.get("app");

        // get port from config.
        if (appConfig && appConfig.port) {
            port = appConfig.port;
        }

        const QUERY_CLIENT_TRANSACTIONS = gql`
            query {
                clientTransactions {
                    amount
                    merchant
                    clientId
                }
            }
        `;

        const data = [{
            amount: 10,
            merchant: "Flipkart",
            clientId: "1"
        }];

        const mocks = {
            Query: () => ({
                clientTransactions: () => [...data]
            }),
        };

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            mocks,
            context: async ({req}: any) => {
                return {
                    request: req
                };
            }
        });

        // use the test server to create a query function
        const {query} = createTestClient(server);

        // run query against the server and snapshot the output
        const res = await query({query: QUERY_CLIENT_TRANSACTIONS});
        expect(res).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res.data.clientTransactions).toEqual(data);
        expect(res.errors).not.toBeDefined();
    });
})