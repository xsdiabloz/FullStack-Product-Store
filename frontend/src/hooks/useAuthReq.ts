import { useAuth } from "@clerk/react";
import { useEffect } from "react";
import api from "../lib/axios";

let isInterceptorRegistred = false;

const useAuthReq = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (isInterceptorRegistred) return;
    isInterceptorRegistred = true;

    const interceptor = api.interceptors.request.use(async (config) => {
      if (isSignedIn) {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    return () => {
      api.interceptors.request.eject(interceptor);
      isInterceptorRegistred = false;
    };
  }, [isSignedIn, getToken]);
  return { isSignedIn, isClerkLoaded: isLoaded };
};

export default useAuthReq;
