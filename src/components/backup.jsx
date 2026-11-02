import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useState, useRef, useEffect } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";
import Loader from "./Loader";

gsap.registerPlugin(ScrollTrigger);

const totalImgs = 3;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);
  const loaderRef = useRef(null);
  const nextImgRef = useRef(null);
  const imageRef = useRef(null);

  // Manage body scroll lock during loading state only
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [loading]);

  // Handle loader timing and smooth GSAP exit transition into hero
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        scale: 1.1,
        filter: "blur(10px)",
        duration: 1.0,
        ease: "power2.inOut",
        onComplete: () => {
          setLoading(false);
          // Smooth unmask transition for the main hero image
          gsap.to(imageRef.current, {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.6,
            ease: "expo.out",
          });
        },
      });
    }, 5500);

    return () => clearTimeout(timer);
  }, []);

  const handleMiniImgClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalImgs) + 1);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-img", { visibility: "visible" });
        gsap.to("#next-img", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
        });
        gsap.from("#current-img", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // Restore the ScrollTrigger cinematic frame transition animation
  useGSAP(() => {
    gsap.set("#img-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#img-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#img-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getImgSrc = (index) => `/heros/hero-img-${index}.png`;

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[150vh] w-screen overflow-x-hidden bg-amber-200 select-none"
      style={{
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      <style>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Loading Screen Overlay */}
      {loading && (
        <div 
          ref={loaderRef}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-4 bg-black pointer-events-auto"
        >
          <Loader />
          <p className="font-minecraft-seven-v2 text-sm text-gray-300 tracking-widest animate-pulse">
            GENERATING WORLD...
          </p>
        </div>
      )}

      <div
        id="img-frame"
        className="relative z-10 h-screen w-screen overflow-hidden border-2 sm:border-4 border-zinc-700 bg-black"
      >
        <div>
          <div className="absolute-center absolute z-50 size-48 sm:size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniImgClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 size-full flex items-center justify-center"
              >
                <img
                  src={getImgSrc((currentIndex % totalImgs) + 1)}
                  alt="Mini preview"
                  id="current-img"
                  className="size-48 sm:size-64 object-cover object-center rounded-lg"
                />
              </div>
            </VideoPreview>
          </div>
          
          <img 
            ref={nextImgRef} 
            alt="Next background" 
            src={getImgSrc(currentIndex)}
            id="next-img"
            className="absolute-center invisible absolute z-20 size-48 sm:size-64 object-cover object-center"
          />

          <img 
            ref={imageRef}
            src={getImgSrc(currentIndex)} 
            alt="Current background" 
            style={{ clipPath: "inset(0 0 100% 0)" }}
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        {/* Foreground WORLD Text */}
        <h1 
          className="text-5xl sm:text-7xl md:text-8xl absolute bottom-10 sm:bottom-16 right-4 sm:right-6 z-40 font-minecraft-seven-v2 font-bold tracking-wider pointer-events-none select-none"
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #d8d8d8 50%, #aaaaaa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(3px 3px 0px #171717) drop-shadow(6px 6px 0px #0a0a0a)"
          }}
        >
          WORLD
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full p-6 sm:p-10 pointer-events-none">
          <div className="pointer-events-auto inline-block max-w-full">
            <h1 
              className="text-5xl sm:text-7xl md:text-8xl mt-12 mb-4 font-minecraft-seven-v2 font-bold tracking-wider leading-none"
              style={{
                background: "linear-gradient(to bottom, #ffffff 0%, #d8d8d8 50%, #aaaaaa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(3px 3px 0px #171717) drop-shadow(6px 6px 0px #0a0a0a)"
              }}
            >
              MINECRAFT
            </h1>
            <p className="mb-5 max-w-xs sm:max-w-64 text-xs sm:text-sm text-gray-200 font-minecraft-seven-v2 drop-shadow-[2px_2px_0_#171717]">
              The Ultimate Block-Building Adventure
            </p>
            <Button
              id="watch-trailer"  
              title="WATCH TRAILER"
              containerClass="group relative z-10 flex items-center justify-center gap-3 bg-[#428a2a] hover:bg-[#4e9e33] border-t-2 border-[#63b346] border-b-4 border-b-[#2b5c1b] px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-minecraft-seven-v2 text-white tracking-wider cursor-pointer active:border-b-2 active:translate-y-[2px] transition-all"
              onClick={() => window.open("https://www.youtube.com/watch?v=1DhWXAiNgfQ", "_blank")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;  