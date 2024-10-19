"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const COOKIE_AUTH_KEY = "isAuth";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const cookieAuth = Cookies.get(COOKIE_AUTH_KEY);
    if (cookieAuth === "true") {
      setIsAuth(true);
    }
  }, []);

  const login = (email: string, password: string) =>
    new Promise<void>((resolve, reject) => {
      if (
        email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
        password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ) {
        return reject(new Error("Invalid credentials"));
      }

      Cookies.set(COOKIE_AUTH_KEY, "true", { expires: 7 });
      setIsAuth(true);
      resolve();
    });

  const logout = () =>
    new Promise<void>((resolve) => {
      Cookies.remove(COOKIE_AUTH_KEY);
      setIsAuth(false);
      resolve();
    });

  return {
    isAuth,
    login,
    logout,
  };
};

export default useAuth;
