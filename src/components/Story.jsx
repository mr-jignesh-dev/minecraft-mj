import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-[#aaaaaa]">
      <style>{`
        .story-img-container, .story-img-mask, .story-img-content {
          border-radius: 0px !important;
        }
      `}</style>
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <p className="font-minecraft-seven-v2 text-xs md:text-sm uppercase tracking-widest text-[#aaaaaa]">
          THE SHADOW OF HEROBRINE
        </p>

        <div className="relative size-full">
          <div className="mt-5 pointer-events-none mix-blend-difference relative z-10 flex justify-center text-center">
            <h2 className="font-minecraft-seven-v2 text-3xl md:text-5xl text-white tracking-wider drop-shadow-[2px_2px_0_#3f3f3f]">
              BORN FROM THE UNKNOWN
            </h2>
          </div>

          <div className="story-img-container !rounded-none">
            <div className="story-img-mask !rounded-none">
              <div className="story-img-content !rounded-none">
                <img
                  ref={frameRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  src="/img/story2.png"
                  alt="entrance.webp"
                  className="size-full object-cover object-center !rounded-none"
                />
              </div>
            </div>

            {/* for the rounded corner filter cleanup */}
            <svg
              className="invisible absolute size-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="flt_tag">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="8"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                    result="flt_tag"
                  />
                  <feComposite
                    in="SourceGraphic"
                    in2="flt_tag"
                    operator="atop"
                  />
                </filter>
              </defs>
            </svg>
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end z-20">
          <div className="flex h-full w-fit flex-col items-center md:items-start px-4">
            <p className="mt-3 max-w-sm text-center font-minecraft-seven-v2 text-xs md:text-sm text-[#aaaaaa] md:text-start leading-relaxed tracking-wide">
              He is not supposed to exist. But if you see two glowing white eyes staring through the dense render distance... run.
            </p>

            <div className="mt-5">
              <Button
                id="realm-btn"
                title="UNCOVER THE SHADOW"
                containerClass="font-minecraft-seven-v2 !rounded-none bg-[#727272] border-2 border-t-[#ffffff] border-l-[#ffffff] border-r-[#373737] border-b-[#373737] hover:bg-[#7e7e7e] text-white tracking-wider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;