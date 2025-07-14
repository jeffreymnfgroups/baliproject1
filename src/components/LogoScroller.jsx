import { useEffect, useRef } from "react";
import gsap from "gsap";

const logos = [
  { src: "/logo/redbull.webp", alt: "Red Bull" },
  { src: "/logo/extreme.webp", alt: "Extreme" },
  { src: "/logo/logo-us.webp", alt: "Urban Surf" }, 
  { src: "/logo/fivbb.webp", alt: "FIVBB" },
  { src: "/logo/jimbaran.webp", alt: "Jimbaran" },
  { src: "/logo/bruder.webp", alt: "Bruder" },
  { src: "/logo/solv.webp", alt: "Solv" },
  { src: "/logo/liga.webp", alt: "Liga" },
  { src: "/logo/itf.webp", alt: "ITF" },
];

const LogoScroller = () => {
  const scrollerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const inner = innerRef.current;
    if (!scroller || !inner) return;

    // Duplicate logos for seamless loop
    const totalWidth = inner.scrollWidth;
    let ctx = gsap.context(() => {
      gsap.set(inner, { x: 0 });
      gsap.to(inner, {
        x: -totalWidth / 2,
        duration: 20,
        ease: "linear",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2)),
        },
      });
    }, scroller);
    return () => ctx.revert();
  }, []);

  // Duplicate logos for seamless effect
  const allLogos = [...logos, ...logos];

  return (
    <section className="w-full bg-black py-10 flex flex-col items-center">
      <h3 className="font-circular-web text-blue-50 text-lg md:text-xl uppercase mb-6 tracking-widest opacity-80">
        Proudly Supported By
      </h3>
      <div
        ref={scrollerRef}
        className="overflow-hidden w-full max-w-7xl px-4 relative"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)" }}
      >
        <div
          ref={innerRef}
          className="flex gap-12 md:gap-20 items-center"
          style={{ width: "max-content" }}
        >
          {allLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 flex items-center justify-center h-20 md:h-28 px-4 md:px-8"
              style={{ minWidth: 120 }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-12 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition duration-300 drop-shadow-lg"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoScroller; 