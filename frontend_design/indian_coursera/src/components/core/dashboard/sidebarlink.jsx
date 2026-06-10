
// import * as Icons from "react-icons/vsc"
// import { useDispatch } from "react-redux";
// import { useLocation,matchPath, NavLink } from "react-router-dom";
// function Sidebarlink ({link,iconname}){
//     const Icon = Icons[iconname];
//     const location = useLocation();
//     const dispatch = useDispatch();
//    const matchRoute = (route) => {
//   return matchPath({ path: route }, location.pathname);
// };
//     return (
//         <div>
//             <NavLink 
//             to={link.path}
//             className={`relative px-40  font-medium ${matchRoute(link.path)?"bg-yellow-600":"bg-opacity-0"}`}
//             >
//                 <span className={`absolute left-0 top-0 h-full flex flex-row w-[0.2rem] bg-yellow-400 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}>

//                 </span>
//                 <div className="flex items-center gap-x-1">
//                     {Icon && <Icon className="text-lg" />}
//                     <span>{link.name}</span>
//                 </div>
//             </NavLink>
//         </div>
//     )
// }
// export default Sidebarlink;





import * as Icons from "react-icons/vsc";
import { NavLink } from "react-router-dom";

function Sidebarlink({ link, iconname }) {
  const Icon = Icons[iconname];

  return (
    <NavLink to={link.path}>
      {({ isActive }) => (
        <div
          className={`relative flex items-center gap-x-3 px-6 py-3 text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-yellow-600 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {/* 🔥 Horizontal line */}
          <span
            className={`absolute bottom-0 left-0 h-[2px] w-full bg-yellow-400 transition-all duration-300
            ${isActive ? "opacity-100" : "opacity-0"}`}
          ></span>

          {/* Icon */}
          {Icon && <Icon className="text-lg" />}

          {/* Text */}
          <span>{link.name}</span>
        </div>
      )}
    </NavLink>
  );
}

export default Sidebarlink;