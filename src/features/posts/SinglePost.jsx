import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  deletePost,
  fetchPosts,
  selectAllPosts,
  selectOnePost,
} from "./postSlice";
import PostedBy from "./PostedBy";
import Timestamp from "./Timestamp";
import Reactions from "./Reactions";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectOnePost(state, id));
  let content = "";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("delete");
    dispatch(deletePost({ id }));
    navigate("/");
  };

  if (post) {
    content = (
      <div className="min-h-screen mb-2 bg-gradient-to-tr from-slate-500 to-slate-400  p-10 ">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-400 text-white absolute right-0 mr-4 p-1 border  rounded w-14 text-center text-sm"
        >
          Delete
        </button>
        <Link
          to={`/edit/${post.id}`}
          className="bg-blue-500 hover:bg-blue-400 text-white absolute top-20 right-0  p-1 border mr-4 rounded w-14 text-center text-sm"
        >
          Edit
        </Link>

        <div className=" text-4xl capitalize min-h-20 pt-2">{post.title}</div>
        <div className="text-xl">{post.content}</div>
        <div className="flex text-xl justify-between my-10  ">
          <PostedBy userid={post.userid} />
          <Timestamp time={post.timestamp} />
        </div>
        <Reactions reactions={post.reactions} id={post.id} />
      </div>
    );
  } else {
    content = "loading";
  }

  return <>{content}</>;
};

export default SinglePost;
