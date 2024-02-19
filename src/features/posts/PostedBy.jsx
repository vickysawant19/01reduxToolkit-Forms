import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostedBy = ({ userid }) => {
  const users = useSelector(selectAllUsers);
  const user = users.find((user) => user.id === userid);

  return (
    <div className="text-gray-800">
      Posted By: {user ? user?.username : "Unknown User"}
    </div>
  );
};

export default PostedBy;
