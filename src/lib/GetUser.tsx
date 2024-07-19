"use client";

import { useState, useEffect } from "react";

const GetUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/user");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setUsers(data.users);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return users;
};

export default GetUser;
