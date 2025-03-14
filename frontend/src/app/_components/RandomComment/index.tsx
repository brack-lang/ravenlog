"use client";

import { useState, useEffect } from "react";
import BlogSettings from "@/app/_assets/blog_settings.json";

const getRandomComment = () => {
  const comments = BlogSettings.comments;
  const index = Math.floor(Math.random() * comments.length);
  return comments[index];
}

export default function RandomComment() {
  const [comment, setComment] = useState("");

  useEffect(() => {
    setComment(getRandomComment());
  }, []);

  return <p>{comment}</p>;
}
