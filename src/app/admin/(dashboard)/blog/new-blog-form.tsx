"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Plus, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createPost } from "./actions";
import type { AdminCategory } from "./lib";

export default function NewBlogForm({
  categories,
}: {
  categories: AdminCategory[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [publicPost, setPublicPost] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  function autoGenerateSlug(value: string) {
    if (!slug || slug === title.toLowerCase().replace(/\s+/g, "-")) {
      setSlug(value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    try {
      const finalSlug =
        slug || title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      const newSlug = await createPost({
        title,
        slug: finalSlug,
        public: publicPost,
        categoryIds: selectedCategories.map(Number),
      });
      setOpen(false);
      router.push(`/admin/blog/${newSlug}`);
    } catch {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <PlusIcon />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a new blog post</DialogTitle>
          <DialogDescription>
            You can edit these fields later when you write your post.
          </DialogDescription>
          <form onSubmit={handleSubmit}>
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
                        {categories.map((cat) => (
                          <MultiSelectItem
                            key={cat.id}
                            value={String(cat.id)}
                          >
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
                    onCheckedChange={(checked) =>
                      setPublicPost(checked === true)
                    }
                  />
                  <FieldLabel htmlFor="public" className="font-normal">
                    Publish to the public
                  </FieldLabel>
                </Field>
              </FieldGroup>
              <FieldGroup>
                <Button type="submit" disabled={pending}>
                  <Plus />
                  Create new post
                </Button>
              </FieldGroup>
            </FieldSet>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
