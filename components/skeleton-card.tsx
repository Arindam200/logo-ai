import React from "react";
import { Card, CardContent } from "./ui/card";

export default function SkeletonCard() {
  return (
    <>
      <Card className="group rounded-2xl">
        <CardContent className="w-full rounded-2xl">
          <div className="w-full rounded-t-2xl overflow-hidden aspect-square bg-slate-200 animate-pulse" />
          <div className="rounded-b-xl border-t p-4">
            <div className="flex justify-between items-center">
              <div className="h-6 bg-slate-200 rounded animate-pulse w-1/3" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4" />
            </div>
            <div className="flex gap-2 my-2">
              <div className="w-6 h-6 rounded-[8px] bg-slate-200 animate-pulse" />
              <div className="w-6 h-6 rounded-[8px] bg-slate-200 animate-pulse" />
            </div>
            <div className="h-9 bg-slate-200 rounded animate-pulse w-full mt-2" />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
