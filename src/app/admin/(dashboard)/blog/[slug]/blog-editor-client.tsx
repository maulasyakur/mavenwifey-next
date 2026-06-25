"use client";

import { useState } from "react";
import PostDetailForm from "./post-detail-form";
import PostEditor from "./post-editor";
import type { AdminPost, AdminCategory } from "../lib";

export default function BlogEditorClient({
  post,
  allCategories,
}: {
  post: AdminPost;
  allCategories: AdminCategory[];
}) {
  const [editorContent, setEditorContent] = useState(post.content ?? "");

  return (
    <>
      <PostDetailForm
        post={post}
        allCategories={allCategories}
        getEditorContent={() => editorContent}
      />
      <PostEditor
        content={post.content ?? ""}
        onUpdate={(content) => setEditorContent(content)}
      />
    </>
  );
}
