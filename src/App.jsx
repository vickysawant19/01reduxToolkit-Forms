import { useDispatch, useSelector } from "react-redux";
import Posts from "./features/posts/Posts";
import { useEffect } from "react";
import { fetchUsers, selectAllUsers } from "./features/users/usersSlice";
import { fetchPosts, getStatus } from "./features/posts/postSlice";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router";

function App() {
  const users = useSelector(selectAllUsers);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
      dispatch(fetchPosts());
    }
  }, []);

  return (
    <>
      <div className="max-w-screen-md mx-auto relative ">
        <Navbar />
        <div className="mt-14 bg-slate-300 h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
