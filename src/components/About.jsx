import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <img
          src="img/logo.png"
          alt="Nyala Bali Logo"
          className="mb-2 h-16 w-auto"
        />
        <p className="font-general text-sm uppercase md:text-[14px]">
          NYALA BALI
        </p>

        <AnimatedTitle
          title="Disc<b>o</b>ver the world's <br /> first integrated <b>s</b>ports destination"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
          <p>Where elite athletes, families, creatives, and travelers unite</p>
          <p className="text-gray-500">
            NYALA BALI fuses sport, surf, wellness, lifestyle, and entertainment in the heart of Bali&apos;s natural beauty
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
      <div className="mask-clip-path about-image relative">
          <img
            src="img/about.webp"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
          <span className="absolute right-4 bottom-4 bg-black/60 text-white text-xs px-3 py-1 rounded">
            Concept Only
          </span>
        </div>
      </div>
    </div>
  );
};

export default About;
