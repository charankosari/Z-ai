"use client";
import { RoomComponent } from "@/components/room-component";
import { Auth } from "@/components/auth";
import LK from "@/components/lk";

import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    localStorage.removeItem("last_transcripts");
  }, []);
  return (
    <div className="flex flex-col h-full bg-neutral-100">
      <header className="flex flex-shrink-0 h-12 items-center justify-between px-4 w-full md:mx-auto">
        <LK />
        <Auth />
      </header>
      <main className="flex flex-col flex-grow overflow-hidden p-0 md:p-2 md:pt-0 w-full md:mx-auto">
        <RoomComponent />
      </main>
    </div>
  );
}
