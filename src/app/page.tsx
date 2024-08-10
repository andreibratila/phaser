"use client";
import { useState } from "react";

import dynamic from "next/dynamic";
const GameWithoutSSR = dynamic(() => import("./Game"), {
  ssr: false,
});
export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col space-y-[2vw] game:mx-[10vw] mx-[2vw] pb-[10vw]">
      {loading && (
        <div className="z-10 absolute top-0 left-0  bg-no-repeat bg-cover bg-center w-full h-full" />
      )}
      {}
      <div className="h-[45vw] w-[80vw]">
        <GameWithoutSSR setLoading={setLoading} />
      </div>
    </div>
  );
}
