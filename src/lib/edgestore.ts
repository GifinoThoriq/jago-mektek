"use client"

import { type EdgeStoreRouter } from "../(routes)/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";

export const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>();