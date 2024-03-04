"use client";

import { useState, useEffect, FC } from "react";

const GetUserByName = (username: string) => {
  const [usersByName, setUsersByName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userbyname/${username}`);

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setUsersByName(data.users);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, [username]);

  return usersByName;
};

export default GetUserByName;
