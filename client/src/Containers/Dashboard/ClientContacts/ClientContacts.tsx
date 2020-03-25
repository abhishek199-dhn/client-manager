import React, {FC} from "react";
import {useQuery} from "@apollo/react-hooks";
import {Client} from "../../../types";
import {QUERY_CLIENT_CONTACTS} from "../../../schema/query";
import ClientsContact from "../../../components/Dashboard/ClientsContact/ClientsContact";

export interface ClientContactsResponse {
    clients: Client[]
}

const ClientContacts: FC = () => {
    const {loading, data} = useQuery<ClientContactsResponse>(QUERY_CLIENT_CONTACTS);

    const clientContact = data && data.clients ? data.clients : [];
    return (
        <ClientsContact
            showLoader={loading}
            clientContact={clientContact}
        />
    )
}

export default ClientContacts;