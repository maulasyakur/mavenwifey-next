"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import { toast } from "sonner";
import { updatePost } from "../actions";
import type { AdminPost, AdminCategory } from "../lib";

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export default function PostDetailForm({
  post,
  allCategories,
  getEditorContent,
}: {
  post: AdminPost;
  allCategories: AdminCategory[];
  getEditorContent: () => string;
}) {
  const [title, setTitle] = useState(post.title ?? "");
  const [slug, setSlug] = useState(post.slug);
  const [publicPost, setPublicPost] = useState(post.public);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    post.categories.map((c) => String(c.id)),
  );
  const [pending, setPending] = useState(false);

  function autoGenerateSlug(value: string) {
    if (!slug || slug === toSlug(title)) {
      setSlug(toSlug(value));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const finalSlug = slug || toSlug(title);
      const content = getEditorContent();
      await updatePost(post.id, {
        title,
        slug: finalSlug,
        content,
        public: publicPost,
        categoryIds: selectedCategories.map(Number),
      });
      toast("Post saved");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Post Title</FieldLabel>
            <Input
              id="title"
              placeholder="e.g First Post"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                autoGenerateSlug(e.target.value);
              }}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="slug">Post Slug</FieldLabel>
            <Input
              id="slug"
              placeholder="e.g first-post"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
            <FieldDescription>
              Slug is the thing that appears in the URL e.g{" "}
              mavenwifey.netlify.app/blog/<b>my-first-post</b>. This will
              be auto-generated based on title if left blank.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel>Post Categories</FieldLabel>
            <MultiSelect
              values={selectedCategories}
              onValuesChange={setSelectedCategories}
            >
              <MultiSelectTrigger>
                <MultiSelectValue placeholder="Select categories..." />
              </MultiSelectTrigger>
              <MultiSelectContent>
                <MultiSelectGroup>
                  {allCategories.map((cat) => (
                    <MultiSelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </MultiSelectItem>
                  ))}
                </MultiSelectGroup>
              </MultiSelectContent>
            </MultiSelect>
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              id="public"
              checked={publicPost}
              onCheckedChange={(checked) => setPublicPost(checked === true)}
            />
            <FieldLabel htmlFor="public" className="font-normal">
              Publish to the public
            </FieldLabel>
          </Field>
        </FieldGroup>
        <FieldGroup>
          <Button type="submit" disabled={pending}>
            Save changes
          </Button>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
