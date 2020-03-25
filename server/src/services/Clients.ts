import {QueryFilters} from "index";
import {Client, ClientDoc} from "../models/Clients";
import BaseService, {BaseServiceOptions} from "./BaseService";

export interface ClientsServiceOptions extends BaseServiceOptions<ClientDoc> {
}

class ClientsService extends BaseService<ClientDoc> {
    constructor(options: ClientsServiceOptions) {
        super(options);
    }

    getClients = async (filters: QueryFilters) => {
        return this.getAll(filters);
    };

    addClient = (data: Client) => {
        return this.insert(<ClientDoc>data)
    };
}

export default ClientsService;