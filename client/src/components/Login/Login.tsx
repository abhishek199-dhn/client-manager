import React, {ChangeEvent, FC, FormEvent} from "react";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toast from "../shared/Toast/Toast";

export interface Props {
    username: string;
    password: string;
    isShowToastVisible: boolean,
    onLogin: (event: FormEvent<HTMLFormElement>) => void;
    onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://www.linkedin.com/in/abhishekkumar001">
                Abhishek
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100%",
    },
    paper: {
        paddingTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    toastContainer: {
        margin: "0 auto",
        width: "50%"
    }
}));

const Login: FC<Props> = (props: Props) => {

    const {
        onLogin,
        username,
        password,
        onPasswordChange,
        onUsernameChange,
        isShowToastVisible
    } = props;

    const classes = useStyles();

    return (
        <Container maxWidth="xs" className={classes.container}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    A
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={onLogin}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        data-testid="username-text-field"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={onUsernameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        data-testid="password-text-field"
                        autoComplete="current-password"
                        value={password}
                        onChange={onPasswordChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        data-testid="login-button"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            {
                isShowToastVisible && (
                    <div className={classes.toastContainer}>
                        <Toast message="Invalid username or password!"/>
                    </div>
                )
            }
        </Container>
    );
}

export default Login;