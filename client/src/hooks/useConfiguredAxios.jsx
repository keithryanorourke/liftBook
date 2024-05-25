import axios from "axios";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

const useConfiguredAxios = () => {
    const [token, , removeToken] = useLocalStorage("token", null);
    const navigate = useNavigate();

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
                    navigate("/login");
                }
                return Promise.reject(err);
            }
        )

        return instance;
    }, [token, removeToken, navigate])

    return instance;
}

export default useConfiguredAxios;