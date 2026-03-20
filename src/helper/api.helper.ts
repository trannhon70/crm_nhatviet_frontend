import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { setInvalidToken } from "../features/usersSlice";
import { store } from "../redux/store";



const instance = axios.create({
    baseURL: process.env.REACT_APP_URL_API,
    headers: { 'Content-Type': 'application/json' },
    timeout: 30000, // Timeout mặc định của axios (30 giây)
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 🛑 Tích hợp AbortController để tự động hủy request nếu quá lâu
        const controller = new AbortController();
        config.signal = controller.signal;

        // Hủy request sau 5 giây nếu chưa phản hồi
        const timeoutId = setTimeout(() => controller.abort(), 30000);
        
        // Lưu controller vào config để có thể hủy nếu cần
        (config as any).abortController = { controller, timeoutId };
        
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 🛑 Hủy timeout nếu request thành công
        const abortController = (response.config as any).abortController;
        if (abortController) {
            clearTimeout(abortController.timeoutId);
        }
        return response;
    },
    async (error : any) => {
        console.error("Response Error:", error);
        const dispatch = store.dispatch;

        // Nếu request bị hủy do timeout
        if (axios.isCancel(error)) {
            console.error("⏳ Request bị hủy do timeout!");
            return Promise.reject(new Error("Request Timeout!"));
        }

        // Kiểm tra nếu error có response
        if (!error.response) {
            console.error("Lỗi mạng hoặc server không phản hồi!");
            return Promise.reject(error);
        }

        // Lấy error message một cách an toàn
        const errorMessage = error.response.data?.error || "";

        // Kiểm tra lỗi 401 - Unauthorized
        if (error.response.status === 401 && 
            (errorMessage === "Invalid token or user not found" || errorMessage === "Unauthorized")) {
            dispatch(setInvalidToken(true));
        }

        return Promise.reject(error);
    }
);

export default instance;
