import { useRouter } from "next/router";
import React, { useEffect } from "react";

const ScrollToTop = () => {
  const { pathname } = useRouter();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  }, [pathname]);
  return null;
};

export default ScrollToTop;
