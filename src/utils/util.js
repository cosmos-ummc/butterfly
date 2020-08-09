import authProvider from "../auth_provider/authProvider";

export const getName = () => {
    try {
        return localStorage.getItem("username").toUpperCase()
    } catch (e) {
        authProvider.logout();
        return ""
    }
};
