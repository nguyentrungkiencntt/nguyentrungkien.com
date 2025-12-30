'use client';

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export const LoadingHeaderHome = dynamic(()=>import("../partials/HeaderHome"),{
  ssr:false,
  loading: () => <Skeleton className="h-40 w-full"/>  
})

export const LoadingSlidebarHome = dynamic(()=>import("../partials/SlidebarHome"),{
  ssr:false,
  loading: () => <Skeleton className="h-[500px] w-full"/>  
})

export const LoadingFooterHome = dynamic(()=>import("../partials/FooterHome"),{
  ssr:false,
  loading: () => <Skeleton className="h-[350px] w-full"/>  
})