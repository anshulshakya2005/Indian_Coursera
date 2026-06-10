import axios from "axios"
export const axiosinstance = axios.create({});
// export const apiconnector = (method,url,bodydata,headers,params) =>{
//     return axiosinstance({
//         method:`${method}`,
//         url:`${url}`,
//         data:bodydata?bodydata:null,
//         headers:headers?headers:null,
//         params:params?params:null,
//     })
// }
export const apiconnector = (method, url, bodydata, headers = {}, params = {}) => {
    return axiosinstance({
        method,
        url,
        data: bodydata || null,
        headers: {
            ...headers,
        },
        params: params || null,
        withCredentials: true, // IMPORTANT
    });
};