import axios from "axios";
import { useMemo } from "react";
import { useLocalStorage } from "usehooks-ts";
import { redirect } from "react-router-dom";

const useConfiguredAxios = () => {
    const [token, , removeToken] = useLocalStorage("token", null);

    const instance = useMemo(() => {
        const axiosOptions = {
            baseURL: process.env.REACT_APP_BACKEND_URL,
        }

        if (token) {
            axiosOptions.headers = {
                Authorization: `Bearer: ${token}`
            }
        }
        const instance = axios.create(axiosOptions);
        instance.interceptors.response.use(
            response => response,
            err => {
                if (err.response.status === 401) {
                    removeToken();
                    redirect("/login");
                }
                return Promise.reject(err);
            }
        )

        return instance;
    }, [token, removeToken])

    return instance;
}

export default useConfiguredAxios;