import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiconnector } from "../services/apiconnector";
import { catagories } from "../services/apis";
import { Getcatalogpagedata } from "../services/operations/pageandcomponentdata";
import Course_card from "../components/core/catalog/coursecard";
import Courseslider from "../components/core/catalog/courseslider";




function Catalog() {
    const{something} = useParams();
    const [catalogpagedata,setcatalogpagedata] = useState(null);
    const [catagoryid,setcatagoryid] = useState("");
    //fetch all catagories
   useEffect(() => {

  const getcatagory = async () => {

    const response = await apiconnector(
      "GET",
      catagories.CATAGORIES_API
    );

    const categories = response?.data?.allcatagories;

    const currentCategory = categories.find(
      (ct) =>
        ct.name.split(" ").join("-").toLowerCase() ===
        something.toLowerCase()
    );

    console.log("current catagory",currentCategory);

    setcatagoryid(currentCategory?._id);
  };

  getcatagory();

}, [something]);

useEffect(()=>{
     if (!catagoryid) return;
    const getcatagorydetails = async()=>{
        try{
            
            const res = await Getcatalogpagedata(catagoryid);
            console.log("response of getcatagorypagedata",res);
            setcatalogpagedata(res);
        }catch(err){
            console.log(err);
        }
    }
    getcatagorydetails();
},[catagoryid])

  
  return (
  <div className="min-h-screen bg-black text-white">
    
    {/* Main Container */}
    <div className="mx-auto max-w-7xl px-6 py-10">

      {/* Hero Section */}
      <section className="mb-16">
        <p className="text-sm text-gray-400">
          Home / Catalog /
          <span className="ml-1 text-yellow-400">
            {catalogpagedata?.data?.selectedcatagory?.name}
          </span>
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          {catalogpagedata?.data?.selectedcatagory?.name}
        </h1>

        <p className="mt-4 max-w-3xl text-gray-400">
          {catalogpagedata?.data?.selectedcatagory?.description}
        </p>
      </section>

      {/* Section 1 */}
      <section className="mb-20">
        <h2 className="mb-4 text-3xl font-semibold">
          Courses to get you started
        </h2>

        <div className="mb-8 flex gap-6 border-b border-gray-800 pb-3">
          <button className="font-medium text-yellow-400">
            Most Popular
          </button>

          <button className="text-gray-400 hover:text-white">
            New
          </button>
        </div>

        <Courseslider
          courses={catalogpagedata?.data?.selectedcatagory?.course}
        />
      </section>

      {/* Section 2 */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-semibold">
          Top Courses in{" "}
          {catalogpagedata?.data?.selectedcatagory?.name}
        </h2>

        <Courseslider
          courses={catalogpagedata?.data?.differentcatagories?.courses}
        />
      </section>

      {/* Section 3 */}
      <section className="mb-20">
        <h2 className="mb-8 text-3xl font-semibold">
          Frequently Bought Together
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {catalogpagedata?.data?.topSellingCourses
            ?.slice(0, 4)
            .map((course, index) => (
              <Course_card
                key={index}
                course={course}
                Height="h-[180px]"
              />
            ))}
        </div>
      </section>

    </div>
  </div>
);
}
export default Catalog;
