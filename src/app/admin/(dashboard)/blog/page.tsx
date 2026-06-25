import Link from "next/link";
import { fetchAdminPosts, fetchAdminCategories } from "./lib";
import BlogFilter from "./blog-filter";
import BlogPagination from "./blog-pagination";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { FileTextIcon, FolderOpenIcon, PencilIcon } from "lucide-react";
import NewBlogForm from "./new-blog-form";
import DeletePostButton from "./delete-post-button";
import NewCategoryDialog from "./new-category-dialog";
import EditCategoryDialog from "./edit-category-dialog";
import DeleteCategoryButton from "./delete-category-button";

export default async function BlogAdminPage() {
  const [posts, categories] = await Promise.all([
    fetchAdminPosts(),
    fetchAdminCategories(),
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Blog Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your blog posts and categories
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="size-4" />
            Posts
            <Badge variant="secondary" className="ml-1">
              {posts.length}
            </Badge>
            <NewBlogForm categories={categories} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <BlogFilter />
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No posts yet. Create your first post!
            </p>
          ) : (
            posts.map((post) => (
              <Item key={post.id} variant="outline" size="sm">
                <ItemContent>
                  <ItemTitle>{post.title ?? "Untitled"}</ItemTitle>
                  <ItemDescription className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-mono text-muted-foreground">
                      /{post.slug}
                    </span>
                    <Badge
                      variant={post.public ? "default" : "outline"}
                      className="text-[10px]"
                    >
                      {post.public ? "Public" : "Private"}
                    </Badge>
                    {post.categories.map((cat) => (
                      <Badge
                        key={cat.id}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {cat.name}
                      </Badge>
                    ))}
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Button size="icon" variant="ghost" asChild>
                    <Link href={`/admin/blog/${post.slug}`}>
                      <PencilIcon className="size-3.5" />
                    </Link>
                  </Button>
                  <DeletePostButton id={post.id} />
                </ItemActions>
              </Item>
            ))
          )}
        </CardContent>
        <BlogPagination />
      </Card>

      {/* Categories Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FolderOpenIcon className="size-4" />
            Categories
            <Badge variant="secondary" className="ml-1">
              {categories.length}
            </Badge>
            <NewCategoryDialog />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <BlogFilter />
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No categories yet.
            </p>
          ) : (
            categories.map((cat) => (
              <Item key={cat.id} variant="outline" size="sm">
                <ItemContent>
                  <ItemTitle>{cat.name}</ItemTitle>
                  <ItemDescription className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {cat.description ?? "No description"}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {cat.post_count} {cat.post_count === 1 ? "post" : "posts"}
                    </Badge>
                  </ItemDescription>
                </ItemContent>
                <ItemActions>
                  <EditCategoryDialog category={cat} />
                  <DeleteCategoryButton id={cat.id} />
                </ItemActions>
              </Item>
            ))
          )}
        </CardContent>
        <BlogPagination />
      </Card>
    </div>
  );
}
