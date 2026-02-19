"use client";
import React, { useEffect, useState, useRef } from "react";
import Png from "@/assets/Png";
import Image from "next/image";
// import ToggleButton from "@mui/material/ToggleButton";
// import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
// import Radio from "@mui/material/Radio";
// import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface GamingConsoleItem {
  title: string;
  images: string[];
}

interface GamingConsoleData {
  gamingConsole2?: GamingConsoleItem[];
}

// const CustomRadio = styled(Radio)(({ theme }) => ({
//   // "&.MuiRadio-root": {
//   //   opacity: 0.6, // default low opacity
//   //   "&.Mui-checked": {
//   //     opacity: 1, // checked full opacity
//   //   },
//   // },
// }));

function JoyGenesis() {
  const router = useRouter();
  // const [alignment, setAlignment] = useState<string | null>("left");
  const [features, setFeatures] = useState<GamingConsoleData | null>(null);
  const [loading, setLoading] = useState(true);
  const halfConsoleRef = useRef<HTMLImageElement>(null);
  const genesisRightRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // unused so commented out
  // const handleAlignment = (
  //   event: React.MouseEvent<HTMLElement>,
  //   newAlignment: string | null
  // ) => {
  //   setAlignment(newAlignment);
  // };

  // const [selectedValue, setSelectedValue] = React.useState("a");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

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
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(loading);
  useEffect(() => {
    if (
      !halfConsoleRef.current ||
      !genesisRightRef.current ||
      !containerRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Animate half-console-img from left to right
      gsap.fromTo(
        halfConsoleRef.current,
        {
          x: -500,
        },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Animate joy-genesis-right from right to left
      gsap.fromTo(
        genesisRightRef.current,
        {
          x: 500,
        },
        {
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const getImage = (index: number) => {
    const url = features?.gamingConsole2?.[index]?.images?.[0];
    return url ? `${API_BASE}${url}` : null;
  };

  const handlePreOrderClick = () => {
    router.push("/pre-book");
  };

  return (
    <>
      <div className="joy-genesis-main" ref={containerRef}>
        <div className="joy-genesis-inner">
          <div className="joy-genesis-left">
            <Image
              ref={halfConsoleRef}
              src={getImage(0) || Png.halfConsole}
              className="half-console-img"
              alt="console"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          <div className="joy-genesis-right" ref={genesisRightRef}>
            <div className="joy-genesis-con">
              <div className="main-title-sec">
                <h6 className="main-title">
                  {features?.gamingConsole2?.[0].title || ""}
                </h6>
              </div>
              <p className="common-text mb-25">
                {features?.gamingConsole2?.[1].title || ""}
              </p>
              <div className="best-for-sec">
                {/* <p className="common-text">Which is best for you?</p>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={handleAlignment}
                  aria-label="text alignment"
                  className="best-for-btn-sec"
                >
                  <ToggleButton
                    value="left"
                    aria-label="left aligned"
                    className="cus-toggle-btn"
                  >
                    16 GB
                  </ToggleButton>
                  <ToggleButton
                    value="center"
                    aria-label="centered"
                    className="cus-toggle-btn"
                  >
                    32 GB
                  </ToggleButton>
                </ToggleButtonGroup> */}
                {/* <div className="radio-btn-sec">
                  <Radio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    className="cus-radio-btn"
                  />
                  <Radio
                    checked={selectedValue === "b"}
                    onChange={handleChange}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    className="cus-radio-btn"
                  />
                  <Radio
                    checked={selectedValue === "c"}
                    onChange={handleChange}
                    value="c"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "C" }}
                    className="cus-radio-btn"
                  />
                </div> */}
                {/* <div className="radio-btn-sec">
                  <CustomRadio
                    checked={selectedValue === "a"}
                    onChange={handleChange}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    sx={{
                      color: "rgb(63 64 66 / 50%)", // dark gray
                      "&.Mui-checked": {
                        color: "#3F4042",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "35px",
                      },
                    }}
                  />
                  <CustomRadio
                    checked={selectedValue === "b"}
                    onChange={handleChange}
                    value="b"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "B" }}
                    sx={{
                      color: "rgb(192 210 143 / 50%)", // green
                      "&.Mui-checked": {
                        color: "#C0D28F",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "35px",
                      },
                    }}
                  />
                  <CustomRadio
                    checked={selectedValue === "c"}
                    onChange={handleChange}
                    value="c"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "C" }}
                    sx={{
                      color: "rgb(182 182 182 / 50%)", // gray
                      "&.Mui-checked": {
                        color: "#B6B6B6",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: "35px",
                      },
                    }}
                  />
                </div>
                <p className="price-text">$499</p> */}
                <div className="main-btn-sec">
                  <Link href="/pre-book" className="main-btn pre-book-link pre_order_now">
                    Pre Order Now
                  </Link>
                </div>
                {/* <div className="main-btn-sec">
                  <button className="main-btn" onClick={handlePreOrderClick}>
                    Pre Order Now
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoyGenesis;
