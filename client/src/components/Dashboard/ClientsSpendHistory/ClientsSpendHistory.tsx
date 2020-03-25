import cloneDeep from "lodash/cloneDeep";
import React, {FC, useCallback} from "react";
import MaterialTable, {Column, MaterialTableProps} from "material-table";
import {ClientSpends} from "../../../types";

export type OnSpendsUpdatedFn = (updatedIndex: number, clientSpends: ClientSpends) => void;

export interface ListenerProps {
    onSpendsUpdated?: OnSpendsUpdatedFn;
}

export interface Props extends ListenerProps {
    showLoader: boolean;
    clientSpends: Array<ClientSpends>;
    tableProps?: Partial<MaterialTableProps<Array<ClientSpends>>>;
}

const ClientSpendsTableColumns: Column<ClientSpends>[] = [
    {title: "TransactionId", field: "_id", filtering: false, searchable: true, editable: "never"},
    {title: "Items Purchased", field: "itemsPurchased", filtering: false, searchable: false, editable: "never"},
    {title: "Merchant", field: "merchant", filtering: false, searchable: true, editable: "never"},
    {title: "Amount", field: "amount", type: "numeric", filtering: false, searchable: false, editable: "onUpdate"},
    {
        title: "Date of Transaction",
        field: "createdAt",
        type: "date",
        filtering: true,
        searchable: false,
        editable: "never"
    }
];

const ClientsSpendHistory: FC<Props> = (props: Props) => {
    const {
        showLoader,
        tableProps,
        onSpendsUpdated,
        clientSpends
    } = props;

    let tableOtherProps = {
        ...tableProps
    };

    const cloneClientSpends = cloneDeep(clientSpends);

    const memoOnSpendsUpdated = useCallback(
        async (newData: ClientSpends, oldData?: ClientSpends) => {
            if (oldData && typeof onSpendsUpdated === "function") {
                onSpendsUpdated(cloneClientSpends.indexOf(oldData), newData);
            }
        },
        [onSpendsUpdated, cloneClientSpends]
    );

    return (
        <MaterialTable
            title="Client Spends"
            isLoading={showLoader}
            columns={ClientSpendsTableColumns}
            data={cloneClientSpends}
            options={{
                filtering: true,
            }}
            editable={{
                onRowUpdate: memoOnSpendsUpdated
            }}
            {...tableOtherProps}
        />
    );
};

export default React.memo(ClientsSpendHistory);
