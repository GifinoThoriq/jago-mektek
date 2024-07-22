"use client";

import { useState, useEffect } from "react";

const GetSumberMateri = () => {
  const [sumberMateris, setSumberMateris] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/sumbermateri");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setSumberMateris(data.sumbermateris);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return sumberMateris;
};

export default GetSumberMateri;
