"use client";

import DefaultLayout from "@/components/admin/DefaultLayout";
import ECommerce from "@/components/admin/ECommerce";
import UserContext from "@/context/UserContext";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export default function admin() {
  const { status } = useSession();

  const ctx = useContext(UserContext);

  useEffect(() => {
    if (status === "unauthenticated" || ctx?.profile?.role === "siswa") {
      signOut({ callbackUrl: "/" });
    }
  }, []);

  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
