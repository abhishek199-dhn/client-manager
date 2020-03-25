import {getClientHistoryDbConnector} from "../src/connectors";

beforeEach(() => {
    jest.setTimeout(3000);
});

it("Check Mongo Db connection", async (done) => {
    try {
        await getClientHistoryDbConnector().connect();
        done();
    } catch (e) {
        throw new Error(e);
    }
});