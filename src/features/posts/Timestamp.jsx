import React from "react";
import { formatDistanceToNow } from "date-fns";

const Timestamp = ({ time }) => {
  const timeAgo = formatDistanceToNow(time);
  const newTime = new Date();
  return <div className="italic text-gray-800">{timeAgo} ago</div>;
};

export default Timestamp;
