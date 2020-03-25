import React, {useCallback, MouseEvent} from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LoginUtils from "../../utils/LoginUtils";

interface Props {
    title?: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Header({title}: Props) {
    const classes = useStyles();
    const history = useHistory();

    const memoOnLogout = useCallback(
        (event: MouseEvent<HTMLButtonElement>) => {
            LoginUtils.logout();
            history.push("/");
        }, [history]
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    {title}
                </Typography>
                <Button color="inherit" onClick={memoOnLogout}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

Header.defaultProps = {
    title: "Client Manager"
};

export default Header;
