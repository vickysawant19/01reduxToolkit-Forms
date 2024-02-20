import { useDispatch, useSelector } from "react-redux";
import Posts from "./features/posts/Posts";
import { useEffect } from "react";
import { fetchUsers, selectAllUsers } from "./features/users/usersSlice";
import { getStatus } from "./features/posts/postSlice";

function App() {
  const users = useSelector(selectAllUsers);
  const status = useSelector(getStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, []);

  return (
    <>
      <div className="bg-gray-600 w-full h-full flex flex-col items-center pt-2 min-h-screen">
        <Posts />
      </div>
    </>
  );
}

export default App;
