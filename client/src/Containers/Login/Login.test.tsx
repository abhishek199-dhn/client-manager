import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {HashRouter as Router} from "react-router-dom";
import {MockedProvider} from "@apollo/react-testing";
import {fireEvent, act, wait, render} from '@testing-library/react';
import Login from "./Login";
import LoginUtils from "../../utils/LoginUtils";
import {MUTATION_LOGIN} from "../../schema/mutation";

Enzyme.configure({adapter: new Adapter()});

describe("Check for Login", () => {

    beforeEach(() => {
        jest.setTimeout(10000);
    });

    it("should render without error", () => {
        render(
            <MockedProvider mocks={[]}>
                <Router>
                    <Login/>
                </Router>
            </MockedProvider>
        );
    });

    it("should render and does login", async () => {

        const loginMutationData = {
            token: "jdjfldlklnknknalksnlndlnvandvlnklnvlka.slvnsalvnlkndlv.sadjvnalsvnalsnvl"
        };

        let loginMutationCalled = false;

        const loginMocks = {
            request: {
                query: MUTATION_LOGIN,
                variables: {
                    auth: {
                        username: "abhishek",
                        password: "kumar"
                    }
                },
            },
            result: () => {
                loginMutationCalled = true;
                return {
                    data: {
                        login: loginMutationData
                    }
                }
            }
        };

        await act(async () => {
            const {getByTestId} = render(
                <MockedProvider mocks={[loginMocks]} addTypename={false}>
                    <Router>
                        <Login/>
                    </Router>
                </MockedProvider>
            );

            // Fill in the email field
            fireEvent.change(
                await getByTestId("username-text-field").getElementsByTagName("input")[0],
                {
                    target: {
                        value: "abhishek",
                    },
                }
            );

            // Fill in the password field
            fireEvent.change(
                await getByTestId("password-text-field").getElementsByTagName("input")[0],
                {
                    target: {
                        value: "kumar",
                    },
                }
            );

            // Click the submit button
            await wait(async () =>
                fireEvent.click(await getByTestId("login-button")),
            );

            await wait(async () => {
                expect(loginMutationCalled).toBe(true);
                expect(loginMutationData.token).toBe(LoginUtils.getToken());
            });
        });
    });
});