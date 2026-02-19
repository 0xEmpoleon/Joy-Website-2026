"use client";

import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
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
import Footer from "@/component/home/Footer";
// import GenSpecification from "@/component/home/GenSpecification";

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const joyLogoRef = useRef<HTMLImageElement>(null);
  const gameImgSecRef = useRef<HTMLDivElement>(null);
  const gamepadIconRef = useRef<HTMLImageElement>(null);
  const heroConRef = useRef<HTMLDivElement>(null);
  const playrollContentRef = useRef<HTMLDivElement>(null);
  const dNoneMainRef = useRef<HTMLDivElement>(null);
  const introVideoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header visibility on scroll
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY >= 300) {
          headerRef.current.classList.add('visible');
        } else {
          headerRef.current.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    const ctx = gsap.context(() => {
      // Ensure all refs are available before proceeding
      if (
        !mainRef.current ||
        !joyLogoRef.current ||
        !gameImgSecRef.current ||
        !gamepadIconRef.current ||
        !heroConRef.current ||
        !playrollContentRef.current
      ) {
        return;
      }

      // Initially hide all sections and video
      // gsap.set(introVideoRef.current, { display: "none", opacity: 0 });
      if (dNoneMainRef.current) {
        gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
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
        },
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
        },
      });

      // 3. Gamepad icon animation sequence
      const gamepadTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "25% top",
          end: "70% top",
          scrub: 1,
        },
      });

      // Gamepad comes up from bottom and stops in center
      gamepadTl
        .fromTo(
          gamepadIconRef.current,
          {
            y: "100vh",
            scale: 0.5,
            rotation: 0,
          },
          {
            y: "0vh",
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        )
        // Tilt animation
        .to(gamepadIconRef.current, {
          rotation: 15,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(gamepadIconRef.current, {
          rotation: -10,
          duration: 0.2,
          ease: "power2.inOut",
        })
        .to(gamepadIconRef.current, {
          rotation: 0,
          duration: 0.2,
          ease: "power2.inOut",
        });

      // 4. Show hero-con section after gamepad settles
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "45% top",
        end: "75% top",
        onEnter: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "flex" });
          gsap.fromTo(
            heroConRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
          );
        },
        onLeaveBack: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "none" });
        },
      });

      // 5. Hide hero-con section after gamepad animation completes
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "75% top",
        onEnter: () => {
          if (!heroConRef.current) return;
          gsap.to(heroConRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              if (heroConRef.current) {
                gsap.set(heroConRef.current, { display: "none" });
              }
            },
          });
        },
        onLeaveBack: () => {
          if (!heroConRef.current) return;
          gsap.set(heroConRef.current, { display: "flex", opacity: 1 });
        },
      });

      // 6. Scale gamepad to fullscreen
      const fullscreenTl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "70% top",
          end: "90% top",
          scrub: 1,
        },
      });

      fullscreenTl.to(gamepadIconRef.current, {
        scale: 4,
        ease: "power2.inOut",
      });

      // 7. Hide game section and show video with all sections
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "85% top",
        onEnter: () => {
          console.log(
            "ScrollTrigger activated - hiding game section, showing video and sections"
          );

          // Create a master timeline for smooth sequential animations
          const masterTimeline = gsap.timeline();

          //  // Show the video
          if (introVideoRef.current) {
            gsap.to(introVideoRef.current, {
              opacity: 1,
              display: "flex",
              // duration: 0.5,
            });
            if (introVideoRef.current) {
              const video = introVideoRef.current.querySelector(
                "video"
              ) as HTMLVideoElement;
              if (video) {
                console.log(":Innnn 209");
                // video.currentTime = 0;
                video
                  .play()
                  .catch((err) => console.log("Video failed to play:", err));
              }
            }
          }

          // Step 1: Hide game section and playroll content simultaneously
          masterTimeline.to(
            [
              gameImgSecRef.current,
              playrollContentRef.current,
              mainRef.current,
            ],
            {
              opacity: 0,
              duration: 0.1,
              ease: "power2.out",
              onComplete: () => {
                // Hide elements after fade
                if (gameImgSecRef.current)
                  gsap.set(gameImgSecRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                  });
                if (playrollContentRef.current)
                  gsap.set(playrollContentRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                  });
                if (mainRef.current)
                  gsap.set(mainRef.current, {
                    visibility: "hidden",
                    opacity: 0,
                    height: 0,
                  });
              },
            }
          );

          // Step 2: Show intro video immediately after hiding
          // .call(() => {
          //   console.log("Setting up intro video and container");

          //   // Make sure the main container is visible
          //   if (dNoneMainRef.current) {
          //     console.log("Innnnn 215")
          //     dNoneMainRef.current.style.display = "block";
          //     dNoneMainRef.current.style.opacity = "1";
          //     dNoneMainRef.current.style.visibility = "visible";
          //   }
          //      console.log("Innnnn 222")
          //   if (introVideoRef.current) {
          //     console.log("Innnnn 222")
          //     introVideoRef.current.style.display = "flex";
          //     introVideoRef.current.style.opacity = "1";
          //     introVideoRef.current.style.visibility = "visible";
          //     console.log("Video container set to display: flex");

          //     // Start video playback with multiple attempts
          //     const video = introVideoRef.current.querySelector('video') as HTMLVideoElement;
          //     if (video) {
          //       console.log("Attempting to play video...");

          //       // Reset video to beginning
          //       video.currentTime = 0;

          //       // Ensure video is loaded
          //       video.load();

          //       // Multiple play attempts
          //       const playVideo = async () => {
          //         try {
          //           // First attempt: direct play
          //           await video.play();
          //           console.log("Video started playing successfully");
          //         } catch (error) {
          //           console.log("First play attempt failed:", error);

          //           // Second attempt: after a short delay
          //           setTimeout(async () => {
          //             try {
          //               await video.play();
          //               console.log("Video started playing on second attempt");
          //             } catch (secondError) {
          //               console.log("Second play attempt failed:", secondError);

          //               // Third attempt: user interaction fallback
          //               const playOnInteraction = () => {
          //                 video.play().then(() => {
          //                   console.log("Video started playing after user interaction");
          //                   document.removeEventListener('click', playOnInteraction);
          //                   document.removeEventListener('touchstart', playOnInteraction);
          //                 }).catch(e => console.log("Play after interaction failed:", e));
          //               };

          //               document.addEventListener('click', playOnInteraction);
          //               document.addEventListener('touchstart', playOnInteraction);

          //               console.log("Video will play after user interaction");
          //             }
          //           }, 500);
          //         }
          //       };

          //       playVideo();
          //     }
          //   }
          // })

          // Step 3: Show all sections simultaneously
          // .call(() => {
          //   console.log("Showing all sections");
          //   if (dNoneMainRef.current) {
          //     const dNoneSections = dNoneMainRef.current.querySelectorAll('.d-none-main');
          //     console.log("Found sections to show:", dNoneSections.length);

          //     // Show all sections immediately with direct DOM manipulation
          //     dNoneSections.forEach((section, index) => {
          //       console.log(`Showing section ${index + 1}:`, section.className);
          //       const element = section as HTMLElement;
          //       element.style.display = "block";
          //       element.style.opacity = "1";
          //       element.style.visibility = "visible";
          //       element.style.transform = "none";
          //       console.log(`Section ${index + 1} display set to:`, element.style.display);
          //     });
          //   }
          // });
        },

        onLeaveBack: () => {
          console.log(
            "Reversing: showing game section, hiding video and sections"
          );

          if (dNoneMainRef.current) {
            gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
          }

          if (mainRef.current)
            gsap.set(mainRef.current, {
              display: "block",
              opacity: 1,
              visibility: "visible",
            });

          // Show game section and playroll content
          if (gameImgSecRef.current && playrollContentRef.current) {
            gsap.set(gameImgSecRef.current, {
              display: "flex",
              opacity: 1,
              visibility: "visible",
            });
            gsap.set(playrollContentRef.current, {
              display: "block",
              opacity: 1,
              visibility: "visible",
            });
          }

          // // Hide video
          // if (introVideoRef.current) {
          //   introVideoRef.current.style.display = "none";
          //   introVideoRef.current.style.opacity = "0";
          //   const video = introVideoRef.current.querySelector('video');
          //   if (video) video.pause();
          // }

          // Hide all sections
        },
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

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    const handlePreOrderClick = () => {
        router.push('/pre-book');
    };

  return (
    <>
      <Image
        className="right-line"
        src={Svg.RightArrowLine}
        // width={"100%"}
        // height={48}
        alt="rightline"
      />
      <div className="header-main" ref={headerRef}>
        <div className="logo-sec">
          <Image
            className="header-logo"
            src={Svg.logo}
            width={62}
            height={48}
            alt="JOY Shape"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          />
        </div>
        <button className="main-btn" onClick={handlePreOrderClick}>Pre Order now</button>
      </div>
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

        {/* Preroll content that will be hidden */}
        <div id="preroll" ref={playrollContentRef}>
          <div className="playroll-content">
            <div id="joy" className="joy-main">
              <Image
                ref={joyLogoRef}
                id="joy-logo"
                className="joy-logo"
               src={Png.joylogo}
                alt="JOY Shape"
              />
            </div>
          </div>
        <div id="scrollInstruction" className="scrollInstruction" >
 <Image
        className="downarrow"
        src={Png.DownArrow}
        // width={"100%"}
        // height={48}
        alt="downarrow"
      />
  <div className="scroll-text">Scroll</div>
  </div>
          {/* Hero content */}
          <div className="hero-con" ref={heroConRef}>
            <h1 className="web-3-text">Web 3 in Your Pocket</h1>
            <p className="common-text">Discover. Play. Earn</p>
          </div>
        </div>
        {/* <div className="scrolldown-main" id="scrollInstruction">
          <img src="/assets/arrow-down-yZ772yrQ.png" />
          <div>Scroll</div>
          </div> */}
      </div>

      {/* Spacer div to create proper document height for scroll */}
      {/* <div style={{ height: '100vh', pointerEvents: 'none' }}></div> */}

      {/* Video and all sections below */}
      <div className="after-preroll-main" ref={dNoneMainRef}>
        <div className="intro-video" ref={introVideoRef}>
          <video
            src="/introVideo.mp4"
              controls={false}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            webkit-playsinline
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <GamigConsole />
        {/* </div> */}

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <Partners />
        {/* </div> */}

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <JoyGenesis />
        {/* </div> */}

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <Specifications />

        {/* </div> */}

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <Faq />
        {/* </div> */}

        {/* <div className="d-none-main" style={{ display: 'none' }}> */}
        <AboutUs />
        {/* </div> */}
        <Footer />
      </div>
    </>
  );
};

export default Page;
