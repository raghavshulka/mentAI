import Navbar from "../Components/Navbar";
import Preview from "../Components/Preview";
import CareValues from "../Components/CareValues";
import Footer from "../Components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BotIcon } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

const Page1 = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#navbar", { y: -100, opacity: 0, duration: 1 });
    tl.from(".op", { opacity: 0, duration: 1, stagger: 0 });
  });
  return (
    <div className="h-screen w-full bg-white overflow-hidden">
      <div className="relative h-full w-full p-4 text-center">
        <img
          className="absolute left-[-10%] top-1/2 w-1/5 transform rotate-[-30deg]"
          src="/imgs/3D Image - 12.png"
          alt="Left Ring"
          width={300}
          height={300}
          id="leftring"
        />
        <img
          className="absolute right-[-15%] top-1/4 w-1/3 transform rotate-[-50deg]"
          src="/imgs/3D Image - 11.png"
          alt="Right Ring"
          width={400}
          height={400}
          id="rightring"
        />
        <h1 className="mt-8 op text-5xl font-semibold text-blue-600">
          Transforming Cough Sounds
        </h1>
        <h2 className="text-5xl op font-semibold mt-3 text-blue-600">
          into Diagnostic Insights
        </h2>
        <p className="mt-4 op text-gray-500 font-light text-lg w-1/3 mx-auto">
          At Hear, we’re revolutionizing healthcare with AI that analyzes cough
          sounds for early diagnosis.
        </p>
        <Spline
          className="z-10 -mt-10"
          scene="https://prod.spline.design/n5pPogRw2nHA4SIc/scene.splinecode"
        />
      </div>
    </div>
  );
};

const Page5 = () => {
  const cardData = [
    {
      id: "card1",
      bgColor: "bg-[#fff6df]",
      icon: "user",
      text: [
        "Mental health conditions affect millions worldwide. Early",
        "detection and timely intervention can significantly improve",
        "treatment outcomes and quality of life.",
      ],
      subHead: ["1 in 4 people experience", "mental health issues yearly"],
      heading: [
        "<span className='text-[#3771fc]'>AI-powered early detection</span>",
        "can provide timely",
        "insights and potentially",
        "prevent crisis.",
      ],
      video: "/videos/drop-svg-final_2.mp4",
    },
    {
      id: "card2",
      bgColor: "bg-[#e2ffdf]",
      icon: "user",
      text: [
        "Traditional mental health assessments can miss subtle signs",
        "of depression and anxiety. Our AI technology helps detect",
        "early warning signs through pattern recognition.",
      ],
      heading: [
        "3 out of 5 people",
        "can get help daily",
        "with <span className='text-[#3771fc]'>AI Therapy</span>",
      ],
      video: "/videos/smile-svg_final.mp4",
    },
    {
      id: "card3",
      bgColor: "bg-[#ffdfdf]",
      icon: "user",
      text: [
        "50% of mental health conditions begin by age 14,",
        "yet often go unrecognized. Early intervention through",
        "AI assistance can lead to better outcomes.",
      ],
      heading: [
        "AI therapy <span className='text-[#3771fc]'>can help 50%</span> of",
        "young people access",
        "mental health support.",
      ],
      video: "/videos/people-svg-final_1.mp4",
    },
  ];
  useGSAP(() => {
    gsap.from("#pg5-header h1", {
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.1,
      scrollTrigger: {
        trigger: "#page5",
        scroller: "body",
        start: "top 70%",
        end: "top 40%",
        // markers: true,
        scrub: 1,
      },
    });

    const tl5 = gsap.timeline({
      scrollTrigger: {
        trigger: "#page5",
        scroller: "body",
        start: "0% 0%",
        end: "200% 0%",
        pin: true,
        scrub: 2,
        // markers: true
      },
    });

    tl5
      .to(
        "#page5 #card3",
        {
          opacity: 0,
        },
        "aa"
      )
      .to(
        "#page5 #circle-1",
        {
          backgroundColor: "transparent",
        },
        "aa"
      )
      .to(
        "#page5 #circle-2",
        {
          backgroundColor: "#000",
        },
        "aa"
      )
      .from(
        "#page5 #card2 .text-div h5",
        {
          transform: "translateY(100%)",
        },
        "a"
      )
      .from(
        "#page5 #card2 #video",
        {
          opacity: 0,
        },
        "a"
      )
      .from(
        "#page5 #card2 .head-div h1",
        {
          transform: "translateY(100%)",
        },
        "a"
      )
      .to(
        "#page5 #card2",
        {
          opacity: 0,
        },
        "bb"
      )
      .to(
        "#page5 #circle-2",
        {
          backgroundColor: "transparent",
        },
        "bb"
      )
      .to(
        "#page5 #circle-3",
        {
          backgroundColor: "#000",
        },
        "bb"
      )
      .from(
        "#page5 #card1 .text-div h5",
        {
          transform: "translateY(100%)",
        },
        "b"
      )
      .from(
        "#page5 #card1 #video",
        {
          opacity: 0,
        },
        "b"
      )
      .from(
        "#page5 #card1 .head-div h1",
        {
          transform: "translateY(100%)",
        },
        "b"
      )
      .from(
        "#page5 #card1 .sub-head-div h3",
        {
          transform: "translateY(100%)",
        },
        "b"
      );
  });
  return (
    <div
      id="page5"
      className="relative md:h-screen h-[700px] px-2 my-4 w-full font-sans p-0  md:px-8 bg-white"
    >
      <div
        id="pg5-header"
        className="w-full md:h-[15vh] flex items-center justify-center"
      >
        <h1 className=" md:text-6xl text-3xl ">
          Why to Trust <span className="text-[#3771fc]">us</span> ?
        </h1>
      </div>
      <div id="cards-wrapper" className="w-full h-[80vh] relative">
        <div
          id="pagination-div"
          className="w-12 h-12 absolute top-1/2 left-[97.4%] z-10 flex flex-col items-center justify-between"
        >
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              id={`circle-${num}`}
              className={`w-2 h-2 rounded-full border border-black ${
                num === 1 ? "bg-black" : ""
              }`}
            ></div>
          ))}
        </div>
        {cardData.map((card, index) => (
          <div
            key={card.id}
            id={card.id}
            className={`card absolute w-full h-full p-8 flex rounded-3xl ${
              card.bgColor
            } ${index === 0 ? "z-20" : index === 1 ? "z-30" : "z-40"}`}
          >
            <div
              id="left"
              className="w-1/2 h-full flex flex-col justify-between"
            >
              <div id="upper" className="flex flex-col gap-4">
                <div
                  id="icon"
                  className="w-10 h-10 bg-black rounded-lg flex items-center justify-center"
                >
                  <BotIcon
                    name={card.icon}
                    className="text-2xl text-white font-thin"
                  />
                </div>
                <div id="text">
                  {card.text.map((line, i) => (
                    <div
                      key={i}
                      id={`text-${i + 1}`}
                      className="text-div overflow-hidden"
                    >
                      <h5 className=" md:text-lg text-sm font-medium">{line}</h5>
                    </div>
                  ))}
                </div>
              </div>
              {card.subHead && (
                <div id="sub-head">
                  {card.subHead.map((line, i) => (
                    <div
                      key={i}
                      id={`sub-head-${i + 1}`}
                      className="sub-head-div overflow-hidden"
                    >
                      <h3 className="md:text-2xl">{line}</h3>
                    </div>
                  ))}
                </div>
              )}
              <div id="heading">
                {card.heading.map((line, i) => (
                  <div
                    key={i}
                    id={`heading-${i + 1}`}
                    className="head-div overflow-hidden"
                  >
                    <h1
                      className="md:text-6xl font-medium leading-tight"
                      dangerouslySetInnerHTML={{ __html: line }}
                    ></h1>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="right"
              className="w-1/2 h-full flex items-end justify-center rounded-lg bg-white"
            >
              <div
                id="video"
                className="w-full h-full bg-transparent flex items-center justify-center"
              >
                <video
                  loop
                  autoPlay
                  muted
                  src={card.video}
                  className="w-full h-full object-contain mix-blend-hard-light"
                ></video>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Advantages: React.FC = () => {
  useGSAP(() => {
    const text = gsap.timeline({
      scrollTrigger: {
        trigger: "#page7",
        start: "top 50%",
        end: "top 10%",
        scrub: true,
      },
    });
    text.from("#page7 .page7-text", {
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.1,
    });
    text.from("#page7 .page7-container>h3 , #page7 .page7-container>p", {
      opacity: 0,
      filter: "blur(10px)",
      stagger: 0.1,
    });
    const tl = gsap.timeline({
      scrollTrigger: {
        scroller: "body",
        trigger: "#page7",
        start: "0% 0%",
        end: "150% 0%",
        scrub: true,
        pin: true,
      },
    });
    tl.to("#page7 .page7-elem", {
      width: "24%",
      stagger: 0.1,
      backgroundColor: "#e2ffdf",
      color: "#07003f",
    });
  });
  return (
    <div id="page7" className="relative flex flex-col md:row  h-screen w-full md:p-8 bg-white">
      <div className="page7-text">
        <h3 className="font-semibold">Advantages</h3>
        <h1 className="text-[4vw] w-[90%]">
          Transforming Mental Health Care With AI
        </h1>
      </div>
      <div className="page7-container relative w-full mt-16">
        <h3 className="relative font-medium">OVERVIEW</h3>
        <p className="relative text-[1.2vw] mt-2 font-semibold">
          Here are four key advantages of using AI-powered mental health
          therapy:
        </p>
        <div className="page7-container-elems relative w-full flex gap-4 h-[45vh] mt-8">
          <div className="page7-elem1 page7-elem relative p-8 text-white rounded-[1vw] flex-shrink-0 flex flex-col justify-between bg-[#217bfe] w-full h-full">
            <h1 className="text-[2vw] whitespace-nowrap">Early Intervention</h1>
            <p className="text-[1vw] w-56 mt-4">
              Our AI technology enables early detection of mental health
              concerns, allowing for timely intervention and support
            </p>
          </div>
          <div className="page7-elem2 page7-elem relative p-8 text-white rounded-[1vw] flex-shrink-0 flex flex-col justify-between bg-[#217bfe] w-1/2">
            <h1 className="text-[2vw] whitespace-nowrap">Personalized Care</h1>
            <p className="text-[1vw] w-56 mt-4">
              AI analyzes individual patterns and responses to provide
              customized therapeutic approaches and recommendations
            </p>
          </div>
          <div className="page7-elem3 page7-elem relative p-8 text-white rounded-[1vw] flex-shrink-0 flex flex-col justify-between bg-[#217bfe] w-1/2">
            <h1 className="text-[2vw] whitespace-nowrap">24/7 Accessibility</h1>
            <p className="text-[1vw] w-56 mt-4">
              Access therapeutic support anytime, anywhere, making mental health
              care more accessible and convenient
            </p>
          </div>
          <div className="page7-elem4 page7-elem relative p-8 text-white rounded-[1vw] flex-shrink-0 flex flex-col justify-between bg-[#217bfe] w-1/2">
            <h1 className="text-[2vw] whitespace-nowrap">
              Enhanced Monitoring
            </h1>
            <p className="text-[1vw] w-56 mt-4">
              Continuous monitoring and analysis of emotional patterns helps
              track progress and adjust treatment plans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className={`  overflow-x-hidden`}>
      <Navbar />
      <Page1 />
      <Preview />
      <Page5 />
      <CareValues />
      <Advantages />
      <Footer />
    </div>
  );
};

export default Home;
