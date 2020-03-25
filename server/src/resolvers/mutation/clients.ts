import {AppContext} from "index";
import {Client} from "../../models/Clients";
import Logger from "../../utils/logger/logger";
import {GraphQlRuntimeException} from "../../exceptions";

interface AddClientInput {
    client: Client
}

interface ClientMutationResponse extends Client {
}

const ClientsResolver = {
    Mutation: {
        addClient: async (
            parent: Object,
            args: AddClientInput,
            {services}: AppContext
        ): Promise<ClientMutationResponse> => {
            try {
                const data = await services.ClientsService.addClient(args.client);
                return data.data;
            } catch (e) {
                Logger.error("Error in addClient: " + e);
                throw new GraphQlRuntimeException("Error in addClient", e);
            }
        }
    },
};

export default ClientsResolver;
