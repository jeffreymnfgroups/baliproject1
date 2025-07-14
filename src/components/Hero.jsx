import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useState } from "react";

import Button from "./Button";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to prevent infinite loading on mobile
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 second timeout

    return () => clearTimeout(timeout);
  }, []);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  const handleVideoError = () => {
    setLoading(false);
  };

  const handleExploreClick = () => {
    const zonesSection = document.getElementById('zones');
    if (zonesSection) {
      zonesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Coming Soon message */}
      {!loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div
            className="border-hsla flex w-fit cursor-default items-center gap-1 overflow-hidden rounded-full bg-white/90 px-5 py-2 text-xs uppercase text-black font-circular-web shadow-md border border-blue-100"
            style={{ fontWeight: 600, letterSpacing: '0.1em' }}
          >
            <p className="relative z-20 special-font tracking-wider" style={{ color: '#007B7F' }}>coming soon</p>
          </div>
        </div>
      )}



      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          src="videos/hero.mp4"
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 flex items-center gap-3">
        <img src="/img/logo.png" alt="Logo" style={{ height: '1em', width: 'auto' }} />          <span style={{ color: '#F28C28' }}>NYALA</span>
          <b style={{ color: '#007C91', marginLeft: '0.2em' }}>BALI</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              explo<b>r</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Immersive Beach Sports, Surf, Wellness & Lifestyle Destination <br /> Where Movement Meets Paradise
            </p>

            <Button
              id="watch-trailer"
              title="Explore NYALA BALI"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
              onClick={handleExploreClick}
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black flex items-center gap-3">
      <img src="/img/logo.png" alt="Logo" style={{ height: '1em', width: 'auto' }} />        <span style={{ color: '#F28C28' }}>NYALA</span>
        <b style={{ color: '#007C91', marginLeft: '0.2em' }}>BALI</b>
      </h1>
    </div>
  );
};

export default Hero;
