import React, {ChangeEvent, FC} from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

export type DashboardViewType = "clientSpends" | "clientContacts";

export interface Props {
    selectVal: DashboardViewType;
    onSelectChange: (event: ChangeEvent<{ name?: string; value: unknown }>) => void;
}

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectViewContainer: {
        margin: "0 auto",
        width: "20%",
        padding: 30
    }
}));

const Dashboard: FC<Props> = (props) => {
    const classes = useStyles();

    const {
        children,
        selectVal,
        onSelectChange
    } = props;

    return (
        <React.Fragment>
            <Container>
                <div className={classes.selectViewContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="view-select-label">Select View</InputLabel>
                        <Select
                            labelId="view-select-label"
                            value={selectVal}
                            onChange={onSelectChange}
                        >
                            <MenuItem value="clientSpends">Clients spend history</MenuItem>
                            <MenuItem value="clientContacts">Clients contacts management</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {children}
            </Container>
        </React.Fragment>
    )
}

export default Dashboard;