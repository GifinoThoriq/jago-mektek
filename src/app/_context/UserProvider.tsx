"use client";

import React, { useState, FC, ReactNode } from "react";
import UserContext from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  const setUser = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider value={{ username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
