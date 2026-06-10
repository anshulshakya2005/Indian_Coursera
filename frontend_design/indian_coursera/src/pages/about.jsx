import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import founding from "../assets/Images/FoundingStory.png";
import Highlighttext from "../components/core/homepage/highlighttext";
import Learninggrid from "../components/core/aboutpage/learninggrid";
import Contactformsection from "../components/core/aboutpage/contactformsection";
function About(){
    return (
        <div>
            <div className="flex flex-col items-center justify-center bg-[#2C333F] ">
                <div className="flex flex-col font-bold items-center mx-auto w-[700px] mt-4 "><p
                className="text-3xl text-white">Driving Innovation in Online Education for a <span className="text-blue-400 ml-56"> Brighter Future</span> </p></div>
                <div>
                    <p className="w-[700px] text-[#6E727F] ">Studynotion isat the forefront of driving innovation in online education. we're assianare about creating a brighter future by orienting cutting-edge courses , leaveraging emerging technalogies.</p>
                </div>
                <div className="flex mt-6 mb-[-6%] gap-5 items-center justify-center">
                    <img src={about1} width={220} height={120}></img>
                    <img src={about2} width={220} height={120}></img>
                    <img src={about3} width={220} height={120}></img>
                </div>
                </div>
            <div className="w-[800px] mt-24 flex mx-auto mb-14 text-center"><p className="text-2xl text-white font-bold">We are passinate about revolutionizing the way we learn. our innovative platform <span className="text-blue-400 ">combines technology</span>, <span className="text-orange-600">experties</span>, and communities create an <span className="text-orange-400">unparalleled experienced</span></p>


                </div>

            <div className="flex items-center justify-center gap-10">
                <div className="w-[50%]">
                    <div className="text-2xl font-bold bg-linear-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Our Founding Story</div>
                    <div className="text-sm text-white">Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.

As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</div>
                </div>
                <div className="shadow-[0_0_20px_rgba(255,0,0,0.6)]">
                    <img src={founding}  width={300} height={200}></img>
                </div>
            </div>
             <div className="flex items-center mt-32 p-6 w-[900px] mx-auto justify-center gap-10">
                <div className="w-[50%]">
                    <div className="text-2xl font-bold bg-linear-to-r from-orange-900 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Our Vision</div>
                    <div className="text-sm text-white">With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</div>
                </div>
                <div className="w-[50%]">
                    <div className="text-2xl font-bold bg-linear-to-r from-blue-950 via-blue-700  to-blue-500 bg-clip-text text-transparent">Our Mission</div>
                    <div className="text-sm text-white">Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</div>
                </div>
               
            </div>
            <div className="bg-[#2C333F] flex flex-row text-white p-11 items-center text-center justify-around">
                <div className="text-white" >
                    <div className="text-2xl font-bold text-white">5K</div>
                    <div >active students</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-white">
                        10+
                    </div>
                    <div>mantors</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-white">200+</div>
                    <div>courses</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div>subjects</div>
                </div>
            </div>
            <section className="mx-auto flex flex-col items-center justify-between gap-9">
            <Learninggrid></Learninggrid>
            <Contactformsection/>
            </section>
            <div>
                <div className="text-white text-2xl font-bold flex justify-center">
                    Reviews from other users
                </div>
            </div>
           
        </div>
    )
}
export default About;