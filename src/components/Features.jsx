import { useState, useRef } from "react";

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

export const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <img
        src={src}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          {title && <h1 className="bento-title special-font">{title}</h1>}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-32 md:pb-52">
    <div className="container mx-auto px-4 md:px-10">
      <div className="py-16 md:py-32 flex flex-col items-center text-center">
        <h2 className="font-minecraft-seven-v2 text-xl md:text-4xl text-white tracking-wider drop-shadow-[2px_2px_0_#000]">
          DISCOVER THE WORLD OF MINECRAFT
        </h2>
        <p className="mt-4 max-w-xl font-minecraft-seven-v2 text-xs md:text-sm text-[#aaaaaa] leading-relaxed px-2">
          Build anything you can imagine, uncover eerie mysteries, and survive the night in the ultimate sandbox adventure game. In Minecraft, every playthrough is different, and unforgettable adventures await behind every corner. Explore and craft your way through an infinite world that’s yours to shape, one block at a time.
        </p>
      </div>

      {/* Hero Bento Card */}
      <BentoTilt className="border-hsla relative mb-6 md:mb-7 h-64 sm:h-80 md:h-[65vh] w-full overflow-hidden">
        <BentoCard src="img/feature-1.png" />
      </BentoTilt>

      {/* Clean Responsive Bento Grid */}
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
        {/* Card 1 */}
        <BentoTilt className="h-72 sm:h-96 md:h-[600px] w-full overflow-hidden">
          <BentoCard src="img/feature-2.png" />
        </BentoTilt>

        {/* Right Column Stack */}
        <div className="flex flex-col gap-6 md:gap-7">
          <BentoTilt className="h-72 sm:h-48 md:h-[286px] w-full overflow-hidden">
            <BentoCard src="img/feature-3.png" />
          </BentoTilt>

          <BentoTilt className="h-72 sm:h-48 md:h-[286px] w-full overflow-hidden">
            <BentoCard src="img/feature-4.png" />
          </BentoTilt>
        </div>

        {/* Bottom Cards: Full width on mobile, side-by-side on desktop */}
        <BentoTilt className="h-64 sm:h-80 md:h-[350px] w-full overflow-hidden">
          <BentoCard src="img/feature-5.png" />
        </BentoTilt>

        <BentoTilt className="h-64 sm:h-80 md:h-[350px] w-full overflow-hidden">
          <BentoCard src="img/feature-6.png" />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;