import { supabaseAdmin } from "@/lib/supabase/admin";

export function parseParams({
  page: pageParam,
  search,
  categories,
  sort,
}: {
  page?: string | undefined;
  search?: string | undefined;
  categories?: string | undefined;
  sort?: string | undefined;
}) {
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const searchTerm = search || "";
  const selectedCategories = categories?.split(",").filter(Boolean) || [];
  const [defaultSort, defaultDirection] = (sort || "date-desc").split("-");

  return {
    page,
    limit,
    offset,
    searchTerm,
    selectedCategories,
    defaultSort,
    defaultDirection,
  };
}

export async function fetchPostCategories() {
  const { data: categories, error } = await supabaseAdmin
    .from("category")
    .select("id, name")
    .order("name", { ascending: false });
  if (error) throw error;
  return categories;
}

export async function fetchPostList(
  limit: number,
  offset: number,
  searchTerm: string,
  selectedCategories: number[],
  sort: string,
  direction: string,
) {
  // 2. Base query for posts
  let query = supabaseAdmin
    .from("posts")
    .select("id, title, created_at, slug", { count: "exact" })
    .eq("public", true);

  // 3. Search filter (case-insensitive title)
  if (searchTerm) {
    query = query.ilike("title", `%${searchTerm}%`);
  }

  // 4. Category filter using the junction table
  if (selectedCategories.length > 0) {
    const { data: postCategories, error: pcError } = await supabaseAdmin
      .from("post_categories")
      .select("post_id")
      .in("category_id", selectedCategories);
    if (pcError) throw pcError;

    const validPostIds = [...new Set(postCategories.map((pc) => pc.post_id))];
    if (validPostIds.length === 0) {
      return { posts: [], totalCount: 0 };
    }
    query = query.in("id", validPostIds);
  }

  // 5. Sorting
  const sortBy = `${sort}-${direction}`;
  switch (sortBy) {
    case "date-asc":
      query = query.order("created_at", { ascending: true });
      break;
    case "title-asc":
      query = query.order("title", { ascending: true });
      break;
    case "title-desc":
      query = query.order("title", { ascending: false });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  // 6. Pagination
  const {
    data: posts,
    error,
    count: totalCount,
  } = await query.range(offset, offset + limit - 1);
  if (error) throw error;

  return { posts, totalCount } as {
    posts: { id: number; title: string; created_at: string; slug: string }[];
    totalCount: number;
  };
}
