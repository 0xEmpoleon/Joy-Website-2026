import Png from '@/assets/Png'
import Svg from '@/assets/Svg'
import Image from 'next/image'
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface GamingConsoleItem {
  title: string;
  images: string[];
}

interface GamingConsoleData {
  gamingConsole1?: GamingConsoleItem[];
}

function GamigConsole() {
  const [features, setFeatures] = useState<GamingConsoleData | null>(null);
  // const [loading, setLoading] = useState(true);
  const consoleImageRef = useRef<HTMLImageElement>(null);
  const consoleLeftRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/gaming-console`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setFeatures(json);
      } catch (e) {
        console.error("Error loading specs:", e);
      } finally {
        // setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!consoleImageRef.current || !consoleLeftRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Check if mobile viewport
      const isMobile = window.innerWidth <= 767;
      const rightStartX = isMobile ? 100 : 500;

      // Animate console left section from left to right (desktop only)
      if (!isMobile) {
        gsap.fromTo(
          consoleLeftRef.current,
          {
            x: -500,
            opacity: 1,
          },
          {
            x: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            },
          }
        );
      } else {
        // Set static position for mobile - no animation
        gsap.set(consoleLeftRef.current, {
          x: 0,
          opacity: 1,
        });
      }

      // Animate console right image from right to left
      gsap.fromTo(
        consoleImageRef.current,
        {
          x: rightStartX,
          opacity: isMobile ? 0 : 1,
        },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            onLeave: () => {
              // Add bounce animation after scroll animation completes
              gsap.to(consoleImageRef.current, {
                y: isMobile ? -15 : -30,
                duration: 0.8,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
              });
            },
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const getImage = (index: number) => {
    const url = features?.gamingConsole1?.[index]?.images?.[0];
    return url ? `${API_BASE}${url}` : null;
  };

  return (
    <>
      <div className="gamig-console-main" ref={containerRef}>
        <div className="gamin-console-left" 
        // ref={consoleLeftRef}
        >
          <div className="gamin-con-inner">
            <p className="next-gen-title">
              {features?.gamingConsole1?.[0]?.title || "Loading..."}
            </p>

            <div className="gamin-grid-sec">
              {/* Box 1 */}
              <div className="berachain-box-sec">
                <div className="berachain-img-sec">
                  <Image
                    src={getImage(1) || Png.onChain}
                    className="berachain-img"
                    alt="onChain"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="berachain-con-sec">
                  <p className="berachain-title">
                    {features?.gamingConsole1?.[1]?.title || "AAA On-Chain <br /> Games, <br /> Anywhere"}
                  </p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="berachain-box-sec">
                <div className="berachain-img-sec">
                  <Image
                    src={getImage(2) || Png.token}
                    className="berachain-img"
                    alt="token"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="berachain-con-sec">
                  <p className="berachain-title">
                    {features?.gamingConsole1?.[2]?.title || "Play & Earn <br /> With JOY <br /> Token"}
                  </p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="berachain-box-sec">
                <div className="berachain-img-sec">
                  <Image
                    src={getImage(3) || Png.integrated}
                    className="berachain-img"
                    alt="integrated"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="berachain-con-sec">
                  <p className="berachain-title">
                    {features?.gamingConsole1?.[3]?.title || "Social & Integrated Hardware Wallet Security System"}
                  </p>
                </div>
              </div>

              {/* Box 4 */}
              <div className="berachain-box-sec">
                <div className="berachain-img-sec">
                  <Image
                    src={getImage(4) || Png.epic}
                    className="berachain-img"
                    alt="epic"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="berachain-con-sec">
                  <p className="berachain-title">
                    {features?.gamingConsole1?.[4]?.title || "Steam & Epic <br /> Game Library Support"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Image ref={consoleImageRef} src={getImage(0) || Svg.console} className='gamig-console-right' alt="console" width={843} height={562}/>
      </div>
    </>
  );
}

export default GamigConsole;