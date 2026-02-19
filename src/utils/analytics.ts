// Google Analytics tracking utilities

declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        page_path?: string;
        page_title?: string;
        [key: string]: any;
      }
    ) => void;
    dataLayer: any[];
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log("Tracking event:", eventName, eventParams);
    window.gtag("event", eventName, eventParams);
  } else {
    console.warn("Google Analytics not loaded yet");
  }
};

export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log("Tracking page view:", url);
    window.gtag("event", "page_view", {
      page_path: url,
      page_title: title,
    });
  }
};

// Specific event tracking functions
export const trackButtonClick = (buttonName: string) => {
  trackEvent("button_click", {
    event_category: "engagement",
    event_label: buttonName,
  });
};

export const trackPreOrderClick = () => {
  console.log("Pre Order Now button clicked - tracking event");
  trackEvent("pre_order_click", {
    event_category: "conversion",
    event_label: "Pre Order Now Button",
  });
};

export const trackSubscribeClick = () => {
  console.log("Subscribe button clicked - tracking event");
  trackEvent("newsletter_subscribe", {
    event_category: "engagement",
    event_label: "Newsletter Subscribe",
  });
};

export const trackSocialClick = (platform: string) => {
  console.log(`${platform} social link clicked - tracking event`);
  trackEvent("social_click", {
    event_category: "engagement",
    event_label: platform,
    social_platform: platform.toLowerCase(),
  });
};
