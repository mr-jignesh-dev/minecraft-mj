import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass, alt = "" }) => (
  <div className={clipClass}>
    <img src={src} alt={alt} className="size-full object-cover !rounded-none" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-4 md:px-10">
      <style>{`
        #contact .relative {
          border-radius: 0px !important;
        }
      `}</style>
      <div className="relative !rounded-none bg-black py-20 text-[#aaaaaa] overflow-hidden border-2 border-[#373737]">
        
        {/* Left Side Decorative Images (Desktop & Tablet) */}
        <div className="absolute left-4 top-4 hidden sm:block w-36 lg:w-48 h-36 lg:h-48 z-0">
          <ImageClipBox
            src="/img/contact1.png"
            clipClass="contact-clip-path-1 size-full"
            alt="Enderman Realm"
          />
        </div>

        <div className="absolute left-4 bottom-4 hidden sm:block w-32 lg:w-44 h-32 lg:h-44 z-0">
          <ImageClipBox
            src="/img/contact2.png"
            clipClass="contact-clip-path-2 size-full"
            alt="Minecraft Steve"
          />
        </div>

        {/* Right Side / Mobile Torch Image */}
        {/* Desktop: Pinned to right edge full-height */}
        {/* Mobile: Centered at top above header */}
        <div className="absolute inset-x-0 top-0 sm:top-auto sm:inset-y-0 sm:left-auto sm:right-6 sm:w-48 lg:w-64 h-48 sm:h-full flex justify-center sm:block z-0 opacity-40 sm:opacity-100">
          <ImageClipBox
            src="/img/contact3.png"
            clipClass="sword-man-clip-path h-full w-auto sm:w-full object-contain"
            alt="Minecraft Torch Sunset"
          />
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center relative z-10 px-4 pt-12 sm:pt-0">
          <p className="mb-4 font-minecraft-seven-v2 text-xs md:text-sm uppercase tracking-widest text-[#aaaaaa]">
            JOIN THE MINECRAFT
          </p>

           <AnimatedTitle 
            title="LET'S BUILD THE <br /> NEW ERA OF <br /> ADVENTURE TOGETHER."
            containerClass="mt-7 !text-gray-200 text-center text-lg sm:text-2xl lg:text-3xl font-minecraft-seven-v2 tracking-wide"
          />

          <div className="mt-8">
            
          <Button
            title="CONTACT US"
            containerClass="
              font-minecraft-seven-v2
              !rounded-none
              border-2
              border-t-[#ffffff]
              border-l-[#ffffff]
              border-r-[#373737]
              border-b-[#373737]
              bg-[#727272]
              px-8 py-3
              text-sm
              tracking-wider
              text-white
              shadow-[4px_4px_0px_#171717]
              transition-none
              hover:bg-[#858585]
              hover:border-t-[#ffffff]
              hover:border-l-[#ffffff]
              hover:border-r-[#373737]
              hover:border-b-[#373737]
              active:translate-y-[2px]
              active:shadow-[2px_2px_0px_#171717]
            "
          />

          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;