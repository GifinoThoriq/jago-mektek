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

  const setUser = (newUname: string) => {
    setUsername(newUname);
  };

  useEffect(() => {
    window.sessionStorage.setItem("username", username);
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
