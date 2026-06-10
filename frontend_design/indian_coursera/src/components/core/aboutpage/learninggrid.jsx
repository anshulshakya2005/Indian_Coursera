import Ctabutton from "../homepage/ctabutton";
import Highlighttext from "../homepage/highlighttext";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

function Learninggrid() {
  return (
    <div className="grid mx-auto grid-cols-4 mb-10 mt-11 pl-24 pr-24">{
        LearningGridArray.map((card,index)=>{
            return (
                <div
                key={index}
                className={`${index===0 && "col-span-2 h-[230px]"}
                 ${
                    card.order%2 === 1?"bg-[#2C333F] ":"bg-[#161D29] "
                }
                ${
                    card.order<0 &&"bg-transparent"
                }
                ${card.order===3&&"col-start-2 h-[230px]"}
                text-white p-4
                `
               
                }

                >
                    {
                        card.order <0 ?(
                            <div>
                                <div className="text-xl font-bold mb-3.5">{card.heading} <Highlighttext text={card.highlightText}></Highlighttext></div>
                                
                                <p>{card.description}</p>
                                <div className="w-fit">
                                    <Ctabutton  active={true} linkto={card.BtnLink}>{card.BtnText}</Ctabutton>
                            
                                </div>
                                </div>
                        ):(
                            <div>
                                <h1 className="text-xl font-bold mb-3.5">{card.heading}</h1>
                                <p>{card.description}</p>
                            </div>
                        )
                    }
                </div>
            )
        })
    }</div>
  );
}
export default Learninggrid;
