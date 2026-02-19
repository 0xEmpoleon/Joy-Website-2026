"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import GamigConsole from "@/component/home/GamigConsole";
// import Partners from "@/component/home/Partners";
import JoyGenesis from "@/component/home/JoyGenesis";
// import Specifications from "@/component/home/Specifications";
import Faq from "@/component/home/Faq";
import AboutUs from "@/component/home/AboutUs";
import Image from "next/image";
import Png from "@/assets/Png";
import Svg from "@/assets/Svg";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/component/home/Footer";
import GenSpecification from "../home/GenSpecification";
import PartnerImage from "../home/PartnerImage";
import { trackPreOrderClick } from "@/utils/analytics";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface HeroData {
  _id: string;
  title1: string;
  title2: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
interface Partner {
  _id: string;
  name: string;
  image: string;
  status: string;
  order: number;
  link: string;
}

const HomePage = () => {
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

  // Text animation refs - Top texts
  const textAnimOneRef = useRef<HTMLHeadingElement>(null);
  const textAnimTwoRef = useRef<HTMLHeadingElement>(null);
  const textAnimThreeRef = useRef<HTMLHeadingElement>(null);
  const textAnimFourRef = useRef<HTMLHeadingElement>(null);
  const textAnimFiveRef = useRef<HTMLHeadingElement>(null);

  // Text animation refs - Bottom texts
  // const textAnimOneBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimTwoBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimThreeBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFourBottomRef = useRef<HTMLHeadingElement>(null);
  // const textAnimFiveBottomRef = useRef<HTMLHeadingElement>(null);

  const handlePreOrderClick = () => {
    trackPreOrderClick();
    router.push("/pre-book");
  };

  useEffect(() => {
    // Header visibility on scroll
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY >= 300) {
          headerRef.current.classList.add("visible");
        } else {
          headerRef.current.classList.remove("visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

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

      // 0. Text Animation Sequence - Show each text one by one

      // Text-anim-one: Show (left to right)
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "5% top",
        onEnter: () => {
          if (textAnimOneRef.current) {
            gsap.killTweensOf(textAnimOneRef.current);
            gsap.set(textAnimOneRef.current, {
              visibility: "visible",
              x: -100,
            });
            gsap.to(textAnimOneRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimOneRef.current) {
            gsap.killTweensOf(textAnimOneRef.current);
            gsap.to(textAnimOneRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // Hide text-anim-one and show text-anim-two (right to left)
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "10% top",
        onEnter: () => {
          if (textAnimOneRef.current) {
            gsap.killTweensOf(textAnimOneRef.current);
            gsap.to(textAnimOneRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
          if (textAnimTwoRef.current) {
            gsap.killTweensOf(textAnimTwoRef.current);
            gsap.set(textAnimTwoRef.current, { visibility: "visible", x: 100 });
            gsap.to(textAnimTwoRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimOneRef.current) {
            gsap.killTweensOf(textAnimOneRef.current);
            gsap.to(textAnimOneRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
          if (textAnimTwoRef.current) {
            gsap.killTweensOf(textAnimTwoRef.current);
            gsap.to(textAnimTwoRef.current, {
              opacity: 0,
              x: 100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // Hide text-anim-two and show text-anim-three (left to right)
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "20% top",
        onEnter: () => {
          if (textAnimTwoRef.current) {
            gsap.killTweensOf(textAnimTwoRef.current);
            gsap.to(textAnimTwoRef.current, {
              opacity: 0,
              x: 100,
              duration: 0.5,
              overwrite: true,
            });
          }
          if (textAnimThreeRef.current) {
            gsap.killTweensOf(textAnimThreeRef.current);
            gsap.set(textAnimThreeRef.current, {
              visibility: "visible",
              x: -100,
            });
            gsap.to(textAnimThreeRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimTwoRef.current) {
            gsap.killTweensOf(textAnimTwoRef.current);
            gsap.to(textAnimTwoRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
          if (textAnimThreeRef.current) {
            gsap.killTweensOf(textAnimThreeRef.current);
            gsap.to(textAnimThreeRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // Hide text-anim-three and show text-anim-four (right to left)
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "30% top",
        onEnter: () => {
          if (textAnimThreeRef.current) {
            gsap.killTweensOf(textAnimThreeRef.current);
            gsap.to(textAnimThreeRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
          if (textAnimFourRef.current) {
            gsap.killTweensOf(textAnimFourRef.current);
            gsap.set(textAnimFourRef.current, {
              visibility: "visible",
              x: 100,
            });
            gsap.to(textAnimFourRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimThreeRef.current) {
            gsap.killTweensOf(textAnimThreeRef.current);
            gsap.to(textAnimThreeRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
          if (textAnimFourRef.current) {
            gsap.killTweensOf(textAnimFourRef.current);
            gsap.to(textAnimFourRef.current, {
              opacity: 0,
              x: 100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // Hide text-anim-four and show text-anim-five (left to right)
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "40% top",
        onEnter: () => {
          if (textAnimFourRef.current) {
            gsap.killTweensOf(textAnimFourRef.current);
            gsap.to(textAnimFourRef.current, {
              opacity: 0,
              x: 100,
              duration: 0.5,
              overwrite: true,
            });
          }
          if (textAnimFiveRef.current) {
            gsap.killTweensOf(textAnimFiveRef.current);
            gsap.set(textAnimFiveRef.current, {
              visibility: "visible",
              x: -100,
            });
            gsap.to(textAnimFiveRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimFourRef.current) {
            gsap.killTweensOf(textAnimFourRef.current);
            gsap.to(textAnimFourRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
          if (textAnimFiveRef.current) {
            gsap.killTweensOf(textAnimFiveRef.current);
            gsap.to(textAnimFiveRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // Hide text-anim-five
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "50% top",
        onEnter: () => {
          if (textAnimFiveRef.current) {
            gsap.killTweensOf(textAnimFiveRef.current);
            gsap.to(textAnimFiveRef.current, {
              opacity: 0,
              x: -100,
              duration: 0.5,
              overwrite: true,
            });
          }
        },
        onLeaveBack: () => {
          if (textAnimFiveRef.current) {
            gsap.killTweensOf(textAnimFiveRef.current);
            gsap.to(textAnimFiveRef.current, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              overwrite: true,
            });
          }
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

      // Hero Text Section Animation - Stay at bottom and hide after animations
      const heroTextSec = document.querySelector(".hero-text-sec");
      if (heroTextSec) {
        // Initially hide
        gsap.set(heroTextSec, { opacity: 0 });

        // Show at bottom and keep pinned during animations
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: "top top",
          end: "60% top", // Keep visible until all 5 animations complete
          onEnter: () => {
            // Fade in the section
            gsap.to(heroTextSec, {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            });
          },
          onLeave: () => {
            // Hide after all animations complete
            gsap.to(heroTextSec, {
              opacity: 0,
              duration: 0.5,
              ease: "power2.in",
            });
          },
          onEnterBack: () => {
            // Show again when scrolling back
            gsap.to(heroTextSec, {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            // Hide when scrolling back past start
            gsap.to(heroTextSec, {
              opacity: 0,
              duration: 0.5,
            });
          },
        });
      }

      // Animate each progress item with line width and text animations
      for (let i = 1; i <= 5; i++) {
        const progItem = document.querySelector(`.sc-2-prog_item-${i}`);
        const lineTop = progItem?.querySelector(".sc-2-line_top-2");
        const progText = progItem?.querySelector(".sc-2-prog_text");
        const wrapper = document.querySelector(
          `.sc-2-h_wrapper${i === 1 ? "" : "-" + i}`
        );

        if (progItem && lineTop && progText && wrapper) {
          // Initially set line width to 0 and hide wrapper (no y transform)
          gsap.set(lineTop, { width: "0%" });
          gsap.set(wrapper, { opacity: 0 });

          // Calculate scroll positions for each item
          const startPercent = 10 + (i - 1) * 10; // 10%, 20%, 30%, 40%, 50%
          const endPercent = startPercent + 10;

          // Animate line width
          gsap.to(lineTop, {
            width: "100%",
            scrollTrigger: {
              trigger: mainRef.current,
              start: `${startPercent}% top`,
              end: `${endPercent}% top`,
              scrub: 1,
              onUpdate: (self) => {
                // Update text opacity based on line progress
                if (progText) {
                  const newOpacity = 0.5 + self.progress * 0.5;
                  gsap.set(progText, { opacity: newOpacity });
                }
              },
            },
          });

          // Show wrapper text when line starts growing (only fade, no movement)
          ScrollTrigger.create({
            trigger: mainRef.current,
            start: `${startPercent}% top`,
            onEnter: () => {
              // Hide previous wrapper if exists
              if (i > 1) {
                const prevWrapper = document.querySelector(
                  `.sc-2-h_wrapper${i === 2 ? "" : "-" + (i - 1)}`
                );
                if (prevWrapper) {
                  gsap.to(prevWrapper, {
                    opacity: 0,
                    duration: 0.3,
                  });
                }
              }
              // Show current wrapper
              gsap.to(wrapper, {
                opacity: 1,
                duration: 0.5,
                ease: "power2.out",
              });
            },
            onLeaveBack: () => {
              // Hide current wrapper
              gsap.to(wrapper, {
                opacity: 0,
                duration: 0.3,
              });
              // Show previous wrapper if exists
              if (i > 1) {
                const prevWrapper = document.querySelector(
                  `.sc-2-h_wrapper${i === 2 ? "" : "-" + (i - 1)}`
                );
                if (prevWrapper) {
                  gsap.to(prevWrapper, {
                    opacity: 1,
                    duration: 0.5,
                  });
                }
              }
            },
          });
        }
      }
    }, mainRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [heroData, setHeroData] = useState<HeroData | null>(null);
  // const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getHeroTitle = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/hero-section`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: HeroData[] = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        setHeroData(data[0]); // ✅ store a single object
      }
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getHeroTitle();
  }, []);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/partners?limit=100`);

        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data = await response.json();
        // Filter only active partners
        const activePartners = data.partners.filter(
          (p: Partner) => p.status === "active"
        );
        setPartners(activePartners);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error("Error fetching partners:", err, error);
      } finally {
        // setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <>
      {/* <Image
        className="right-line"
        src={Svg.RightArrowLine}
      
        alt="rightline"
      /> */}
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
        {/* <button className="main-btn" onClick={handlePreOrderClick}>
          PRE ORDER NOW
        </button> */}
        <Link href="/pre-book" className="main-btn pre-book-link pre_order_click">
          Pre Order Now
        </Link>
      </div>
      <div className="main-components" ref={mainRef}>
        {/* <h1 ref={textAnimOneRef} className="hero-left-title-one text-left  text-anim-one">Discover on-chain games built for the future <br /> <span>Web3-Ready</span> </h1>
        <h1 ref={textAnimTwoRef} className="hero-left-title-one  text-anim-two">Play your favourite Steam & Epic titles <br /> <span>Multi-Library Gaming</span></h1>
        <h1 ref={textAnimThreeRef} className="hero-left-title-one text-left  text-anim-three">One click social logins <br /> <span>Seamless onboarding</span> </h1>
        <h1 ref={textAnimFourRef} className="hero-left-title-one  text-anim-four">Level up, unlock perks, and showcase your achievements. <br /> <span>Engage & Earn</span></h1>
        <h1 ref={textAnimFiveRef} className="hero-left-title-one text-left  text-anim-five">A built-in hardware wallet that keeps assets safe. <br /> <span>Secure by Design</span></h1> */}
        {/* <h1 ref={textAnimOneBottomRef} className="hero-left-title-one text-left text-bottom text-anim-one">Web3-Ready</h1>
        <h1 ref={textAnimTwoBottomRef} className="hero-left-title-one text-bottom text-anim-two">Multi-Library Gaming</h1>
        <h1 ref={textAnimThreeBottomRef} className="hero-left-title-one text-left text-bottom text-anim-three">Seamless onboarding</h1>
        <h1 ref={textAnimFourBottomRef} className="hero-left-title-one text-bottom text-anim-four">Engage & Earn</h1>
        <h1 ref={textAnimFiveBottomRef} className="hero-left-title-one text-left text-bottom text-anim-five">Secure by Design</h1> */}
        {/* <div className="hero-text-sec">
          <div className="sc-2-h_mask">
            <div className="sc-2-h_wrapper">
              <div className="sc-2-heading">
                Discover on-chain games <br /> built for the future
              </div>
            </div>
             <div className="sc-2-h_wrapper-2">
              <div className="sc-2-heading">
               Play your favourite <br /> Steam & Epic titles
              </div>
            </div>
             <div className="sc-2-h_wrapper-3">
              <div className="sc-2-heading">
                One click social <br /> logins
              </div>
            </div>
             <div className="sc-2-h_wrapper-4">
              <div className="sc-2-heading">
                Level up, unlock perks, and <br /> showcase your achievements.
              </div>
            </div>
             <div className="sc-2-h_wrapper-5">
              <div className="sc-2-heading">
                A built-in hardware wallet <br /> that keeps assets safe.
              </div>
            </div>
          </div>
          <div className="sc-2-progress_wrapper">
            <div className="sc-2-prog_item-1">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
               Web3-Ready
              </div>
            </div>
            <div className="sc-2-prog_item-2">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
               Multi-Library <br /> Gaming
              </div>
            </div>
            <div className="sc-2-prog_item-3">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Seamless <br /> onboarding
              </div>
            </div>
            <div className="sc-2-prog_item-4">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
                Engage & Earn
              </div>
            </div>
            <div className="sc-2-prog_item-5">
              <div className="sc-2-prog-line_wrap">
                <div className="sc-2-line_top-2"></div>
                <div className="sc-2-line_bottom"></div>
              </div>
              <div className="sc-2-prog_text">
               Secure by <br /> Design
              </div>
            </div>
          </div>
        </div> */}

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
          <div id="scrollInstruction" className="scrollInstruction">
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
            <h1 className="web-3-text">{heroData?.title1 || ""}</h1>
            <p className="common-text">{heroData?.title2 || ""}</p>
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
        <div className="light-bg">
          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          <GamigConsole />
          {/* </div> */}

          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          {/* <Partners /> */}
          <PartnerImage partners={partners} />
          {/* </div> */}

          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          <JoyGenesis />
          {/* </div> */}
        </div>
        <div className="dark-bg">
          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          {/* <Specifications /> */}
          <div className="home-specification-sec">
            <GenSpecification />
          </div>
          {/* </div> */}

          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          <Faq />
          {/* </div> */}

          {/* <div className="d-none-main" style={{ display: 'none' }}> */}
          <AboutUs />
          {/* </div> */}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default HomePage;
