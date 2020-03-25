import React from "react";
import ReactDOM from "react-dom";
import {ApolloLink} from "apollo-link";
import {onError} from "apollo-link-error";
import {ApolloClient} from "apollo-client";
import {setContext} from "apollo-link-context";
import {createHttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks";
import Routes from "./routes";
import App from "./Pages/App/App";
import LoginUtils from "./utils/LoginUtils";
import * as serviceWorker from "./serviceWorker";
import "./styles/index.scss";

const graphQLURL = process.env.REACT_APP_GRAPHQL_ENDPOINT;

const authLink = setContext((_, {headers}) => {
    const token = LoginUtils.getToken();

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : null,
        }
    };
});

const graphqlClient = new ApolloClient({
    link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
                graphQLErrors.forEach(({extensions, message, locations, path}) => {
                        console.log(
                            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                        );
                        if (!path?.includes("login") && extensions && extensions.code === "UNAUTHENTICATED") {
                            // This route will clear some global state, then redirect to the Sign In route
                            LoginUtils.logout();
                            window.location.reload();
                        }
                    }
                );
            }
            if (networkError) {
                console.log(`[Network error]: ${networkError}`);
            }
        }),
        authLink,
        createHttpLink({
            uri: graphQLURL,
            credentials: "same-origin"
        }),
    ]),
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={graphqlClient}>
        <App>
            <Routes/>
        </App>
    </ApolloProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
