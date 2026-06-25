import { notFound } from "next/navigation";
import {
  fetchAdminPostBySlug,
  fetchAdminCategories,
} from "../lib";
import BlogEditorClient from "./blog-editor-client";

export default async function BlogEditor({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, allCategories] = await Promise.all([
    fetchAdminPostBySlug(slug),
    fetchAdminCategories(),
  ]);

  if (!post) notFound();

  return <BlogEditorClient post={post} allCategories={allCategories} />;
}
