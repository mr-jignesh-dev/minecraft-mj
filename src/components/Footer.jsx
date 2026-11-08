
import {
  FaDiscord,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import Button from "./Button";

const socialLinks = [
  {
    href: "https://www.youtube.com/minecraft",
    icon: <FaYoutube />,
    label: "YouTube",
  },
  {
    href: "https://x.com/Minecraft",
    icon: <FaXTwitter />,
    label: "XTwitter",
  },
  {
    href: "https://discord.com/invite/minecraft",
    icon: <FaDiscord />,
    label: "Discord",
  },
];

const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden border-t-4 border-[#263f1c] bg-[#79553a] text-white">

      {/* Minecraft grass layer */}
      <div className="absolute inset-x-0 top-0 h-2 bg-[#5e9e32] shadow-[0_3px_0_#3c8527]" />

      {/* Dirt texture pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, #171717 2px, transparent 2px),
            linear-gradient(#171717 2px, transparent 2px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Footer content */}
      <div className="container relative z-10 mx-auto flex flex-col items-center justify-between gap-6 px-5 py-9 md:flex-row">

        {/* Left side */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6"> 

          {/* Copyright */}
          <p
            className="
              font-minecraft-seven-v2
              text-[10px] tracking-wider
              text-[#f5e6c8]
              transition-colors duration-200
              hover:text-[#5e9e32]
              hover:underline
              sm:text-xs
            "
          >
           © 2026 Mojang AB. All Right Reserved.
          </p>
        </div>

        {/* Privacy Policy */}
        <a
          href="#privacy-policy"
          className="
            font-minecraft-seven-v2
            text-[10px] tracking-wider
            text-[#f5e6c8]
            transition-colors duration-200
            hover:text-[#5e9e32]
            hover:underline
            sm:text-xs
          "
        >
          Privacy and Cookies
        </a>

        {/* Right side - Minecraft social buttons */}
        <div className="flex items-center gap-3 md:ml-auto">
          {socialLinks.map((link) => (
            <Button
              key={link.label}
              id={`social-${link.label.toLowerCase()}`}
              title=""
              leftIcon={link.icon}
              onClick={() =>
                window.open(
                  link.href,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              containerClass="
                !w-11 !h-11 !p-0
                !flex !items-center !justify-center
                !gap-0
                !rounded-none
                bg-[#3c7e26]
                hover:bg-[#46912b]
                active:bg-[#3c7e26]
                active:translate-y-0
                active:scale-100
                focus:outline-none
                border-t-2 border-[#59a83a]
                border-b-4 border-b-[#1f4712]
                text-lg text-white
                cursor-pointer
                select-none
                transition-none
              "
            />
          ))}
        </div>
      </div>

      {/* Minecraft block bottom edge */}
      <div className="relative z-10 flex h-3 w-full">
        <div className="w-1/4 bg-[#3c8527]" />
        <div className="w-1/4 bg-[#79553a]" />
        <div className="w-1/4 bg-[#5e9e32]" />
        <div className="w-1/4 bg-[#3c8527]" />
      </div>
    </footer>
  );
};

export default Footer;
