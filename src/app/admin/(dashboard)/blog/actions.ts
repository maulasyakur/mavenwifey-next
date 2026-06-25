"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function createPost(formData: {
  title: string;
  slug: string;
  public: boolean;
  categoryIds: number[];
}) {
  const { data: post, error } = await supabaseAdmin
    .from("posts")
    .insert({
      title: formData.title,
      slug: formData.slug,
      content: "",
      public: formData.public,
    })
    .select("id, slug")
    .single();

  if (error) throw new Error(error.message);

  if (formData.categoryIds.length > 0) {
    const { error: jError } = await supabaseAdmin
      .from("post_categories")
      .insert(
        formData.categoryIds.map((category_id) => ({
          post_id: post.id,
          category_id,
        })),
      );

    if (jError) throw new Error(jError.message);
  }

  revalidatePath("/admin/blog");
  return post.slug;
}

export async function updatePost(
  id: number,
  formData: {
    title: string;
    slug: string;
    content: string;
    public: boolean;
    categoryIds: number[];
  },
) {
  const { error } = await supabaseAdmin
    .from("posts")
    .update({
      title: formData.title,
      slug: formData.slug,
      content: formData.content,
      public: formData.public,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  const { error: dError } = await supabaseAdmin
    .from("post_categories")
    .delete()
    .eq("post_id", id);

  if (dError) throw new Error(dError.message);

  if (formData.categoryIds.length > 0) {
    const { error: jError } = await supabaseAdmin
      .from("post_categories")
      .insert(
        formData.categoryIds.map((category_id) => ({
          post_id: id,
          category_id,
        })),
      );

    if (jError) throw new Error(jError.message);
  }

  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${formData.slug}`);
}
export async function createCategory(formData: {
  name: string;
  description: string;
}) {
  const { error } = await supabaseAdmin
    .from("category")
    .insert({ name: formData.name, description: formData.description || null });
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
}
export async function updateCategory(
  id: number,
  formData: { name: string; description: string },
) {
  const { error } = await supabaseAdmin
    .from("category")
    .update({ name: formData.name, description: formData.description || null })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
}
export async function deleteCategory(id: number) {
  const { error } = await supabaseAdmin.from("category").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
}
export async function deletePost(id: number) {
  const { error } = await supabaseAdmin.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/blog");
}
