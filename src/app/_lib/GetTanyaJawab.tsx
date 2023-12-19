"use client";

import { useState, useEffect } from "react";

const GetTanyaJawab = () => {
  const [tanyajawabs, setTanyaJawabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/tanyajawab");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setTanyaJawabs(data.tanyajawabs);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return tanyajawabs;
};

export default GetTanyaJawab;
