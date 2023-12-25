"use client";

import React, { useState, FC, ReactNode, useEffect } from "react";
import UserContext from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>(() => {
    const storedUsername =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("username")
        : "";

    return storedUsername ? storedUsername : "";
  });

  const [status, setStatusLogin] = useState<string>(() => {
    const storedStatus =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("status")
        : "";

    return storedStatus ? storedStatus : "";
  });

  const setUser = (newUname: string) => {
    setUsername(newUname);
  };

  const setStatus = (newStatus: string) => {
    setStatusLogin(newStatus);
  };

  useEffect(() => {
    window.sessionStorage.setItem("username", username);
  }, [username]);

  useEffect(() => {
    window.sessionStorage.setItem("status", status);
  }, [status]);

  return (
    <UserContext.Provider value={{ username, status, setUser, setStatus }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
