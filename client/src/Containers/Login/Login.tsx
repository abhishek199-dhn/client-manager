import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import {useHistory} from "react-router-dom";
import LoginUtils from "../../utils/LoginUtils";
import LoginView from "../../components/Login/Login";
import {MUTATION_LOGIN} from "../../schema/mutation";

export interface LoginMutationVariable {
    auth: {
        password: string;
        username: string;
    }
}

export interface LoginMutationResponse {
    login: {
        token: string;
    }
}

function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isShowToastVisible, showToast] = useState<boolean>(false);

    const history = useHistory();

    const [
        loginUser,
        {
            error: loginError,
            data: loginData
        }
    ] = useMutation<LoginMutationResponse, LoginMutationVariable>(MUTATION_LOGIN);

    useEffect(() => {
            const timeoutID = setTimeout(() => {
                showToast(false);
            }, 1000);

            return () => {
                clearTimeout(timeoutID);
            }
        }, [showToast, isShowToastVisible]
    );

    useEffect(() => {
        if (typeof LoginUtils.getToken() === "string") {
            history.push("/dashboard/clientSpends");
        }
    }, [history]);

    useEffect(() => {
        if (!Array.isArray(loginError) && loginData?.login.token) {
            LoginUtils.setToken(loginData.login.token);
            history.push("/dashboard/clientSpends");
        }
    }, [loginError, loginData, history]);

    const memoOnUsernameChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
        }, [setUsername]
    );

    const memoOnPasswordChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
        }, [setPassword]
    );

    const memoOnLogin = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            await loginUser({
                variables: {
                    auth: {
                        username,
                        password
                    }
                }
            }).catch((e) => {
                showToast(true);
                console.log("Unable to login", e)
            })

            setPassword("");
            setUsername("");

        }, [loginUser, password, username, showToast]
    );

    return (
        <React.Fragment>
            <LoginView
                username={username}
                password={password}
                onLogin={memoOnLogin}
                isShowToastVisible={isShowToastVisible}
                onPasswordChange={memoOnPasswordChange}
                onUsernameChange={memoOnUsernameChange}
            />
        </React.Fragment>
    )
}

export default Login;