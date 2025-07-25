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

export const ExperienceCard = ({ src, imgSrc, title, description, isComingSoon }) => {
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
    alert("This experience is coming soon! Stay tuned for updates.");
  };

  return (
    <div className="relative size-full">
      {/* Logo at top-right */}
      <img
        src="/img/logo.png"
        alt="Logo"
        className="absolute top-3 right-3 z-20"
        style={{ height: '2.2em', width: 'auto' }}
      />
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={typeof title === 'string' ? title : 'Experience image'}
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

const Experience = () => (
  <section id="experience" className="bg-black pb-20">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-circular-web text-2xl md:text-3xl lg:text-4xl font-bold text-blue-50">
            The Complete Experience
          </h2>
          <img src="/img/logo.png" alt="Logo" className="h-9 w-auto md:h-10" />
        </div>
        <p className="max-w-2xl font-circular-web text-lg md:text-xl text-blue-50 opacity-70 leading-relaxed">
          From wellness retreats to luxury stays, every element is designed for flow and connection.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <ExperienceCard
          src="videos/bali.mp4"
          title={
            <>
              balin<b>e</b>se cultur<b>e</b> integration
            </>
          }
          description="Local Balinese people working in hospitality, gardening, and wellness roles. Emphasizing cultural respect and sustainable job creation for the community."
          isComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-4 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <ExperienceCard
            src="videos/feature-7.mp4"
            title={
              <>
                acc<b>o</b>mmodation
              </>
            }
            description="Eco-luxury bamboo villas, surf-style lodges, and treetop pods for the ultimate stay."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <ExperienceCard
            imgSrc="img/cafe.webp"
            title={
              <>
                f<b>o</b>od & retail
              </>
            }
            description="Health-focused cafes, sportswear outlets, and local brands in our vibrant village."
            isComingSoon
          />
        </BentoTilt>

        {/* Extra Card 1: Cultural Balinese moments */}
        <BentoTilt className="bento-tilt_1 md:col-span-1">
          <ExperienceCard
            imgSrc="img/experience-extra-1.webp"
            title={
              <>
                balin<b>e</b>se culture
              </>
            }
            description="Captivating moments of Balinese culture and tradition, woven into the experience."
            isComingSoon
          />
        </BentoTilt>

        {/* Extra Card 2: Tourist lifestyle shots */}
        <BentoTilt className="bento-tilt_1 md:col-span-1">
          <ExperienceCard
            imgSrc="img/experience-extra-2.webp"
            title={
              <>
                t<b>o</b>urist lifestyle
              </>
            }
            description="Tourists enjoying vibrant, relaxing, and adventurous moments throughout the resort."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-1">
          <div 
            className="flex size-full flex-col justify-between relative cursor-pointer"
            onClick={() => alert("Events and activations are coming soon! Stay tuned for exciting global tournaments, music festivals, and lifestyle activations.")}
          >
            {/* Logo at top-right */}
            <img
              src="/img/logo.png"
              alt="Logo"
              className="absolute top-3 right-3 z-20"
              style={{ height: '2.2em', width: 'auto' }}
            />
            <img
              src="img/volleyball.webp"
              alt="Events & activations background"
              className="absolute left-0 top-0 size-full object-cover object-center z-0 rounded-md"
              style={{ filter: 'brightness(0.7)' }}
            />
            <div className="relative z-10 flex flex-col justify-between h-full p-5">
              <h1 className="bento-title special-font max-w-64 text-white drop-shadow-md">
                Ev<b>e</b>nts & <b>a</b>ctivations
              </h1>
              <p className="text-white drop-shadow-md">
                Global tournaments, music festivals, and lifestyle activations that bring the world to Bali.
              </p>
              <TiLocationArrow className="m-5 scale-[5] self-end text-white drop-shadow-md" />
            </div>
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 md:col-span-2 md:row-span-2">
          <ExperienceCard
            src="videos/yoga.mp4"
            title={
              <>
                welln<b>e</b>ss district
              </>
            }
            description="Floating yoga domes, jungle spas, fire circles, and recovery spaces for complete rejuvenation."
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Experience; 