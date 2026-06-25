"use client";

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

const placeholderCategories = [
  { id: 1, name: "Physics" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Politics" },
];

export default function BlogFilter() {
  return (
    <div className="flex gap-2 items-center">
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
                <MultiSelect>
                  <MultiSelectTrigger className="w-full" disabled>
                    <MultiSelectValue placeholder="Select categories..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {placeholderCategories.map((cat) => (
                        <MultiSelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </Field>
              <Field>
                <FieldLabel>Sort by</FieldLabel>
                <Select>
                  <SelectTrigger disabled>
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
                <RadioGroup className="grid-flow-col" orientation="horizontal">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="asc" id="asc" disabled />
                    <Label htmlFor="asc">Ascending</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="desc" id="desc" disabled />
                    <Label htmlFor="desc">Descending</Label>
                  </div>
                </RadioGroup>
              </Field>
              <FieldLabel>Click the search button to apply filters.</FieldLabel>
            </FieldGroup>
          </FieldSet>
          <Button type="button" variant="outline" disabled>
            Clear Filters
          </Button>
        </PopoverContent>
      </Popover>
      <Input placeholder="Search posts..." disabled />
      <Button type="submit" disabled>
        <SearchIcon />
      </Button>
    </div>
  );
}
