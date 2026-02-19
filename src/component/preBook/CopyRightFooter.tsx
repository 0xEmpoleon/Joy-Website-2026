import Link from "next/link";
import React, { useEffect, useState } from "react";

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

const CopyRightFooter = () => {
  const [data, setData] = useState<FooterSection | null>(null);
  // const [loading, setLoading] = useState(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8052";

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
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
        // setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="copy-right-footer-bg">
        {/* <div className="footer-copy-container">
            <p>© 2025 PlayOn Console. All rights reserved.</p>
        </div> */}
        <div className="footer-link-main">
          {/* <Image width={82} height={27} src={Png.logoWhite} alt="link" className="footer-logo" /> */}
          <div className="footer-link-sec">
            <ul className="footer-link-ul">
              {/* <li className="footer-link-li"><Link href={"https://playonjoy.com/terms-and-conditions"} className="footere-link">Terms & Conditions</Link></li>
                        <li className="footer-link-li"><Link href={"https://playonjoy.com/privacy-policy"} className="footere-link">Privacy & Data Policy</Link></li>
                        <li className="footer-link-li"><Link href={"https://www.notion.so/18181ab6b41d809089f9d343aa1efae1?source=copy_link"} className="footere-link">Brand Assets </Link></li> */}
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
                <Link href={data?.brandAssests || "#"} className="footere-link brand_assets_link">
                  Brand Assets{" "}
                </Link>
              </li>
            </ul>
          </div>
          <p className="rights-text">2025 All Rights Reserved © JOY</p>
        </div>
      </div>
    </>
  );
};

export default CopyRightFooter;
