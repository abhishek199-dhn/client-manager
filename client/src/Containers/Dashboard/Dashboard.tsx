import {useHistory, useLocation} from "react-router-dom";
import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react";
import DashboardView, {DashboardViewType} from "../../components/Dashboard/Dashboard";

const Dashboard: FC = ({children}) => {

    const history = useHistory();
    const location = useLocation();

    const [selectVal, setSelectVal] = useState<DashboardViewType>("clientSpends")

    useEffect(() => {
        if (location.pathname.includes("clientSpends")) {
            setSelectVal("clientSpends");
        } else if (location.pathname.includes("clientContacts")) {
            setSelectVal("clientContacts");
        }
    }, [location]);

    const memoOnSelectChange = useCallback(
        (event: ChangeEvent<{ name?: string; value: DashboardViewType | unknown }>) => {
            if (event.target.value) {
                setSelectVal(event.target.value as DashboardViewType);
                history.push(`/dashboard/${event.target.value}`)
            }
        }, [history, setSelectVal]
    );

    return (
        <DashboardView
            selectVal={selectVal}
            onSelectChange={memoOnSelectChange}
        >
            {children}
        </DashboardView>
    )
}

export default Dashboard;