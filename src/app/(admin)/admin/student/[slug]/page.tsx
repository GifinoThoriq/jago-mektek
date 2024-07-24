"use client";

import TableTwo from "@/components/admin/Tables/TableTwo";
import { useEffect, useState } from "react";
import { UserClientTypes } from "@/types/ClientTypes";

interface IUserResult {
  _id: string;
  title: string;
  user_answer: string | null;
  correct: boolean | null;
  text_answer: string | null;
  text_real_answer: string | null;
}

export default function StudentDetail({
  params,
}: {
  params: { slug: string };
}) {
  const [userResult, setUserResult] = useState<IUserResult[]>([]);
  const [user, setUser] = useState<UserClientTypes[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/userresult_byuid/${params.slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setUserResult(data.updatedResult);
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/userbyid/${params.slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setUser(data.users);
        calculateScoreHandler();
      } catch (error: any) {
        console.error("Error fetching documents:", error.message);
      }
    };

    const calculateScoreHandler = () => {};

    fetchUserData();
    fetchData();
  }, []);

  let score = 0;

  if (userResult.length > 0) {
    const correctResult = userResult.filter((res) => res.correct !== null);
    correctResult.forEach((res) => {
      if (res.correct === true) {
        score += 25;
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      {user.length > 0 && (
        <>
          <span>Nama: {user[0].username}</span>
          <span>Sekolah: {user[0].school}</span>
          <span>Kelas: {user[0].user_class}</span>
        </>
      )}

      <div className="col-span-12 xl:col-span-8 mt-5">
        {userResult.length > 0 && <TableTwo userResult={userResult} />}
      </div>

      <div>Score Siswa: {score} / 100</div>
    </div>
  );
}
