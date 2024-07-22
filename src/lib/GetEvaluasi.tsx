"use client";

import { useState, useEffect } from "react";

const GetEvaluasi = (id: string) => {
  const [evaluasis, setEvaluasis] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/evaluasi/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setEvaluasis(data.evaluasis);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return evaluasis;
};

export default GetEvaluasi;
