// components/PreBookFooter.tsx
import Png from "@/assets/Png";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  email: string;
  evmAddress: string;
}

interface Errors {
  email?: string;
  evmAddress?: string;
}

export interface WishListSectionTwo {
  _id: string;
  title: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface FooterSection {
  title: string;
  description: string;
  xLink: string;
  telegramLink: string;
  discordLink: string;
  copyrightText: string;
}
const PreBookFooter = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    evmAddress: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const footerJoinContentRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLDivElement>(null);
  const evmAddressFieldRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const emailMainRightRef = useRef<HTMLDivElement>(null);
  const footerMaxBtnJoinRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<FooterSection | null>(null);

  useEffect(() => {
    if (
      !emailFieldRef.current ||
      !evmAddressFieldRef.current ||
      !submitButtonRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Email field animation - left to right
      gsap.fromTo(
        emailFieldRef.current,
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
            trigger: emailFieldRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // EVM Address field animation - right to left
      gsap.fromTo(
        evmAddressFieldRef.current,
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
            trigger: evmAddressFieldRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Submit button animation - left to right (same as email)
      gsap.fromTo(
        submitButtonRef.current,
        {
          x: -200,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: submitButtonRef.current,
            start: "top 95%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);
  // Auto-hide success message after 5 seconds
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 15000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [submitSuccess]);

  // Scroll animation for footerjoin-content
  useEffect(() => {
    if (!footerJoinContentRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(footerJoinContentRef.current, {
        y: 80,
        opacity: 0,
      });

      // Create scroll animation with slower duration and delay
      gsap.to(footerJoinContentRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerJoinContentRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // Email-main-right animation
  useEffect(() => {
    if (!emailMainRightRef.current) return;

    const ctx = gsap.context(() => {
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

  // Footer-max-btn-join animation
  useEffect(() => {
    if (!footerMaxBtnJoinRef.current) return;

    const ctx = gsap.context(() => {
      // Footer-max-btn-join animation - left to right
      gsap.fromTo(
        footerMaxBtnJoinRef.current,
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
            trigger: footerMaxBtnJoinRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/i;

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.evmAddress.trim()) {
      newErrors.evmAddress = "Wallet address is required";
      // newErrors.evmAddress = "EVM address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors on typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitSuccess) setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          evmAddress: formData.evmAddress.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join");
      }

      // SUCCESS
      setFormData({ email: "", evmAddress: "" });
      setErrors({});
      setSubmitSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);

      const message = (error as Error).message.toLowerCase();

      if (message.includes("email")) {
        setErrors({ email: (error as Error).message });
      } else if (message.includes("wallet") || message.includes("evm")) {
        setErrors({ evmAddress: (error as Error).message });
      } else {
        setErrors({ email: (error as Error).message }); // fallback
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const letters = document.querySelectorAll<HTMLElement>(".wave-text span");

    letters.forEach((span, i) => {
      span.style.setProperty("--i", i.toString());
    });
  }, []);

  const [WishListSectionTwo, setWishListSectionTwo] =
    useState<WishListSectionTwo | null>(null);

  const getWishListSectionOne = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/join-waitlist-section-two`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: WishListSectionTwo[] = await response.json();
      console.log("API Response:", data[0]);
      setWishListSectionTwo(data[0]);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
    }
  };

  useEffect(() => {
    getWishListSectionOne();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${apiUrl}/api/footer-section`, {
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
  console.log(loading);
  return (
    <div className="join-wishlist-footer">
      <div className="container-join-footer">
        <div className="max-join-footer">
          <div className="footerjoin-content" ref={footerJoinContentRef}>
            {/* <h4 className="youtline-title wave-text">
              <span>Y</span>
              <span>o</span>
              <span>u</span>
              <span>’</span>
              <span>r</span>
              <span>e</span> <span>t</span>
              <span>h</span>
              <span>e</span> <span>f</span>
              <span>i</span>
              <span>r</span>
              <span>s</span>
              <span>t</span> <span>i</span>
              <span>n</span> <span>l</span>
              <span>i</span>
              <span>n</span>
              <span>e</span>
            </h4> */}
            {/* <h4 className="youtline-title ">
              {(WishListSectionTwo?.title || "You're the first in line")
                .split("")
                .map((char, index) => (
                  <span
                    key={index}
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
            </h4> */}
            <div className="curve-text-sec">
              <svg width="700" height="200" viewBox="0 0 700 200">
                <defs>
                  <path id="line1" d="M 50,150 Q 350,100 650,150" />

                  <linearGradient id="textGradientOne" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF" />
                    <stop offset="80%" stop-color="#EDFFAD" />
                  </linearGradient>
                </defs>

                {/* <text
                    stroke="#000000"
                    strokeWidth="4"
                    paintOrder="stroke fill"
                    textAnchor="middle"
                  >
                    <textPath
                      startOffset="50%"
                      href="#line1"
                      fill="url(#textGradientOne)"
                    >
                      {(WishListSectionTwo?.title || "You're the first in line")}
                    </textPath>
                    
                  </text> */}

                <text className="curve-text">
                  <textPath href="#line1" startOffset="50%" textAnchor="middle" >
                    {(WishListSectionTwo?.title || "You're the first in line")}
                  </textPath>
                </text>
              </svg>
            </div>

            <p className="your-desc-line">
              {/* Sign up with your email + wallet to secure early access and
              presale perks. */}
              {WishListSectionTwo?.description ||
                "Sign up with your email + wallet to secure early access and presale perks."}
            </p>
            {/* <p className="your-desc-line">
              Sign up with your email + wallet to secure early access and presale perks.
            </p> */}

            <form onSubmit={handleSubmit}>
              <div className="form-join-footer-max">
                <div className="prebook-form-group" ref={emailFieldRef}>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                <div className="prebook-form-group" ref={evmAddressFieldRef}>
                  <input
                    type="text"
                    name="evmAddress"
                    placeholder="Wallet Address"
                    // placeholder="EVM Address"
                    value={formData.evmAddress}
                    onChange={handleChange}
                    className={`form-control ${errors.evmAddress ? "error" : ""
                      }`}
                  />
                  {errors.evmAddress && (
                    <span className="error-text">{errors.evmAddress}</span>
                  )}
                </div>
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <div className="success-message">
                  Thank you! You&apos;ve joined the waitlist
                </div>
              )}

              <div className="join-btn-social">
                <div className="footer-max-btn-join">
                  <button
                    // ref={submitButtonRef}
                    type="submit"
                    className="common-yellow-btn join_waitlist"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join Waitlist"}
                  </button>
                </div>

                <div
                  className="email-main-right"
                  // ref={emailMainRightRef}
                >
                  <Link
                    href={data?.telegramLink || "#"}
                    className="telegram-box telegram_social_link"
                    target="_blank"
                  >
                    <div className="telegram-br-sec">
                      <div className="telegram-bg-sec">
                        <Image
                          width={34.13}
                          height={31.3}
                          src={Png.telegramNew}
                          alt="X"
                          className="telegram-icon"
                        />
                      </div>
                    </div>
                    {/* <p className="common-text">X</p> */}
                  </Link>
                  <Link
                    href={data?.xLink || "#"}
                    className="twitter-box twitter_social_link"
                    target="_blank"
                  >
                    <div className="twitter-br-sec">
                      <div className="twitter-bg-sec">
                        <Image
                          width={35.68}
                          height={35.68}
                          src={Png.twitterNew}
                          alt="twitter"
                          // className="twitter-icon"
                        />
                      </div>
                    </div>
                    {/* <p className="common-text">Telegram</p> */}
                  </Link>
                  <Link
                    href={data?.discordLink || "#"}
                    // className="twitter-box"
                    className="discord-box discord_social_link"
                    target="_blank"
                  >
                    <div className="discord-br-sec">
                      <div className="discord-bg-sec">
                        <Image
                          width={35}
                          height={35}
                          src={Png.discordGeen}
                          alt="Discord"
                        />
                      </div>
                    </div>
                    {/* <p className="common-text">Discord</p> */}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>
        {`
        .form-control {
          width: 100%;
          padding: 12px 16px;
          border: 1.5px solid #444;
          border-radius: 8px;
          font-size: 15px;
          background: #111;
          color: white;
          transition: all 0.2s;
        }
        .form-control:focus {
          outline: none;
          border-color: #ffd700;
          box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
        }
        .form-control.error {
          border-color: #e74c3c;
        }
        .error-text {
          color: #e74c3c;
          font-size: 13px;
          margin-top: 6px;
          display: block;
        }
        .success-message {
          background: #d4edda;
          color: #2d6a2f;
          padding: 12px 16px;
          border-radius: 8px;
          text-align: center;
          font-weight: 500;
          margin: 16px 0;
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .common-yellow-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      `}
      </style>
    </div>
  );
};

export default PreBookFooter;
