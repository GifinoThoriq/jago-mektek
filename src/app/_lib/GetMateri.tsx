"use client";

import { useState, useEffect } from "react";

const GetMateri = () => {
  const [materis, setMateris] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/materi");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setMateris(data.materis);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return materis;
};

export default GetMateri;
