"use client";

import { ReactNode } from "react";

interface ModulesLayoutProps {
  children: ReactNode;
}

export default function ModulesLayout({
  children, // will be a page or nested layout
}: ModulesLayoutProps) {
  return <div className="bg-white min-h-screen">{children}</div>;
}
