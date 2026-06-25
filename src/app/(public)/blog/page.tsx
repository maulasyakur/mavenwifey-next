import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PaginationClient from "@/app/(public)/blog/pagination-client";
import Link from "next/link";
import { fetchPostCategories, fetchPostList, parseParams } from "./lib";
import FilterForm from "@/app/(public)/blog/filter-form";
import { House } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

// export const revalidate = 3600 * 4;

type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    categories?: string;
    sort?: string;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const {
    page,
    limit,
    offset,
    searchTerm,
    selectedCategories,
    defaultSort,
    defaultDirection,
  } = parseParams(params);
  const categoryList = await fetchPostCategories();
  const { posts, totalCount } = await fetchPostList(
    limit,
    offset,
    searchTerm,
    categoryList
      .filter((cat) => selectedCategories.includes(cat.id.toString()))
      .map((cat) => cat.id),
    defaultSort,
    defaultDirection,
  );

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="p-4 flex flex-col gap-4 h-screen-header">
      <div>
        <Link href="/" className="flex items-center gap-1 text-sm underline">
          <House className="w-5 h-5" />
          <span>Home</span>
        </Link>
      </div>
      <div>
        <h1 className="text-2xl tracking-wider">📰 Welcome to my blog page!</h1>
        <p>
          I&apos;ll be sharing topics about physics, travelling, politics
          (maybe), and more!
        </p>
      </div>

      <FilterForm
        defaultSearch={searchTerm}
        defaultCategories={selectedCategories}
        defaultSort={defaultSort}
        defaultDirection={defaultDirection}
        categoryList={categoryList}
      />

      {/* Posts List */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <BlogItem
                key={post.slug}
                title={post.title || "No Title"}
                date={post.created_at}
                slug={post.slug}
              />
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No posts found. 😭
            </p>
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      {/* Pagination – client component */}
      {totalCount > 0 && (
        <PaginationClient currentPage={page} totalPages={totalPages} />
      )}
    </div>
  );
}

// ---------- Presentational Components ----------
function BlogItem({
  title,
  date,
  slug,
}: {
  title: string;
  date: string;
  slug: string;
}) {
  return (
    <Item variant="outline" asChild>
      <Link href={`/blog/${slug}`}>
        <ItemContent>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>
            {new Date(date).toLocaleDateString()}
          </ItemDescription>
        </ItemContent>
      </Link>
    </Item>
  );
}
