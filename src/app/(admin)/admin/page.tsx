"use client";

import UserContext from "@/context/UserContext";
import { useEdgeStore } from "@/lib/edgestore";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function admin() {
  const { status } = useSession();

  const ctx = useContext(UserContext)


  useEffect(() => {
    if(status === 'unauthenticated' || ctx?.profile?.role === 'siswa'){
      signOut({ callbackUrl: "/" });
    }
  },[])


  return (
    <div>
      <span>ini adalah admin page</span>
    </div>
  );
}
