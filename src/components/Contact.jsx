import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const handleGetInvolvedClick = () => {
    // Open email client with pre-filled subject and body
    const subject = encodeURIComponent("FLO X BALI - Get Involved");
    const body = encodeURIComponent("Hi, I'm interested in getting involved with FLO X BALI. Please provide more information about opportunities.");
    window.open(`mailto:info@floxbali.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div id="contact" className="my-20 min-h-96 w-screen  px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-100">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[14px] uppercase">
            Join FLO X BALI
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> future of <br /> s<b>p</b>orts t<b>o</b>gether."
            className="special-font !md:text-[5rem] w-full font-zentry !text-4xl !font-black !leading-[.9]"
          />

          <Button title="get involved" containerClass="mt-10 cursor-pointer" onClick={handleGetInvolvedClick} />
        </div>
      </div>
    </div>
  );
};

export default Contact;
