"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";

type FilterFormProps = {
  defaultSearch: string;
  defaultCategories: string[];
  defaultSort: string;
  defaultDirection: string;
  categoryList: { id: number; name: string }[];
};

export default function FilterForm({
  defaultSearch,
  defaultCategories,
  defaultSort,
  defaultDirection,
  categoryList,
}: FilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [categories, setCategories] = useState(defaultCategories);
  const [sort, setSort] = useState(defaultSort);
  const [direction, setDirection] = useState(defaultDirection);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;

    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (categories.length > 0) params.set("categories", categories.join(","));
    params.set("sort", `${sort}-${direction}`);
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" type="button">
            Filter & sort
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel>Categories</FieldLabel>
                <MultiSelect values={categories} onValuesChange={setCategories}>
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Select categories..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {categoryList.length > 0 ? (
                        categoryList.map((cat) => (
                          <MultiSelectItem
                            key={cat.id}
                            value={cat.id.toString()}
                          >
                            {cat.name}
                          </MultiSelectItem>
                        ))
                      ) : (
                        <MultiSelectItem disabled value="none">
                          No categories available
                        </MultiSelectItem>
                      )}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </Field>
              <Field>
                <FieldLabel>Sort by</FieldLabel>
                <Select value={sort} onValueChange={setSort}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <RadioGroup
                  value={direction}
                  onValueChange={setDirection}
                  className="grid-flow-col"
                  orientation="horizontal"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="asc" id="asc" />
                    <Label htmlFor="asc">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="desc" id="desc" />
                    <Label htmlFor="desc">Descending</Label>
                  </div>
                </RadioGroup>
              </Field>
              <FieldLabel>Click the search button to apply filters.</FieldLabel>
            </FieldGroup>
          </FieldSet>
          <Button type="button" onClick={() => router.push("/blog-posts")}>
            Clear Filters
          </Button>
        </PopoverContent>
      </Popover>
      <Input
        placeholder="Search posts..."
        defaultValue={defaultSearch}
        name="search"
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  );
}
