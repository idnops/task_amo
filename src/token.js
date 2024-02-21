import { fetch } from "./fetch";
import Cookies from "js-cookie";

export const useToken = () => {
  const getAccessTokens = async () => {
    const res = await fetch("/oauth/access_token", {
      method: "post",
      data: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: import.meta.env.VITE_CLIENT_CODE,
        redirect_uri: import.meta.env.VITE_CLIENT_REDIRECT_URI,
      },
    });

    Cookies.set("accessToken", res.data.access_token);
    Cookies.set("refreshToken", res.data.refresh_token);
  };

  const revalidateAccessToken = async () => {
    const res = await fetch("/oauth/access_token", {
      method: "post",
      data: {
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: Cookies.get("refreshToken"),
        redirect_uri: import.meta.env.VITE_CLIENT_REDIRECT_URI,
      },
    });

    Cookies.set("accessToken", res.data.access_token);
    Cookies.set("refreshToken", res.data.refresh_token);
  };

  return { getAccessTokens, revalidateAccessToken };
};
