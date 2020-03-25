import React, {FC} from "react";
import cloneDeep from "lodash/cloneDeep";
import MaterialTable, {Column, MaterialTableProps} from "material-table";
import {Client} from "../../../types";

export interface Props {
    clientContact: Array<Client>;
    showLoader: boolean;
    tableProps?: Partial<MaterialTableProps<Array<Client>>>;
}

const ClientsContactTableColumns: Column<Client>[] = [
    {title: "Contact Name", field: "name", filtering: true, searchable: false,},
    {title: "Contact Title", field: "title", filtering: false, searchable: true},
    {title: "Company Name", field: "companyName", filtering: true, searchable: false},
    {title: "Address", field: "address", filtering: false, searchable: true},
    {title: "Industry", field: "industry", filtering: true, searchable: false}
];

const ClientsContact: FC<Props> = (props: Props) => {
    const {
        showLoader,
        tableProps,
        clientContact
    } = props;

    let tableOtherProps = {
        ...tableProps
    };

    const cloneClientContact = cloneDeep(clientContact);

    return (
        <MaterialTable
            title="Client Contacts"
            isLoading={showLoader}
            columns={ClientsContactTableColumns}
            data={cloneClientContact}
            options={{
                filtering: true,
            }}
            {...tableOtherProps}
        />
    );
};

export default React.memo(ClientsContact);
