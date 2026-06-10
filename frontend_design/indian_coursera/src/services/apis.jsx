
const BASE_URL =import.meta.env.VITE_APP_MONGODB_URL;
console.log("BASE_URL:", import.meta.env.VITE_APP_MONGODB_URL)
export const catagories = {
    
    CATAGORIES_API:BASE_URL+"/api/v1/course/showAllCategories",
};
export const authEndpoints = {
  SIGNUP_API: `${BASE_URL}/api/v1/auth/signup`,
  SEND_OTP_API: `${BASE_URL}/api/v1/auth/sendotp`,
  LOGIN_API: `${BASE_URL}/api/v1/auth/login`,
  RESETPASSWORD_API:`${BASE_URL}/api/v1/auth/reset-password-token`,
  CHANGEPASSWORD_API:`${BASE_URL}/api/v1/auth/reset-password`,
};
export const profileendpoints = {
PROFILE_API:`${BASE_URL}/api/v1/profile/getUserDetails`,
PROFILE_UPDATE_API:`${BASE_URL}/api/v1/profile/updateProfile`,
GET_USER_ENROLLED_COURSES_API: `${BASE_URL}/api/v1/profile/getEnrolledCourses`,
GET_INSTRUCTOR_DATA_WITH_STATS_API:`${BASE_URL}/api/v1/profile/instructordashboard`,

}
export const catalogdata = {
  CATALOGPAGEDATA_API:`${BASE_URL}/api/v1/course/getCatagoryPageDetails`,
}
export const contactendpoints={
  CONTACT_US_API:`${BASE_URL}/api/v1/reach/contact`,
}
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}/api/v1/auth/updateDisplayPicture`,
}

export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/api/v1/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/api/v1/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/api/v1/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/api/v1/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/api/v1/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/api/v1/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/api/v1/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/api/v1/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/api/v1/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/api/v1/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/api/v1/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/api/v1/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/api/v1/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/api/v1/course/getFullCourseDetails",
  LECTURE_COMPLETION_API:  `${BASE_URL}/api/v1/course/updateCourseProgress`,
  CREATE_RATING_API: BASE_URL + "/api/v1/course/createRating",
}
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL+"/api/v1/payment/capturepayment",
  COURSE_VERIFY_API:BASE_URL+"/api/v1/payment/verifypayment",
}
