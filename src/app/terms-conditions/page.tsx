"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";
// import Png from "@/assets/Png";
import Svg from "@/assets/Svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/component/home/Footer";

gsap.registerPlugin(ScrollTrigger);

// interface HeroData {
//   _id: string;
//   title1: string;
//   title2: string;
//   createdAt?: string;
//   updatedAt?: string;
//   __v?: number;
// }

export interface PreSaleTerms {
  _id: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

const Page = () => {
  // const posts = [
  //   {
  //     id: 1,
  //     category: "Education",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog,
  //   },
  //   {
  //     id: 2,
  //     category: "Development",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog2,
  //   },
  //   {
  //     id: 3,
  //     category: "Marketing",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog3,
  //   },
  //   {
  //     id: 4,
  //     category: "Marketing",
  //     date: "03-11-25",
  //     title: "Creator’s Mind Morning Rituals That Inspire.",
  //     image: Png.blog4,
  //   },
  // ];

  const router = useRouter();
  const mainRef = useRef<HTMLDivElement>(null);
  const joyLogoRef = useRef<HTMLImageElement>(null);
  const gameImgSecRef = useRef<HTMLDivElement>(null);
  const gamepadIconRef = useRef<HTMLImageElement>(null);
  const heroConRef = useRef<HTMLDivElement>(null);
  const playrollContentRef = useRef<HTMLDivElement>(null);
  const dNoneMainRef = useRef<HTMLDivElement>(null);
  // const introVideoRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const [termscondition, setTermsCondition] = useState<PreSaleTerms | null>(
    null
  );

  const handlePreOrderClick = () => {
    router.push("/pre-book");
  };

  const getTermsCondition = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/terms-and-conditions`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PreSaleTerms[] = await response.json();
      setTermsCondition(data[0]);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
    }
  };

  useEffect(() => {
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

      if (dNoneMainRef.current) {
        gsap.set(dNoneMainRef, { visibility: "hidden", opacity: 0 });
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

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
    }, mainRef);

    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    getTermsCondition();
  }, []);

  return (
    <>
      <div className="dark-blog-bg">
        {/* <Image
          className="right-line"
          src={Svg.RightArrowLine}
          alt="rightline"
        /> */}
        <div className="header-main common-header-mt-none" ref={headerRef}>
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
          <button className="main-btn" onClick={handlePreOrderClick}>
            PRE ORDER NOW
          </button>
        </div>

        <div className="top-header-common-space ">
          <div className="list-dark-bg">
            <div className="blog-container">
              <div className="terms-and-conditions-main">
                <h1 className="terms-title">Terms & Conditions</h1>
                <div className="terms-and-conditions-content">
                  {/* <h3>Joy Tech Global Limited Presale Terms and Conditions</h3>
                  <h5>Effective Date: February 1, 2025</h5>
                  <p>
                    These terms and conditions ("Agreement") govern your
                    participation in the Joy Genesis NFT sale (”Presale
                    Deposit”) on Magic Eden Launchpad and future redemption for
                    the Joy Genesis handheld device ("Product").
                  </p> */}
                  {termscondition ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: termscondition.content,
                      }}
                    />
                  ) : (
                    <p>Loading terms and conditions...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="footer-bgblog">
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
