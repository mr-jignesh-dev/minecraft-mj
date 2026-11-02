import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top top", // <--- CHANGED FROM "center center" TO "top top"
        end: "+=800",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <section
      id="about"
      className="relative min-h-screen w-screen overflow-hidden bg-[#171717] pt-20 text-white"
    >
      {/* About heading */}
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[15px]">
          Welcome to Minecraft
        </p>

        <AnimatedTitle
          title="Anything you can dream about here, <br /> you can make"
          containerClass="mt-7 !text-gray-200 text-center text-lg sm:text-2xl lg:text-3xl font-minecraft-seven-v2 tracking-wide"
        />

        <div className="about-subtext">
          <p className="font-minecraft-seven-v2 text-gray-200">
            Create your world, and don't let others shape it for you.
          </p>

          <p className="font-minecraft-seven-v2 text-gray-500">
            A new world always offers a chance for growth and discovery.
          </p>
        </div>
      </div>

      {/* Scroll image reveal */}
      <div id="clip" className="relative h-dvh w-screen">
        <div className="mask-clip-path about-image">
          <img
            src="/img/hero-img-7.png"
            alt="Minecraft world"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;