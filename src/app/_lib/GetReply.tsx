"use client";

import { useState, useEffect } from "react";

const GetReply = () => {
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/reply");

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setReplies(data.replies);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchData();
  }, []);

  return replies;
};

export default GetReply;
