"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import GamigConsole from "@/component/home/GamigConsole";
import Partners from "@/component/home/Partners";
import JoyGenesis from "@/component/home/JoyGenesis";
import Specifications from "@/component/home/Specifications";
import Faq from "@/component/home/Faq";
import AboutUs from "@/component/home/AboutUs";
import Image from "next/image";
import Png from "@/assets/Png";
import Svg from "@/assets/Svg";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const joyLogoRef = useRef<HTMLImageElement>(null);
  const gameImgSecRef = useRef<HTMLDivElement>(null);
  const gamepadIconRef = useRef<HTMLImageElement>(null);
  const heroConRef = useRef<HTMLDivElement>(null);
  const playrollContentRef = useRef<HTMLDivElement>(null);
  const dNoneMainRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all refs are available before proceeding
      if (!mainRef.current || !joyLogoRef.current || !gameImgSecRef.current || 
          !gamepadIconRef.current || !heroConRef.current || !playrollContentRef.current ||
          !dNoneMainRef.current || !introVideoRef.current) {
        return;
      }

      // Create timeline for the entire scroll sequence
      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: false,
          anticipatePin: 1,
        }
      });

      // 1. Initial Joy Logo scaling (already working)
      gsap.to(joyLogoRef.current, {
        scale: 24,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "20% top",
          scrub: true,
        },
      });

      // 2. Show game-img-sec-main after joy logo scaling
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "20% top",
        end: "80% top",
        onEnter: () => {
          if (!gameImgSecRef.current) return;
          gsap.set(gameImgSecRef.current, { display: "flex" });
        },
        onLeaveBack: () => {
          if (!gameImgSecRef.current) return;
          gsap.set(gameImgSecRef.current, { display: "none" });
        }
      });

      // 3. Gamepad icon animation sequence
      const gamepadTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "25% top",
          end: "70% top",
          scrub: 1,
        }
      });

      // Gamepad comes up from bottom and stops in center
      gamepadTl
        .fromTo(gamepadIconRef.current, 
          { 
            y: "100vh", 
            scale: 0.5,
            rotation: 0 
          },
          { 
            y: "0vh", 
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          }
        )
        // Tilt animation
        .to(gamepadIconRef.current, {
          rotation: 15,
          duration: 0.2,
          ease: "power2.inOut"
        })
        .to(gamepadIconRef.current, {
          rotation: -10,
          duration: 0.2,
          ease: "power2.inOut"
        })
        .to(gamepadIconRef.current, {
          rotation: 0,
          duration: 0.2,
          ease: "power2.inOut"
        });

      // 4. Show hero-con section after gamepad settles
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "45% top",
        end: "75% top",
        onEnter: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "flex" });
          gsap.fromTo(heroConRef.current, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        },
        onLeaveBack: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "none" });
        }
      });

      // 5. Scale gamepad to fullscreen
      const fullscreenTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "70% top",
          end: "90% top",
          scrub: 1,
        }
      });

      fullscreenTl.to(gamepadIconRef.current, {
        scale: 3,
        ease: "power2.inOut"
      });

      // 6. Hide game-img-sec-main and show d-none-main sections
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "85% top",
        onEnter: () => {
          // Hide game section and playroll content
          if (gameImgSecRef.current) {
            gsap.to(gameImgSecRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                if (gameImgSecRef.current) {
                  gsap.set(gameImgSecRef.current, { display: "none" });
                }
              }
            });
          }
          
          // Hide only the playroll-content section (not the entire preroll)
          if (playrollContentRef.current) {
            gsap.to(playrollContentRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: () => {
                if (playrollContentRef.current) {
                  gsap.set(playrollContentRef.current, { display: "none" });
                }
              }
            });
          }

          // Show and animate intro video
          if (introVideoRef.current) {
            gsap.set(introVideoRef.current, { display: "block" });
            gsap.fromTo(introVideoRef.current,
              { opacity: 0, y: 100 },
              { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
          }

          // Show other d-none-main sections with stagger
          if (dNoneMainRef.current) {
            const dNoneSections = dNoneMainRef.current.querySelectorAll('.d-none-main');
            gsap.set(dNoneSections, { display: "block" });
            gsap.fromTo(dNoneSections,
              { opacity: 0, y: 50 },
              { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                stagger: 0.2,
                ease: "power2.out",
                delay: 0.5
              }
            );
          }
        },
        onLeaveBack: () => {
          // Reverse the animations
          if (gameImgSecRef.current && playrollContentRef.current && introVideoRef.current) {
            gsap.set(gameImgSecRef.current, { display: "flex", opacity: 1 });
            gsap.set(playrollContentRef.current, { display: "block", opacity: 1 });
            gsap.set(introVideoRef.current, { display: "none" });
          }
          
          if (dNoneMainRef.current) {
            const dNoneSections = dNoneMainRef.current.querySelectorAll('.d-none-main');
            gsap.set(dNoneSections, { display: "none" });
          }
        }
      });

      // Scroll instruction fade out (existing)
      const scrollInstruction = document.getElementById("scrollInstruction");
      if (scrollInstruction) {
        gsap.to(scrollInstruction, {
          opacity: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top+=50 top",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Right line pin (existing)
      const rightLine = document.querySelector(".rightline-main");
      if (rightLine) {
        gsap.to(rightLine, {
          scrollTrigger: {
            trigger: rightLine,
            start: "top bottom",
            end: "+=500",
            pin: true,
            pinSpacing: false,
          },
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="main-components" ref={mainRef}>
        {/* Game image section */}
        <div className="game-img-sec-main" ref={gameImgSecRef}>
          <div className="game-img-sec-inner">
            <div className="canva-sec">
              <Image
                ref={gamepadIconRef}
                src={Png.gamePad}
                width={1000}
                height={400}
                className="gamepad-icon"
                alt="gamepad"
              />
            </div>
          </div>
        </div>

        <div id="preroll">
          <div className="playroll-content" ref={playrollContentRef}>
            <div id="joy" className="joy-main">
              <Image
                ref={joyLogoRef}
                id="joy-logo"
                className="joy-logo"
                src={Svg.JoyLogo}
                alt="JOY Shape"
              />
            </div>
          </div>

          {/* Hero content */}
          <div className="hero-con" ref={heroConRef}>
            <h1 className="web-3-text">Web 3 in Your Pocket</h1>
            <p className="common-text">Discover. Play. Earn</p>
          </div>

          {/* All the hidden sections */}
          <div ref={dNoneMainRef}>
            <div className="intro-video" ref={introVideoRef}>
              <video
                src="/dummy.mp4"
                controls
                autoPlay
                loop
                playsInline
                className="rounded-lg shadow-lg w-full h-auto"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="d-none-main">
              <GamigConsole />
            </div>
            
            <div className="d-none-main">
              <Partners />
            </div>
            
            <div className="d-none-main">
              <JoyGenesis />
            </div>
            
            <div className="d-none-main">
              <Specifications />
            </div>
            
            <div className="d-none-main">
              <Faq />
            </div>
            
            <div className="d-none-main">
              <AboutUs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;