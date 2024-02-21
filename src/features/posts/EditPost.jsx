import React, { useEffect, useState } from "react";
import PostedBy from "./PostedBy";
import { useParams } from "react-router";
import Timestamp from "./Timestamp";
import Reactions from "./Reactions";
import { useDispatch, useSelector } from "react-redux";
import { getStatus, selectOnePost, updatePosts } from "./postSlice";

const EditPost = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectOnePost(state, id));
  const status = useSelector(getStatus);

  const [title, setTitle] = useState();
  const [contain, setContain] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContain(post.content);
    }
  }, [post]);
  const handleSave = () => {
    if (title && contain) {
      const updatedPost = {
        ...post,
        title: title,
        content: contain,
      };

      dispatch(updatePosts(updatedPost));
    }
  };

  let content = "";
  if (post) {
    content = (
      <div className="min-h-screen mb-2 p-2 bg-gradient-to-tr from-slate-500 to-slate-400 rounded ">
        <label className="font-semibold" htmlFor="">
          Title
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-1"
          type="text"
          value={title ? title : ""}
        />
        <label className="font-semibold" htmlFor="">
          Content
        </label>
        <textarea
          onChange={(e) => setContain(e.target.value)}
          rows={5}
          className="w-full p-1"
          type="text"
          value={contain ? contain : ""}
        />
        <div className="flex text-xl justify-between mt-2 ">
          <button
            onClick={handleSave}
            className="border p-1 rounded bg-gray-300 hover:bg-gray-400"
          >
            Save
          </button>
          {status === "Success" ? "Updated" : "Updating...."}
        </div>
      </div>
    );
  } else {
    content = "loading";
  }

  return <>{content}</>;
};

export default EditPost;
