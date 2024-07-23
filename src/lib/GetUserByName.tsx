"use client";

import { useState, useEffect, FC } from "react";

const GetUserByName = (user_id: string) => {
  const [usersByName, setUsersByName] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userbyname/${user_id}`);

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
  }, [user_id]);

  return usersByName;
};

export default GetUserByName;
