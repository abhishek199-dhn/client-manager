import Constants from "./Constants";

class LoginUtils {
    static getToken = (): string | null => {
        return localStorage.getItem(Constants.auth.tokenKey);
    }

    static setToken = (token: string) => {
        localStorage.setItem(Constants.auth.tokenKey, token);
    }

    static logout = () => {
        localStorage.removeItem(Constants.auth.tokenKey);
    }
}

export default LoginUtils;