import {AppContext, QueryFilters} from "index";
import {Client} from "../../models/Clients";
import Logger from "../../utils/logger/logger";
import {GraphQlRuntimeException} from "../../exceptions";

interface ClientArgs {
    filters?: QueryFilters | null;
}

interface ClientResponse extends Client {
}

const ClientsResolver = {
    Query: {
        clients: async (
            parent: Object,
            args: ClientArgs,
            {services}: AppContext
        ): Promise<Array<ClientResponse>> => {
            try {
                const data = await services.ClientsService.getClients(args.filters || {});
                return data.data;
            } catch (e) {
                Logger.error("Error in ClientsResolver:: unable to get clients: " + e);
                throw new GraphQlRuntimeException("Error in ClientsResolver:: unable to get clients", e);
            }
        },
    },
};

export default ClientsResolver;
