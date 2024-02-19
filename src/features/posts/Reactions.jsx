import React from "react";
import { useDispatch } from "react-redux";
import { addReaction } from "./postSlice";

const Reactions = ({ reactions, id }) => {
  const dispatch = useDispatch();
  const reactionEmoji = {
    thumb: "👍",
    heart: "💖",
    wow: "😲",
    rocket: "🚀",
    coffee: "☕",
  };

  return (
    <div className="flex space-x-5">
      {reactions &&
        Object.entries(reactions).map(([reactionName, reactionValue]) => (
          <button
            onClick={() => dispatch(addReaction({ reactionName, id }))}
            className="p-1 capitalize hover:font-semibold border rounded-full mt-1 px-2"
            key={reactionName}
          >
            {reactionEmoji[reactionName]} {reactionValue}
          </button>
        ))}
    </div>
  );
};

export default Reactions;
