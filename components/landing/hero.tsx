"use client";

import { MoveRight } from "lucide-react";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { DotPattern } from "@/components/ui/dot-pattern";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => (
  <div className="relative w-full py-20 lg:py-40 overflow-hidden">
    <div className="absolute inset-0">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className="[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"
      />
    </div>

    <div className="container mx-auto relative">
      <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
        <div className="flex gap-4 flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              DSAinsight
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              Interactive tool for learning and understanding data structures through visual animations and step-by-step operations.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="/visualizer">
              <RainbowButton className="w-full">
                Visualizer <MoveRight className="hidden sm:block w-4 h-4" />
              </RainbowButton>
            </Link>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden border">
          <Image
            src="/ds-bst.png"
            alt="Visualizer Preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  </div>
); 