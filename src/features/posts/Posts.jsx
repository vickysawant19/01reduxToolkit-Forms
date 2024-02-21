import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getStatus, selectAllPosts } from "./postSlice";

import PostedBy from "./PostedBy";
import Timestamp from "./Timestamp";
import AddPost from "./AddPost";
import Reactions from "./Reactions";
import { Link } from "react-router-dom";

const Posts = () => {
  const posts = useSelector(selectAllPosts);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, posts]);

  const sortedPosts = [...posts].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );

  const content = sortedPosts.map((post, index) => {
    return (
      <div
        className="w-full p-2 bg-gradient-to-tr from-slate-500 to-slate-400  shadow-xl "
        key={post.id}
      >
        <Link to={`${post.id}`} className=" text-2xl capitalize">
          {post.title}
        </Link>
        <div>{post.content.substring(0, 100)}</div>
        <div className="flex justify-between mt-2 ">
          <PostedBy userid={post.userid} />
          <Timestamp time={post.timestamp} />
        </div>
        <Reactions reactions={post.reactions} id={post.id} />
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-col items-center  md:max-w-screen-md md:flex gap-1">
        {status === "Success" ? content : <>Loading..</>}
      </div>
    </>
  );
};

export default Posts;
