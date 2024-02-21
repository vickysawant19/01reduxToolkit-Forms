import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full  bg-slate-700 fixed top-0 shadow-xl z-10 ">
      <div className="flex py-2 justify-between items-center h-14 mx-2">
        <h1 className="font-bold text-2xl text-gray-50 ">VS Blog</h1>
        <div className="flex gap-2">
          <NavLink to={"posts"} className="bg-slate-300   rounded p-1">
            Posts
          </NavLink>
          <NavLink to={"addpost"} className="bg-slate-300   rounded p-1">
            Add Post
          </NavLink>
          <NavLink to={"users"} className="bg-slate-300   rounded p-1">
            Users
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
