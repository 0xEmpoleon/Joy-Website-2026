import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Png from "@/assets/Png";

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  email: string;
  evmAddress: string;
}

interface Errors {
  email?: string;
  evmAddress?: string;
}

export interface WishListSectionOne {
  _id: string;
  title: string;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

const PreBookWishlist: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    evmAddress: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const prebookMaxContentRef = useRef<HTMLDivElement>(null);
  const emailFieldRef = useRef<HTMLDivElement>(null);
  const evmAddressFieldRef = useRef<HTMLDivElement>(null);
  // const submitButtonRef = useRef<HTMLButtonElement>(null);

  // setTimeout(() => {
  //   setSubmitSuccess(false);
  // }, 5000);

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 15000);

      return () => clearTimeout(timer); // Cleanup in case component unmounts
    }
  }, [submitSuccess]);

  // Email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // EVM address regex (0x + 40 hex chars)
  // const evmAddressRegex = /^0x[a-fA-F0-9]{40}$/;

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.evmAddress) {
      newErrors.evmAddress = "Wallet address is required";
      // newErrors.evmAddress = "EVM address is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!prebookMaxContentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        prebookMaxContentRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: prebookMaxContentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!emailFieldRef.current || !evmAddressFieldRef.current) return;

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
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }

    // Clear success message when typing again
    if (submitSuccess) {
      setSubmitSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          evmAddress: formData.evmAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Submission failed");
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

  const [wishlistSectionOne, setWishListSectionOne] =
    useState<WishListSectionOne | null>(null);

  const getWishListSectionOne = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/join-waitlist-section-one`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: WishListSectionOne[] = await response.json();
      console.log("API Response:", data[0]);
      setWishListSectionOne(data[0]);
    } catch (err) {
      console.error("Error fetching content:", err);
    } finally {
    }
  };

  useEffect(() => {
    getWishListSectionOne();
  }, []);

  return (
    <>
      <div className="pre-book-genesis">
        <div className="prebook-container">
          <div className="prebook-max-content" ref={prebookMaxContentRef}>
            {/* <div className="prebook-headline">
              <h6 className="prebook-title">Pre-Book your</h6>
            </div> */}

            <div className="prebook-genesis-details">
              <Image
                width={286}
                height={263}
                src={Png.rat}
                alt="rat"
                className="genesis-rate-img"
              />
              {/* <p className="prebook-genesis-text">JOY Genesis</p> */}

              {/* <div className="curve-text-sec">
                <svg width="700" height="200" viewBox="0 0 700 200">
                  <defs>
                    <path id="line1"
                      d="M 50,150 Q 350,30 650,150"
                    />

                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#FFF8E1" />
                      <stop offset="80%" stop-color="#EDFFAD" />
                      <stop offset="100%" stop-color="#D4E896" />
                    </linearGradient>

                  </defs>

                  <text>
                    <textPath
                      startOffset="50%"
                      xlinkHref="#line1"
                      fill="url(#textGradient)"
                    >
                      JOY GENESIS
                    </textPath>
                  </text>
                </svg>
              </div> */}
              {/*          
              <div className="curve-text-sec">
                <svg width="700" height="200" viewBox="0 0 700 200">
                  <defs>
                    <path id="line1" d="M 50,150 Q 350,100 650,150" />

                    <linearGradient
                      id="textGradientOne"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stop-color="#FFFFFF" />
                      <stop offset="60%" stop-color="#EDFFAD" />
                    </linearGradient>
                  </defs>

                  <text
                    stroke="#000000"
                    strokeWidth="4"
                    paintOrder="stroke fill"
                    textAnchor="middle"
                  >
                    <textPath
                      startOffset="50%"
                      xlinkHref="#line1"
                      fill="url(#textGradientOne)"
                    >
                      {wishlistSectionOne?.title || "JOY GENESIS"}
                    </textPath>
                  </text>
                </svg>
              </div> */}
              <div className="curve-text-sec">
                <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path id="curvePath" d="M 50 145 Q 400 110 750 145" />

                    <linearGradient id="textGradientOne" x1="0" y1="0" x2="0" y2="100%">
                      <stop offset="0%" stop-color="#FFFFFF" />
                      <stop offset="60%" stop-color="#EDFFAD" />
                    </linearGradient>
                  </defs>

                  <text className="curve-text">
                    <textPath href="#curvePath" startOffset="50%" textAnchor="middle">
                          {wishlistSectionOne?.title || "JOY GENESIS"}
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* <p className="prebook-desc-content">
                When the cat’s away, the mice will play.
              </p> */}
              <p className="prebook-join-title">
                {wishlistSectionOne?.description ||
                  "When the cat’s away, the mice will play. Join our waitlist for exclusive access."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="prebook-form-max">
              <div className="prebook-main-form">
                {/* Email Field */}
                <div
                  className="prebook-form-group mb-16px"
                  // ref={emailFieldRef}
                >
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`form-control ${errors.email ? "error" : ""}`}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email}</span>
                  )}
                </div>

                {/* EVM Address Field */}
                <div
                  className="prebook-form-group mb-44px"
                  // ref={evmAddressFieldRef}
                >
                  <input
                    type="text"
                    name="evmAddress"
                    value={formData.evmAddress}
                    onChange={handleChange}
                    placeholder="Wallet Address (e.g. 0x...)"
                    // placeholder="EVM Address (e.g. 0x...)"
                    className={`form-control ${
                      errors.evmAddress ? "error" : ""
                    }`}
                  />
                  {errors.evmAddress && (
                    <span className="error-text">{errors.evmAddress}</span>
                  )}
                </div>

                {/* Submit Button */}
                <div className="btn-wrapper">
                  <div className="btn-border-three">
                    <div className="btn-border-two">
                      <div className="btn-border-one">
                        <button
                          // ref={submitButtonRef}
                          type="submit"
                          className="common-yellow-btn join-waitlist-new join_waitlist "
                          disabled={isLoading}
                        >
                          {isLoading ? "Joining..." : "Join Waitlist"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Success Message */}
                {submitSuccess && (
                  <div className="success-message">
                    Thank you! You&apos;ve joined the waitlist
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error {
          border: 1px solid #e74c3c !important;
        }
        .error-text {
          color: #e74c3c;
          font-size: 12px;
          margin-top: 4px;
          display: block;
        }
        .success-message {
          color: #2ecc71;
          font-size: 14px;
          margin-top: 12px;
          text-align: center;
          font-weight: 500;
        }
        .common-yellow-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
};

export default PreBookWishlist;
