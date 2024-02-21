import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchPosts, selectAllPosts, selectOnePost } from "./postSlice";
import PostedBy from "./PostedBy";
import Timestamp from "./Timestamp";
import Reactions from "./Reactions";
import { Link } from "react-router-dom";

const SinglePost = () => {
  const { id } = useParams();
  const post = useSelector((state) => selectOnePost(state, id));
  let content = "";
  if (post) {
    content = (
      <div className="min-h-screen mb-2 bg-gradient-to-tr from-slate-500 to-slate-400  p-10 ">
        <Link
          to={`/edit/${post.id}`}
          className="bg-green-200 absolute right-0 p-1 border mr-4 rounded"
        >
          Edit
        </Link>
        <div className=" text-4xl capitalize h-20 pt-2">{post.title}</div>
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
