import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Highlighttext from "../components/core/homepage/highlighttext";
import Ctabutton from "../components/core/homepage/ctabutton";
import banner from "../assets/Images/banner.mp4";
import { ImYoutube } from "react-icons/im";
import Exploremore from "../components/core/homepage/exploremore";
import Instructorsection from "../components/core/homepage/instructorsection";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import Timelinesection from "../components/core/homepage/Timelinesection";
import Learninglanguagesection from "../components/core/homepage/Learninglanguagesection";
import { FaSquareTwitter } from "react-icons/fa6";
import CodeBlocks from "../components/core/homepage/codeblocks";
import LogoFullLight from "../assets/Logo/Logo-Full-Light.png";
import "./home.css";
function Home() {
  return (
    <div>
      {/* section 1*/}

      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-315">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-[#161D29] font-bold text-[#999DAA] transition-all duration-200 hover:scale-95 w-fit hover:shadow-2xl">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-1 transition-all duration-200 group-hover:scale-95 group-hover:bg-[#000814]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-4">
          Empower your Future With <Highlighttext text={"Coding Skills"} />
        </div>

        <div className="text-center text-[#999DAA]  text-lg font-bold mt-4 ">
          with our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources
          ,including hands on projects , quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <Ctabutton active={true} linkto={"/signup"}>
            Learn more
          </Ctabutton>

          <Ctabutton linkto={"/login"}>Book a demo</Ctabutton>
        </div>

        <div className=" mx-12 my-12 w-fit  right-bottom-shadow">
          <video muted loop autoPlay className="w-125 h-auto " >
            <source src={banner} type="video/mp4"  />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* {code section 1} */}
        <div>
          <CodeBlocks
            position={"left"}
            heading={
              <div className="text-3xl font-semibold">
                Unlock Your
                <Highlighttext text={" Coding Potentials "}></Highlighttext>
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industary exports who have years of experience in coding and are passinate about sharing their knowledge with you."
            }
            ctabutton1={{
              btnText: "try it your self",
              linkto: "/signup",
              active: true,
            }}
            ctabutton2={{
              btnText: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                            <html>
                            <head><title>example</
                            title<>linkrel="stylesheet" href="styles.css">
                            <body>
                            h1><a href="/">header</a>
                            </body>`}
            codecolor={"text-yellow-200"}
          />
        </div>

        <div>
          <CodeBlocks
            position={"right"}
            heading={
              <div className="text-3xl font-semibold">
                Start
                <Highlighttext text={" Coding in seconds "}></Highlighttext>
              </div>
            }
            subheading={
              "Go ahead, give it a try . Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabutton1={{
              btnText: "Continue Learning",
              linkto: "/login",
              active: true,
            }}
            ctabutton2={{
              btnText: "Learn More",
              linkto: "/signup",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>
                            <html>
                            <head><title>example</
                            title<>linkrel="stylesheet" href="styles.css">
                            <body>
                            h1><a href="/">header</a>
                            </body>`}
            codecolor={"text-white"}
          ></CodeBlocks>
        </div>

        <Exploremore/>
      </div>

      {/* section 2 */}

      <div className="bg-[#F9F9F9] text-[#2C333F] ">
        <div className="homepage_bg h-83">
          <div className="w-11/12 max-w-312.5 flex flex-col items-center gap-5 mx-auto">
            <div className="h-37.5"></div>
            <div className="flex flex-row gap-7 text-white mx-auto">
              <Ctabutton active={true} linkto={"/signup"}>
                <div className="flex gap-3 items-center">
                  Explore full catalog<FaArrowRight></FaArrowRight>
                </div>
              </Ctabutton>
              <Ctabutton active={false} linkto={"/signup"}>
                <div className="flex gap-3 items-center">Learn More</div>
              </Ctabutton>
            </div>
          </div>
        </div>
        <div className="mx-auto w-11/12 max-w-315 flex flex-col gap-5 items-center justify-center">
          <div className=" flex flex-row gap-10 h-47.5 items-center p-12 mx-auto justify-center ">
            <div>
              <span className="text-3xl font-extrabold">
                Get the Skills you need for a{" "}
              </span>
              <Highlighttext text={"job that is in demand."}></Highlighttext>
            </div>
            <div className="flex flex-col">
              <div>
                The mordern Studynotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
                <div className="h-5"></div>
              <div className="flex">
                <Ctabutton
                  className="w-max self-start"
                  active={true}
                  linkto={"/signup"}
                >
                  <div className="flex items-center">Learn More</div>
                </Ctabutton>
              </div>
            </div>
            <div></div>
          </div>
        </div>

        <Timelinesection/>
        <Learninglanguagesection/>
        
      </div>

      {/* section 3 */}
      <div className="w-11/12 mx-auto max-w-225 flex flex-col items-center justify-between gap-8 bg-[#000814] text-white ">

                <Instructorsection></Instructorsection>
                <h2 className="text-center text-3xl font-semibold mt-10">Review From Other Learner</h2>
                {/* REVIEWS SLIDERS HERE */}
      </div>

      {/* footer */}

      <div className="flex flex-col bg-[#161D29] justify-between p-6">
        <div className=" flex bg-[#161D29] ">
          <div className=" flex flex-col bg-[#161D29] h-75 p-2">
            <div>
              <img src={LogoFullLight}></img>
            </div>
            <div className="text-[#B5B5B5] font-bold text-xl">
              <Link to={"/"}>Company</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold ">
              <Link to={"/about"}>About</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold ">
              <Link to={"/catagory"}>Category</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link to={"/contact"}>Contact</Link>
            </div>
            <div className="flex">
              <FaFacebook className="text-4xl" />
              <FaInstagram className="text-4xl" />
              <FaSquareTwitter className="text-4xl" />
              <ImYoutube className="text-4xl" />
            </div>
          </div>
          <div className="bg-[#161D29] flex flex-col h-75 p-2">
            <div className="text-[#B5B5B5] font-bold text-xl">Resources</div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link>Article</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link>Blog</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link>Docs</Link>
            </div>
          </div>
          <div className="bg-[#161D29] flex flex-col h-75 p-2">
            <div className="text-[#B5B5B5] font-bold text-xl">Plans</div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link>Built membership</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link> Fundamentals</Link>
            </div>
            <div className="text-[#9E9E9E] font-semibold">
              <Link>Bussiness solutions</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-[#2C333F]"></div>
      </div>
    </div>
  );
}
export default Home;
