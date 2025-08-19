type Props = {
  title?: string;
  text?: string;
  imageUrl: string;
};

export default function WelcomeHero({
  title = "Redefining 'Home'",
  text = `At The Flex, we believe 'home' should never limit your possibilities. 
We exist to redefine how people travel, live and work with solutions that 
prioritise freedom, adaptability, and flexibility.`,
  imageUrl,
}: Props) {
  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#FFFDF6]
        h-[48vh] md:h-[52vh] lg:h-[56vh]
        min-h-[320px] max-h-[620px]
        rounded-none md:rounded-2xl
      "
    >
      {/* Background image */}
      <img
        src={imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Soft vignette so text pops on any image */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-black/0 to-black/10" />

      {/* Content container */}
      <div className="relative z-10 mx-auto h-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Place the card near left; vertically centered */}
        <div className="flex h-full items-center">
          <div
            className="
              max-w-xl bg-white/90 backdrop-blur-sm
              border border-white/60 shadow-xl
              rounded-2xl p-5 sm:p-6 md:p-8
            "
          >
            <h1
              className="
                font-semibold leading-tight text-[#1d3e3c]
                [font-size:clamp(28px,4vw,44px)]
              "
            >
              {title}
            </h1>

            <p className="mt-4 text-[15px] md:text-base leading-relaxed text-gray-700">
              {text}
            </p>

            {/* Optional: tiny CTA row */}
            {/* <div className="mt-5 flex gap-3">
              <button className="rounded-lg bg-[#284E4C] px-4 py-2 text-white hover:opacity-90">
                Explore stays
              </button>
              <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-800 hover:bg-gray-50">
                Learn more
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
