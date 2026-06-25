import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";

export async function fetchPostCategoriesByPostId(postId: number) {
  const { data: pcData, error: pcError } = await supabaseAdmin
    .from("post_categories")
    .select("category_id")
    .eq("post_id", postId);

  if (pcError) throw pcError;

  if (!pcData || pcData.length === 0) return [];

  const { data: cats, error: catError } = await supabaseAdmin
    .from("category")
    .select("name")
    .in(
      "id",
      pcData.map((pc) => pc.category_id),
    );

  if (catError) throw catError;

  return cats.map((c) => c.name);
}

export async function fetchPostBySlug(slug: string) {
  const { data: post, error } = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!post) notFound();

  return post;
}

export async function fetchAllSlugs() {
  const { data, error } = await supabaseAdmin
    .from("posts")
    .select("slug")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }

  if (!data || data.length === 0) {
    console.warn("No posts found");
    return [];
  }

  return data.map((post) => ({
    slug: post.slug,
  }));
}
