import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  fetchAllSlugs,
  fetchPostBySlug,
  fetchPostCategoriesByPostId,
} from "./lib";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { List } from "lucide-react";

export const revalidate = 14400;

export async function generateStaticParams() {
  return fetchAllSlugs();
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  const categoryNames = await fetchPostCategoriesByPostId(post.id);

  return (
    <div className="p-4 w-full h-full mx-auto overflow-auto space-y-6">
      <div>
        <Link
          href="/blog"
          className="flex items-center gap-1 text-sm underline"
        >
          <List className="w-5 h-5" />
          <span>Blog List</span>
        </Link>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <h2 className="text-sm text-gray-200">
          {post.created_at
            ? new Date(post.created_at).toLocaleString()
            : "Upload date unknown"}
        </h2>
        {categoryNames.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-2">
            {categoryNames.map((name) => (
              <Badge key={name}>{name}</Badge>
            ))}
          </div>
        )}
      </div>
      <article className="prose prose-invert max-w-none overflow-hidden">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
