import React, {FC} from "react";
import Dashboard from "../../Containers/Dashboard/Dashboard";

const DashboardPage: FC = ({children}) => {
    return (
        <Dashboard>
            {children}
        </Dashboard>
    )
}
export default DashboardPage;