"use client";

import React, { useState, FC, ReactNode, useEffect } from "react";
import UserContext from "./UserContext";
import { UserClientTypes } from "../types/ClientTypes";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [profile, setProfile] = useState<UserClientTypes | null>(() => {
    const storedProfile =
      typeof window !== "undefined"
        ? window.sessionStorage.getItem("profile")
        : "";

    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const setUser = (newProfile: UserClientTypes) => {
    const profile = {
      _id: newProfile._id,
      username: newProfile.username,
      role: newProfile.role,
      school: newProfile.school,
      user_class: newProfile.user_class,
      user_id: newProfile.user_id,
    };
    setProfile(profile);
  };

  useEffect(() => {
    if (profile) {
      window.sessionStorage.setItem("profile", JSON.stringify(profile));
    } else {
      window.sessionStorage.setItem("profile", "");
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ profile, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
