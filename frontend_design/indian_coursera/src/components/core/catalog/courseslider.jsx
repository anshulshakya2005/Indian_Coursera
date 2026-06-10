import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import Course_card from "./coursecard";

function Courseslider({ courses }) {
  return (
    <div className="w-full py-6">
      <div className="mx-auto max-w-7xl">
        <Swiper
          modules={[Navigation]}
          navigation
          slidesPerView={3}
          spaceBetween={29}
          className="course-swiper"
        >
          {courses?.map((course) => (
            <SwiperSlide
              key={course._id}
              className="flex justify-center"
            >
              <Course_card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default Courseslider;