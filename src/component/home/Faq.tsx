"use client";
import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQ {
  _id: string;
  question: string;
  answer: string;
  order: number;
  status: string;
}

function Faq() {
  const [faqs, setFaqs] = React.useState<FAQ[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0); // First item open by default
  const accordionContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/faqs?limit=100`);

        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }

        const data = await response.json();
        // Filter only active FAQs
        const activeFaqs = data.faqs.filter((faq: FAQ) => faq.status === 'active');
        setFaqs(activeFaqs);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching FAQs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  React.useEffect(() => {
    if (!accordionContainerRef.current || faqs.length === 0) return;

    const ctx = gsap.context(() => {
      const accordionItems = accordionContainerRef.current?.querySelectorAll('.accordion-item');

      if (accordionItems) {
        gsap.fromTo(
          accordionItems,
          {
            opacity: 0,
            x: -50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "power2.out",
            scrollTrigger: {
              trigger: accordionContainerRef.current,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [faqs]);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="faq-sec">
        <div className="faq-inner-sec">
          <div className="main-title-sec">
            <p className="main-title">FAQ</p>
          </div>
          <div className="accordion-main-sec">
            <p>Loading FAQs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="faq-sec">
        <div className="faq-inner-sec">
          <div className="main-title-sec">
            <p className="main-title">FAQ</p>
          </div>
          <div className="accordion-main-sec">
            <p>Unable to load FAQs. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="faq-sec">
        <div className="faq-inner-sec">
          <div className="main-title-sec">
            <p className="main-title">FAQ</p>
          </div>
          <div className="accordion-main-sec">
            <div className="accordion-container" ref={accordionContainerRef}>
              {faqs.length > 0 ? (
                faqs.map((faq, index) => (
                  <div
                    key={faq._id}
                    className="accordion-item border-b border-gray-200"
                  >
                    <details open={openIndex === index}>
                      <summary
                        className="cursor-pointer p-4 font-semibold text-lg hover:bg-gray-50"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleAccordion(index);
                        }}
                      >
                        {faq.question}
                      </summary>
                      {openIndex === index && (
                        <div className="accordion-content p-4 bg-gray-50">
                          <p dangerouslySetInnerHTML={{__html:faq.answer}} />
                        </div>
                      )}
                    </details>
                  </div>
                ))
              ) : (
                <p>No FAQs available at the moment.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faq;
