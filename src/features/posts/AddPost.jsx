import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { addPost } from "./postSlice";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userid, setUserId] = useState(null);
  const users = useSelector(selectAllUsers);

  const dispatch = useDispatch();

  const usersOption = users.map((user) => (
    <option key={user.id} id={user.id} value={user.id}>
      {user.username}
    </option>
  ));

  const isAllowed = Boolean(title && content && userid);
  const handleSubmit = () => {
    console.log(userid);
    if (isAllowed) {
      dispatch(addPost(title, content, userid));
    }
  };
  return (
    <div className="border bg-gray-500 p-2 w-full mb-1 h-fit sticky top-2">
      <h1 className="w-full text-center text-xl font-semibold py-2">AddPost</h1>
      <hr />
      <div className="p-2 w-full flex flex-col ">
        <label className="mt-2" htmlFor="">
          Title
        </label>
        <input
          className="p-1"
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
        <label className="mt-2" htmlFor="">
          Content
        </label>
        <textarea
          className="p-1"
          onChange={(e) => setContent(e.target.value)}
          type="text"
        />
        <label className="mt-2" htmlFor="">
          Author
        </label>
        <select
          onChange={(e) => setUserId(Number(e.target.value))}
          className="p-1"
          name=""
          id=""
        >
          <option value="">Select User</option>
          {usersOption}
        </select>
        <button
          disabled={!isAllowed}
          onClick={handleSubmit}
          className="bg-slate-700 p-2 mt-2 border hover:bg-slate-600 disabled:bg-gray-400 text-white font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddPost;
