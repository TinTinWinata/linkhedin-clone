import { motion, useScroll } from "framer-motion";
import React, { useEffect } from "react";

import "./scrollIndicator.scss";

export default function ScrollIndicator({ side }: { side: any }) {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <motion.div
        className={"progress-bar " + side}
        style={{ scaleX: scrollYProgress }}
      />
    </>
  );
}
