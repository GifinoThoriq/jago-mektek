"use client";

import { useState, useEffect } from "react";

const GetSubMateri = () => {
  const [subMateris, setSubMateris] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/submateri");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setSubMateris(data.submateris);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return subMateris;
};

export default GetSubMateri;
