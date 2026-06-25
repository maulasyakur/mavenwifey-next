import { createClient } from "@/lib/supabase/server";

export type AdminPost = {
  id: number;
  title: string | null;
  slug: string;
  content?: string | null;
  created_at: string;
  updated_at: string | null;
  public: boolean;
  categories: { id: number; name: string }[];
};

export type AdminCategory = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  post_count: number;
};

export async function fetchAdminPostBySlug(
  slug: string,
): Promise<AdminPost | null> {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        title,
        slug,
        content,
        created_at,
        updated_at,
        public,
        post_categories (
          category:category_id ( id, name )
        )
      `,
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!post) return null;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content,
    created_at: post.created_at,
    updated_at: post.updated_at,
    public: post.public,
    categories: (post.post_categories ?? [])
      .map(
        (pc: { category: { id: number; name: string } | null }) => pc.category,
      )
      .filter(Boolean) as { id: number; name: string }[],
  };
}

export async function fetchAdminPosts(): Promise<AdminPost[]> {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        title,
        slug,
        created_at,
        updated_at,
        public,
        post_categories (
          category:category_id ( id, name )
        )
      `,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (posts ?? []).map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    created_at: post.created_at,
    updated_at: post.updated_at,
    public: post.public,
    categories: (post.post_categories ?? [])
      .map(
        (pc: { category: { id: number; name: string } | null }) => pc.category,
      )
      .filter(Boolean) as { id: number; name: string }[],
  }));
}

export async function fetchAdminCategories(): Promise<AdminCategory[]> {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("category")
    .select(
      `
        id,
        name,
        description,
        created_at,
        post_categories ( post_id )
      `,
    )
    .order("name", { ascending: true });

  if (error) throw error;

  return (categories ?? []).map((cat) => ({
    id: cat.id,
    name: cat.name,
    description: cat.description,
    created_at: cat.created_at,
    post_count: (cat.post_categories ?? []).length,
  }));
}
