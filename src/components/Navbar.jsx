import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const navItems = ["GAMES", "SHOP", "EXPLORE", "COMMUNITY", "SUPPORT"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    if (navContainerRef.current) {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      });
    }
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 bg-[#313131]/80 backdrop-blur-md rounded-lg"
    >
      <style>{`
        .nav-hover-btn::after {
          background-color: #43a047 !important;
        }
      `}</style>
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 sm:px-6">
          
          {/* Logo Image */}
          <div className="flex items-center gap-3 cursor-pointer">
            <img src="/img/logo.png" alt="logo" className="w-8 h-8 object-contain" />
          </div>

          {/* Navigation Links with Pixel Minecraft Font */}
          <div className="flex h-full items-center">
            <div className="hidden md:flex items-center gap-6 text-xs lg:text-sm">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn flex items-center gap-1 text-white font-minecraft-seven-v2"
                >
                  <span className="font-minecraft-seven-v2 tracking-wider">{item}</span>
                  {["GAMES", "SHOP", "EXPLORE", "COMMUNITY"].includes(item) }
                </a>
              ))}
            </div>

            {/* Music Click Animation Bars */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 cursor-pointer p-1"
              title="Toggle ambient audio"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>

        </nav>
      </header>
    </div>
  );
};

export default NavBar;