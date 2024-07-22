"use client";

import { type EdgeStoreRouter } from "@/app/(routes)/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

export const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();
