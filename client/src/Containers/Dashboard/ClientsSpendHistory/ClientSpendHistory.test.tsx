import React from "react";
import {act} from "react-dom/test-utils";
import Enzyme, {mount, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {HashRouter as Router} from "react-router-dom";
import {MockedProvider, wait} from "@apollo/react-testing";
import ClientsSpendHistory from "./ClientsSpendHistory";
import {QUERY_CLIENT_TRANSACTIONS} from "../../../schema/query";

Enzyme.configure({adapter: new Adapter()});

describe("Check for ClientSpendHistory", () => {

    beforeEach(() => {
        jest.setTimeout(10000);
    });

    it("should render without error", () => {
        render(
            <MockedProvider mocks={[]}>
                <Router>
                    <ClientsSpendHistory/>
                </Router>
            </MockedProvider>
        );
    });

    it("should render and fetch client spends", async () => {

        const mockClientTransactionsData = [
            {
                _id: "5e790aaa0293e029544b8ee8",
                itemsPurchased: "Tv",
                merchant: "Flipkart",
                clientId: "1",
                amount: 50.255,
                createdAt: "03-24-2020"
            },
            {
                _id: "5e79292df916164080def61b",
                itemsPurchased: "Tv",
                merchant: "Amazon",
                clientId: "1",
                amount: 5000,
                createdAt: "03-24-2020"
            }
        ];

        let clientQueryCalled = false;

        const clientSpendsMocks = {
            request: {query: QUERY_CLIENT_TRANSACTIONS},
            result: () => {
                clientQueryCalled = true;
                return {
                    data: {
                        clientTransactions: mockClientTransactionsData
                    }
                }
            }
        };

        await act(async () => {
            const component = mount(
                <MockedProvider mocks={[clientSpendsMocks]} addTypename={false}>
                    <Router>
                        <ClientsSpendHistory/>
                    </Router>
                </MockedProvider>
            );

            await wait(0);
            component.update();

            const componentClientData = component.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).prop("clientSpends");

            expect(clientQueryCalled).toBe(true);
            expect(componentClientData).toEqual(mockClientTransactionsData);
        });
    });
});