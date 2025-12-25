
import { useEffect, useState } from "react";

const timeAgoShort = (dateString) => {
  if (!dateString) return "Unknown Time";

  const now = new Date();
  const then = new Date(dateString);
  const diff = Math.floor((now - then) / 1000); // seconds difference

  if (diff < 60) return `${diff}s`; // seconds
  if (diff < 3600) return `${Math.floor(diff / 60)}min`; // minutes
  if (diff < 86400) return `${Math.floor(diff / 3600)}hr`; // hours
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d`; // days
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}m`; // months
  return `${Math.floor(diff / 31536000)}yr`; // years
};

const PostTime = ({ createdAt }) => {
  const [timeAgo, setTimeAgo] = useState("Unknown Time");

  useEffect(() => {
    if (!createdAt) return;

    const update = () => setTimeAgo(timeAgoShort(createdAt));

    update(); // initial call
    const interval = setInterval(update, 1000); // update every second

    return () => clearInterval(interval);
  }, [createdAt]);

  return <span>{timeAgo}</span>;
};

export default PostTime;
