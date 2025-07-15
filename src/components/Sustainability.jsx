import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

// BentoTilt component from the first code
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

// ExperienceCard component from the first code
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
    alert("This sustainability initiative is coming soon! Stay tuned for updates.");
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
          alt={typeof title === 'string' ? title : 'Sustainability image'}
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

const Sustainability = () => (
  <section id="sustainability" className="bg-black pb-20">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-circular-web text-2xl md:text-3xl lg:text-4xl font-bold text-blue-50">
            Sustainability & Community Impact
          </h2>
          <img src="/img/logo.png" alt="Logo" className="h-9 w-auto md:h-10" />
        </div>
        <p className="max-w-2xl font-circular-web text-lg md:text-xl text-blue-50 opacity-70 leading-relaxed">
          We are committed to building a world-class, fully sustainable sports facility that creates long-term value for both the community and the environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-3 gap-7 h-auto">
        {/* Card 1: Large, top-left */}
        <BentoTilt className="border-hsla rounded-md md:col-span-2 md:row-span-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/kidszone.webp"
            title={
              <>
                youth <b>d</b>evelopment
              </>
            }
            description="Dedicated programs to nurture local talent, offering scholarships and training for Olympic and SEA Games hopefuls."
            isComingSoon
          />
        </BentoTilt>

        {/* Card 2: Small, top-right */}
        <BentoTilt className="border-hsla rounded-md md:col-span-1 md:row-span-1 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/contract.webp"
            title={
              <>
                local <b>e</b>mployment
              </>
            }
            description="Creating jobs for the community in construction, operations, hospitality, and sports training."
            isComingSoon
          />
        </BentoTilt>

        {/* Card 3: Tall, middle-right */}
        <BentoTilt className="border-hsla rounded-md md:col-span-1 md:row-span-2 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/solar.webp"
            title={
              <>
                100% <b>s</b>olar <b>e</b>nergy
              </>
            }
            description="Facility powered entirely by renewable solar energy, reducing carbon footprint and promoting clean power."
            isComingSoon
          />
        </BentoTilt>

        {/* Card 4: Recycled Seawater - now larger and with extra gap below */}
        <BentoTilt className="border-hsla rounded-md md:col-span-2 md:row-span-1 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/water.webp"
            title={
              <>
                recycled <b>s</b>eawater
              </>
            }
            description="Innovative water systems recycle seawater for pools and irrigation, conserving fresh water resources."
            isComingSoon
          />
        </BentoTilt>

        {/* Card 5: Wide, bottom-center */}
        <BentoTilt className="border-hsla rounded-md md:col-span-2 md:row-span-1 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/renewable.webp"
            title={
              <>
                eco-friendly <b>m</b>aterials
              </>
            }
            description="Built using environmentally responsible materials for minimal ecological impact."
            isComingSoon
          />
        </BentoTilt>

        {/* Card 6: Small, bottom-right */}
        <BentoTilt className="border-hsla rounded-md md:col-span-1 md:row-span-1 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <ExperienceCard
            imgSrc="img/event.webp"
            title={
              <>
                global <b>s</b>ports <b>t</b>ourism
              </>
            }
            description="Attracting international athletes, events, and visitors, making the region a hub for high-performance sport and inclusive growth."
            isComingSoon
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Sustainability;