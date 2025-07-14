import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, imgSrc, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleComingSoonClick = () => {
    alert("This feature is coming soon! Stay tuned for updates.");
  };

  return (
    <div className="relative size-full">
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={typeof title === 'string' ? title : 'Feature image'}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      ) : (
        <video
          src={src}
          loop
          muted
          autoPlay
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
      )}
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleComingSoonClick}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section id="zones" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <h2 className="font-circular-web text-2xl md:text-3xl lg:text-4xl font-bold text-blue-50 mb-4">
          Explore the Zones
        </h2>
        <p className="max-w-2xl font-circular-web text-lg md:text-xl text-blue-50 opacity-70 leading-relaxed">
          Immerse yourself in a world-first destination where every zone is designed for flow — between adrenaline and calm, between nature and innovation.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="videos/feature-1.mp4"
          title={
            <>
              surf <b>p</b>ark
            </>
          }
          description="Next-generation surf park featuring a full wave pool (URBNSURF model) for all skill levels."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="videos/feature-2.mp4"
            title={
              <>
                beach <b>s</b>ports
              </>
            }
            description="Tennis, volleyball, paddle, pickleball, and soccer courts - indoor and outdoor."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="videos/feature-3.mp4"
            title={
              <>
                extr<b>e</b>me sports
              </>
            }
            description="Skateparks, ninja courses, zip lines, and a wakeboarding lagoon for thrill-seekers."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="videos/feature-4.mp4"
            title={
              <>
                w<b>a</b>ter park
              </>
            }
            description="Volcano-themed family water park with slides, splash zones, and cave pools."
            isComingSoon
          />
        </BentoTilt>

        {/* Extra Card 1: Children playing and doing sports */}
        <BentoTilt className="bento-tilt_2">
          <BentoCard
            imgSrc="img/features-extra-1.webp"
            title={
              <>
                kids <b>a</b>ctivity zone
              </>
            }
            description="Children enjoying a variety of sports and play areas designed for all ages."
            isComingSoon
          />
        </BentoTilt>

        {/* Extra Card 2: Healthy cafes and restaurants */}
        <BentoTilt className="bento-tilt_2">
          <BentoCard
            imgSrc="img/features-extra-2.webp"
            title={
              <>
                healthy <b>c</b>afes
              </>
            }
            description="Vibrant cafes and restaurants offering nutritious, delicious meals for everyone."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div 
            className="flex size-full flex-col justify-between bg-violet-300 p-5 cursor-pointer"
            onClick={() => alert("More zones are coming soon! Stay tuned for exciting new features.")}
          >
            <h1 className="bento-title special-font max-w-64 text-black">
              M<b>o</b>re z<b>o</b>nes c<b>o</b>ming s<b>o</b>on.
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <BentoCard
            src="videos/feature-5.mp4"
            title={
              <>
                digit<b>a</b>l sports
              </>
            }
            description="eSports arena and mixed reality fitness hub where gaming meets movement."
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;
