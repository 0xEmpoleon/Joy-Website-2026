"use client";

import Png from "@/assets/Png";
import { TextField } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { trackSubscribeClick, trackSocialClick } from "@/utils/analytics";

gsap.registerPlugin(ScrollTrigger);
interface FooterSection {
  title: string;
  description: string;
  xLink: string;
  telegramLink: string;
  discordLink: string;
  copyrightText: string;
  termConditionLink: string;
  privacypolicyLink: string;
  brandAssests: string;
}

interface ProductLiveData {
  _id: string;
  productLiveStatus: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const emailMainLeftRef = useRef<HTMLDivElement>(null);
  const emailMainRightRef = useRef<HTMLDivElement>(null);
  const footerInnerSecRef = useRef<HTMLDivElement>(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [data, setData] = useState<FooterSection | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    trackSubscribeClick();

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setEmail(""); // Clear input on success
      } else {
        setError(data.message || "Failed to subscribe");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
      console.error("Error subscribing:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (!emailMainRightRef.current) return;

  //   const ctx = gsap.context(() => {
  //     const twitterBoxes = emailMainRightRef.current?.querySelectorAll('.twitter-box');

  //     if (twitterBoxes) {
  //       gsap.fromTo(
  //         twitterBoxes,
  //         {
  //           opacity: 0,
  //           y: 50,
  //           scale: 0.8,
  //         },
  //         {
  //           opacity: 1,
  //           y: 0,
  //           scale: 1,
  //           duration: 1.2,
  //           stagger: 0.4,
  //           ease: "back.out(1.7)",
  //           scrollTrigger: {
  //             trigger: emailMainRightRef.current,
  //             start: "top 90%",
  //             end: "bottom 20%",
  //             toggleActions: "play none none reverse",
  //           },
  //         }
  //       );
  //     }
  //   });

  //   return () => ctx.revert();
  // }, []);

  useEffect(() => {
    if (!footerInnerSecRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(footerInnerSecRef.current, {
        y: 80,
        opacity: 0,
      });

      // Create scroll animation with delay and slower duration
      gsap.to(footerInnerSecRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerInnerSecRef.current,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!emailMainLeftRef.current || !emailMainRightRef.current) return;

    const ctx = gsap.context(() => {
      // Email-main-left animation - left to right
      gsap.fromTo(
        emailMainLeftRef.current,
        {
          x: -200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emailMainLeftRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Email-main-right animation - right to left
      gsap.fromTo(
        emailMainRightRef.current,
        {
          x: 200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: emailMainRightRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const [productLiveData, setProductLiveData] =
    useState<ProductLiveData | null>(null);

  const getProductLiveStatus = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/product-live`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ProductLiveData = await response.json();
      console.log("API Response:", data);
      setProductLiveData(data);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
    }
  };

  useEffect(() => {
    getProductLiveStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/footer-section`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        const footerData = Array.isArray(json) ? json[0] : json.data || json;
        setData(footerData);
      } catch (e) {
        console.error("Error loading specs:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // return (
  //   <>
  //     <div className="footer-main">
  //       <div className="footer-inner-sec" ref={footerInnerSecRef}>
  //         {productLiveData?.productLiveStatus=== true && (
  //         <div className="main-title-sec">
  //           <p className="main-title">{data?.title || ""}</p>
  //         </div>
  //         <p
  //           className="common-text"
  //           dangerouslySetInnerHTML={{ __html: data?.description || "" }}
  //         ></p>
  //         <div className="email-main">
  //           <div className="email-main-left" ref={emailMainLeftRef}>
  //             <form onSubmit={handleSubscribe}>
  //               <div className="admin-input-div email-input-wrap">
  //                 <div className="admin-form-group">
  //                   <TextField
  //                     fullWidth
  //                     id="fullWidth"
  //                     className="admin-form-control"
  //                     placeholder="EMAIL"
  //                     type="email"
  //                     value={email}
  //                     onChange={(e) => setEmail(e.target.value)}
  //                     required
  //                     disabled={loading}
  //                   />
  //                   <button
  //                     type="submit"
  //                     className="main-btn"
  //                     disabled={loading}
  //                   >
  //                     {loading ? "Subscribing..." : "Subscribe"}
  //                   </button>
  //                 </div>
  //               </div>
  //               {message && (
  //                 <p
  //                   className="common-text"
  //                   style={{ color: "green", marginTop: "10px" }}
  //                 >
  //                   {message}
  //                 </p>
  //               )}
  //               {error && (
  //                 <p
  //                   className="common-text"
  //                   style={{ color: "red", marginTop: "10px" }}
  //                 >
  //                   {error}
  //                 </p>
  //               )}
  //             </form>
  //             <p className="common-text">Get the latest news</p>
  //           </div>
  //           <div className="email-main-right" ref={emailMainRightRef}>
  //             <Link
  //               href={data?.xLink || "#"}
  //               className="twitter-box"
  //               target="_blank"
  //             >
  //               <div className="twitter-br-sec">
  //                 <div className="twitter-bg-sec">
  //                   <Image
  //                     width={22}
  //                     height={22}
  //                     src={Png.twitter}
  //                     alt="twitter"
  //                   />
  //                 </div>
  //               </div>
  //               <p className="common-text">X</p>
  //             </Link>
  //             <Link
  //               href={data?.telegramLink || "#"}
  //               className="twitter-box"
  //               target="_blank"
  //             >
  //               <div className="twitter-br-sec">
  //                 <div className="twitter-bg-sec">
  //                   <Image
  //                     width={22}
  //                     height={22}
  //                     src={Png.telegram}
  //                     alt="telegram"
  //                     className="telegram-icon"
  //                   />
  //                 </div>
  //               </div>
  //               <p className="common-text">Telegram</p>
  //             </Link>
  //             <Link
  //               href={data?.discordLink || "#"}
  //               className="twitter-box"
  //               target="_blank"
  //             >
  //               <div className="twitter-br-sec">
  //                 <div className="twitter-bg-sec">
  //                   <Image
  //                     width={22}
  //                     height={22}
  //                     src={Png.discord}
  //                     alt="telegram"
  //                   />
  //                 </div>
  //               </div>
  //               <p className="common-text">Discord</p>
  //             </Link>
  //           </div>
  //         </div>
  //         )}
  //         <div className="footer-link-main">
  //           <Image
  //             width={82}
  //             height={27}
  //             src={Png.logoWhite}
  //             alt="link"
  //             className="footer-logo"
  //           />
  //           <div className="footer-link-sec">
  //             <ul className="footer-link-ul">
  //               <li className="footer-link-li">
  //                 <Link
  //                   // href={"http://localhost:4040/terms-conditions"}
  //                   href={
  //                     "https://play-on-joy.appworkdemo.com/terms-conditions"
  //                   }
  //                   className="footere-link"
  //                 >
  //                   Terms & Conditions
  //                 </Link>
  //               </li>
  //               <li className="footer-link-li">
  //                 <Link
  //                   // href={"http://localhost:4040/privacy-data-policy"}
  //                   href={
  //                     "https://play-on-joy.appworkdemo.com/privacy-data-policy"
  //                   }
  //                   className="footere-link"
  //                 >
  //                   Privacy & Data Policy
  //                 </Link>
  //               </li>
  //               <li className="footer-link-li">
  //                 <Link
  //                   href={
  //                     "https://www.notion.so/18181ab6b41d809089f9d343aa1efae1?source=copy_link"
  //                   }
  //                   className="footere-link"
  //                 >
  //                   Brand Assets
  //                 </Link>
  //               </li>
  //             </ul>
  //           </div>
  //           <p className="rights-text">{data?.copyrightText || ""}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
  // Show email section on all pages when product is live
  // Hide it ONLY on /pre-book page when product is NOT live
  const shouldShowEmailSection =
    pathname === "/pre-book"
      ? productLiveData?.productLiveStatus === true
      : true;

  return (
    <>
      <div className="footer-main">
        <div className="footer-inner-sec" ref={footerInnerSecRef}>
          {shouldShowEmailSection && (
            <>
              <div className="main-title-sec">
                <p className="main-title">{data?.title || ""}</p>
              </div>

              <p
                className="common-text"
                dangerouslySetInnerHTML={{ __html: data?.description || "" }}
              ></p>

              <div className="email-main">
                <div className="email-main-left" ref={emailMainLeftRef}>
                  <form onSubmit={handleSubscribe}>
                    <div className="admin-input-div email-input-wrap">
                      <div className="admin-form-group">
                        <TextField
                          fullWidth
                          id="fullWidth"
                          className="admin-form-control"
                          placeholder="EMAIL"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={loading}
                        />
                        <button
                          type="submit"
                          className="main-btn"
                          disabled={loading}
                        >
                          {loading ? "Subscribing..." : "Subscribe"}
                        </button>
                      </div>
                    </div>

                    {message && (
                      <p
                        className="common-text"
                        style={{ color: "green", marginTop: "10px" }}
                      >
                        {message}
                      </p>
                    )}

                    {error && (
                      <p
                        className="common-text"
                        style={{ color: "red", marginTop: "10px" }}
                      >
                        {error}
                      </p>
                    )}
                  </form>
                  <p className="common-text">Get the latest news</p>
                </div>

                <div className="email-main-right" ref={emailMainRightRef}>
                  <Link
                    href={data?.xLink || "#"}
                    className="twitter-box twitter_social_link"
                    target="_blank"
                    onClick={() => trackSocialClick("X")}
                  >
                    <div className="twitter-br-sec">
                      <div className="twitter-bg-sec">
                        <Image
                          width={22}
                          height={22}
                          src={Png.twitter}
                          alt="twitter"
                        />
                      </div>
                    </div>
                    <p className="common-text">X</p>
                  </Link>

                  <Link
                    href={data?.telegramLink || "#"}
                    className="telegram-box telegram_social_link"
                    target="_blank"
                    onClick={() => trackSocialClick("Telegram")}
                  >
                    <div className="telegram-br-sec">
                      <div className="telegram-bg-sec">
                        <Image
                          width={22}
                          height={22}
                          src={Png.telegram}
                          alt="telegram"
                          className="telegram-icon"
                        />
                      </div>
                    </div>
                    <p className="common-text">Telegram</p>
                  </Link>

                  <Link
                    href={data?.discordLink || "#"}
                    className="discord-box discord_social_link"
                    target="_blank"
                    onClick={() => trackSocialClick("Discord")}
                  >
                    <div className="discord-br-sec">
                      <div className="discord-bg-sec">
                        <Image
                          width={22}
                          height={22}
                          src={Png.discord}
                          alt="discord"
                        />
                      </div>
                    </div>
                    <p className="common-text">Discord</p>
                  </Link>
                </div>
              </div>
            </>
          )}

          <div className="footer-link-main">
            <Image
              width={82}
              height={27}
              src={Png.logoWhite}
              alt="link"
              className="footer-logo"
            />

            <div className="footer-link-sec">
              <ul className="footer-link-ul">
                <li className="footer-link-li">
                  <Link
                    href={data?.termConditionLink || "#"}
                    className="footere-link terms_conditions_link"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li className="footer-link-li">
                  <Link
                    href={data?.privacypolicyLink || "#"}
                    className="footere-link privacy_policy_link"
                  >
                    Privacy & Data Policy
                  </Link>
                </li>
                <li className="footer-link-li">
                  <Link
                    href={data?.brandAssests || "#"}
                    className="footere-link brand_assets_link"
                  >
                    Brand Assets
                  </Link>
                </li>
              </ul>
            </div>

            <p className="rights-text">{data?.copyrightText || ""}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
