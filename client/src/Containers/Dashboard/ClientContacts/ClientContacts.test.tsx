import React from "react";
import {act} from "react-dom/test-utils";
import Enzyme, {mount, render} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {HashRouter as Router} from "react-router-dom";
import {MockedProvider, wait} from "@apollo/react-testing";
import ClientContacts from "./ClientContacts";
import {QUERY_CLIENT_CONTACTS} from "../../../schema/query";

Enzyme.configure({adapter: new Adapter()});

describe("Check for ClientContacts", () => {

    beforeEach(() => {
        jest.setTimeout(10000);
    });

    it("should render without error", () => {
        render(
            <MockedProvider mocks={[]}>
                <Router>
                    <ClientContacts/>
                </Router>
            </MockedProvider>
        );
    });

    it("should render and fetch client contacts", async () => {

        const mockClientData = [
            {
                industry: "",
                name: "Abhishek",
                title: "Home",
                companyName: "Awesome",
                address: "Pune",
                createdAt: "23-03-2020"
            },
            {
                name: "Vivek",
                industry: "",
                title: "Home",
                companyName: "Awesome",
                address: "Pune",
                createdAt: "23-03-2020"
            }
        ];

        let clientQueryCalled = false;

        const clientContactsMocks = {
            request: {query: QUERY_CLIENT_CONTACTS},
            result: () => {
                clientQueryCalled = true;
                return {
                    data: {
                        clients: mockClientData
                    }
                }
            }
        };

        await act(async () => {
            const component = mount(
                <MockedProvider mocks={[clientContactsMocks]} addTypename={false}>
                    <Router>
                        <ClientContacts/>
                    </Router>
                </MockedProvider>
            );

            await wait(0);
            component.update();

            const componentClientData = component.childAt(0).childAt(0).childAt(0).childAt(0).childAt(0).prop("clientContact");

            expect(clientQueryCalled).toBe(true);
            expect(componentClientData).toEqual(mockClientData);
        });
    });

});