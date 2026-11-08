
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useCallback, useEffect, useRef, useState } from "react";

const navItems = ["GAMES", "SHOP", "EXPLORE", "COMMUNITY", "SUPPORT"];

const musicPlaylist = [
  {
    title: "Minecraft Theme",
    src: "/audio/minecraft-1.mp3",
  },
  {
    title: "Sweden",
    src: "/audio/minecraft-2.mp3",
  },
  {
    title: "Wet Hands",
    src: "/audio/minecraft-3.mp3",
  },
  {
    title: "Minecraft Calm",
    src: "/audio/minecraft-4.mp3",
  },
  {
    title: "Minecraft Adventure",
    src: "/audio/minecraft-5.mp3",
  },
];

const NavBar = () => {
  // Restore selected song
  const [currentTrack, setCurrentTrack] = useState(() => {
    const savedTrack = Number(
      localStorage.getItem("minecraftCurrentTrack")
    );

    return Number.isInteger(savedTrack) &&
      savedTrack >= 0 &&
      savedTrack < musicPlaylist.length
      ? savedTrack
      : 0;
  });

  // Always start paused after refresh
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const lastScrollY = useRef(0);
  const savedTimeRef = useRef(0);

  // Navbar
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Restore saved playback position
  useEffect(() => {
    const savedTime = Number(
      localStorage.getItem(`minecraftTrackTime_${currentTrack}`)
    );

    savedTimeRef.current =
      Number.isFinite(savedTime) && savedTime > 0
        ? savedTime
        : 0;
  }, [currentTrack]);

  // Save playback position
  const saveMusicProgress = useCallback(() => {
    const audio = audioElementRef.current;

    if (!audio || !Number.isFinite(audio.currentTime)) return;

    savedTimeRef.current = audio.currentTime;

    localStorage.setItem(
      `minecraftTrackTime_${currentTrack}`,
      String(audio.currentTime)
    );
  }, [currentTrack]);

  // Toggle music
  const toggleAudioIndicator = useCallback(async () => {
    const audio = audioElementRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      saveMusicProgress();

      setIsAudioPlaying(false);
      setIsIndicatorActive(false);

      localStorage.setItem("minecraftMusicPlaying", "false");
      return;
    }

    try {
      await audio.play();

      setIsAudioPlaying(true);
      setIsIndicatorActive(true);

      localStorage.setItem("minecraftMusicPlaying", "true");
    } catch (error) {
      console.error("Audio playback failed:", error);

      setIsAudioPlaying(false);
      setIsIndicatorActive(false);

      localStorage.setItem("minecraftMusicPlaying", "false");
    }
  }, [saveMusicProgress]);

  // Spacebar play/pause
  useEffect(() => {
    const handleSpaceKey = (event) => {
      const target = event.target;

      // Don't interfere with typing or interactive elements
      if (
        target instanceof HTMLElement &&
        (
          target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT", "BUTTON", "A"].includes(
            target.tagName
          )
        )
      ) {
        return;
      }

      if (event.code === "Space" && !event.repeat) {
        event.preventDefault();
        toggleAudioIndicator();
      }
    };

    window.addEventListener("keydown", handleSpaceKey);

    return () => {
      window.removeEventListener("keydown", handleSpaceKey);
    };
  }, [toggleAudioIndicator]);

  // Restore playback position after metadata loads
  const handleLoadedMetadata = () => {
    const audio = audioElementRef.current;

    if (!audio) return;

    const savedTime = savedTimeRef.current;

    if (
      savedTime > 0 &&
      Number.isFinite(audio.duration) &&
      savedTime < audio.duration
    ) {
      audio.currentTime = savedTime;
    }
  };

  // Automatically play next song
  const handleSongEnded = () => {
    localStorage.removeItem(
      `minecraftTrackTime_${currentTrack}`
    );

    savedTimeRef.current = 0;

    setCurrentTrack((prev) => (prev + 1) % musicPlaylist.length);
  };

  // Save selected track
  useEffect(() => {
    localStorage.setItem(
      "minecraftCurrentTrack",
      String(currentTrack)
    );
  }, [currentTrack]);

  // Load next track and continue playback
  useEffect(() => {
    const audio = audioElementRef.current;

    if (!audio) return;

    audio.load();

    if (isAudioPlaying) {
      audio.play().catch((error) => {
        console.error("Next track playback failed:", error);

        setIsAudioPlaying(false);
        setIsIndicatorActive(false);

        localStorage.setItem("minecraftMusicPlaying", "false");
      });
    }
  }, [currentTrack]);

  // Sync indicator with audio
  useEffect(() => {
    const audio = audioElementRef.current;

    if (!audio) return;

    const handlePlay = () => setIsIndicatorActive(true);
    const handlePause = () => setIsIndicatorActive(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Navbar visibility on scroll
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY.current) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY.current) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    lastScrollY.current = currentScrollY;
  }, [currentScrollY]);

  // GSAP navbar animation
  useEffect(() => {
    if (!navContainerRef.current) return;

    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Save progress and cleanup
  useEffect(() => {
    return () => {
      saveMusicProgress();
      audioElementRef.current?.pause();
    };
  }, [saveMusicProgress]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 bg-[#313131]/80 backdrop-blur-md !rounded-none"
    >
      <style>
        {`
          .nav-hover-btn::after {
            background-color: #43a047 !important;
          }

          .floating-nav {
            border-radius: 0px !important;
          }
        `}
      </style>

      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between px-4 sm:px-6">

          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                src="/img/logo.png"
                alt="Minecraft Logo"
                className="h-8 w-8 object-contain"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-hover-btn font-minecraft-seven-v2 text-sm text-white"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Music Indicator */}
          <div className="flex items-center">
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5 cursor-pointer p-1"
              title={
                isAudioPlaying
                  ? `Pause: ${musicPlaylist[currentTrack].title}`
                  : `Play: ${musicPlaylist[currentTrack].title}`
              }
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src={musicPlaylist[currentTrack].src}
                onEnded={handleSongEnded}
                onTimeUpdate={saveMusicProgress}
                onPause={saveMusicProgress}
                onLoadedMetadata={handleLoadedMetadata}
                preload="auto"
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
