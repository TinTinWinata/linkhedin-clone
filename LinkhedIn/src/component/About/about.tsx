import React, { useEffect, useRef } from "react";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import "./about.scss";
import AOS from "aos";
import { useNavigate } from "react-router-dom";
export default function About() {
  useEffect(() => {
    console.log("aos init!");
    AOS.init({ duration: 3000 });
  }, []);

  const navigate = useNavigate();
  const ref = useRef<any>();

  return (
    <div className="about-container">
      <Parallax ref={ref} pages={5} style={{ backgroundColor: "#E3E5E6" }}>
        {/* First Background */}
        <ParallaxLayer
          onClick={() => {
            ref.current.scrollTo(5);
          }}
          factor={1}
          speed={1}
          style={{
            backgroundImage: "url(/about_1.jpg)",
            backgroundSize: "cover",
          }}
        >
          <div data-aos="fade-up" className="title max center">
            <h2>LinkhedIn</h2>
          </div>
        </ParallaxLayer>

        {/* Pencil */}
        <ParallaxLayer
          sticky={{ start: 1.2, end: 3.5 }}
          style={{ textAlign: "center" }}
        >
          <img src="/pencil.png" alt="" />
        </ParallaxLayer>

        {/* Cloud */}
        <ParallaxLayer
          offset={0.8}
          factor={3}
          speed={0.5}
          style={{
            opacity: 0.3,
            backgroundImage: "url('/cloud.png')",
            backgroundSize: "cover",
          }}
        ></ParallaxLayer>

        {/* Image */}
        <ParallaxLayer offset={1} speed={0.25}>
          <div className="center book-or-desk">
            <div data-aos="fade-down" className="flex">
              <img id="book" src="/book.png" alt="" />
              <img id="desk" src="/desk.png" alt="" />
            </div>
          </div>
        </ParallaxLayer>

        {/* Text */}
        <ParallaxLayer offset={2} speed={0.1}>
          <div className="flex">
            <div className="text text-1">
              <h2>What is Linkhedin ?</h2>
              <p>
                LinkedIn is the world's largest professional network on the
                internet. You can use LinkedIn to find the right job or
                internship, connect and strengthen professional relationships,
                and learn the skills you need to succeed in your career.
              </p>
            </div>
            <div className="text  text-2">
              <h2>Why you should be on it ?</h2>
              <p>
                You can also use LinkedIn to organize offline events, join
                groups, write articles, post photos and videos, and more.
              </p>
            </div>
          </div>
        </ParallaxLayer>

        {/* Last Background */}
        <ParallaxLayer
          style={{
            backgroundColor: "rgb(14, 14, 14)",
          }}
          factor={1}
          offset={4}
          speed={0.5}
        >
          <div className="max center">
            <div data-aos="fade-down" className="color-this">
              <h2
                onClick={() => {
                  navigate("/register");
                }}
                className="register-text-about"
              >
                Register Your Account
              </h2>
              <p>Create Amazing Portofolio With Us.</p>
            </div>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
