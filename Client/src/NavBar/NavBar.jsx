import React, { useContext, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdAccountCircle } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { AuthContext } from "../AuthContex/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import logo from "../assets/logo.png";
import useUserData from "../hooks/useUserData";
const NavBar = () => {
  const [userData, refetch] = useUserData([]);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const location = useLocation();
  const navigate = useNavigate(); // Added navigate

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {
            Swal.fire("Logged Out", "You have been logged out.", "success");
            navigate("/");
          })
          .catch((error) => console.log(error));
      }
    });
  };

  const menus = [
    { name: "Profile", link: "/account", icon: AiOutlineUser },
    {
      name: "Bank Balance Report",
      link: "/balanceReport",
      icon: MdOutlineDashboard,
    },
    isAdmin
      ? {
          name: "Bank Wise Balance",
          link: "/balanceEntry",
          icon: FiMessageSquare,
        }
      : undefined,
  ].filter((menu) => menu !== undefined); // Filter out undefined values

  const [open, setOpen] = useState(true);

  return (
    <section className="pb-20">
      <div
        className={`fixed z-10 bg-gray-800 min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between items-center">
          {open && (
            <div className="py-3 w-full flex justify-between">
              <div className="w-full">
                <img
                  className="ms-5 sm:h-10 sm:w-40 hidden sm:block"
                  src={logo}
                  alt="website logo"
                />
                <p className="hidden sm:block tracking-wide font-bold text-xl text-center">
                  <br />
                  <span className="text-lime-500">Daily</span>
                  <span className="text-sky-500"> Bank</span>
                  <span className="text-pink-500"> Balance</span>
                </p>
              </div>
              <HiMenuAlt3
                size={26}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
          )}
          {!open && (
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus.map((menu, i) => (
            <Link
              to={menu.link}
              key={i}
              className={`${
                menu.margin && "mt-5"
              } group flex items-center text-sm gap-3.5 font-medium p-2 rounded-md border-collapse hover:bg-gray-100 hover:text-indigo-500  ${
                location.pathname === menu.link
                  ? "bg-indigo-100  text-indigo-500"
                  : ""
              }`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: ``,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
        <div className="w-full absolute bottom-5 left-0  cursor-pointer flex items-center">
          <MdAccountCircle
            size={28}
            className={`text-indigo-300 mx-auto ${open && "w-2/12"}`}
          />
          {open && user && (
            <div className="leading-4 text-left w-8/12">
              <h4 className="text-sm font-semibold text-white">
                {userData[0]?.name}
              </h4>

              <span className="text-xs text-gray-300">{user.email}</span>
            </div>
          )}
          <FaPowerOff
            title="Sign Out"
            size={24}
            className={` text-green-500 hover:text-red-500 w-2/12  ${
              !open && "hidden"
            }`}
            onClick={handleLogOut}
          />
        </div>
      </div>
      <div
        className={`w-vw transition-all px-5 duration-500 ${
          open ? "ml-60" : "ml-16"
        }`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default NavBar;
