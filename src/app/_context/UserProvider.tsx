"use client";

import React, { useState, FC, ReactNode, useEffect } from "react";
import UserContext from "./UserContext";
import { UserClientTypes } from "../_types/ClientTypes";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserClientTypes | null>(() => {
    const storedProfile =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("profile")
        : null;

    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const setUser = (newProfile: UserClientTypes) => {
    setProfile(newProfile);
  };

  useEffect(() => {
    if (profile) {
      window.sessionStorage.setItem("profile", JSON.stringify(profile));
    } else {
      window.sessionStorage.removeItem("profile");
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
