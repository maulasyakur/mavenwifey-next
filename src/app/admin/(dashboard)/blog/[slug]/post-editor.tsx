"use client";

import { EditorContent, EditorContext, useEditor } from "@tiptap/react";

import { TextStyleKit } from "@tiptap/extension-text-style";
import { Image } from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Youtube as YoutubeExtension } from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";

import { Separator } from "@/components/tiptap-ui-primitive/separator";

import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node";
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

import HeadingDropdownMenu from "@/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { LinkPopover } from "@/components/tiptap-ui/link-popover";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

import { toast } from "sonner";

const extensions = [
  TextStyleKit,
  StarterKit,
  Markdown,
  Image,
  ImageUploadNode.configure({
    accept: "image/*",
    maxSize: MAX_FILE_SIZE,
    limit: 3,
    upload: handleImageUpload,
    onError: (error) => toast(`Upload failed: ${error.message}`),
  }),
  Link.configure({ openOnClick: false }),
  YoutubeExtension,
];

function MenuBar() {
  return (
    <div className="fixed bottom-0 left-0 sm:sticky sm:top-0 w-full bg-background z-50">
      <div className="relative px-2">
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="flex overflow-x-auto space-x-1 py-2 items-center justify-center border-t-2 sm:border-b-2">
          <UndoRedoButton action={"undo"} />
          <UndoRedoButton action={"redo"} />
          <Separator orientation="vertical" />
          <MarkButton type="bold" />
          <MarkButton type="italic" />
          <MarkButton type="strike" />
          <MarkButton type="underline" />
          <LinkPopover hideWhenUnavailable={true} autoOpenOnLinkActive={true} />
          <Separator orientation="vertical" />
          <HeadingDropdownMenu
            levels={[1, 2, 3, 4, 5, 6]}
            hideWhenUnavailable={true}
          />
          <ListDropdownMenu
            types={["bulletList", "orderedList", "taskList"]}
            hideWhenUnavailable={true}
          />
          <Separator orientation="vertical" />
          <ImageUploadButton
            hideWhenUnavailable={true}
            onInserted={() => console.log("Image inserted!")}
          />
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
}

export default function TextEditor({
  content,
  onUpdate,
}: {
  content: string;
  onUpdate?: (content: string) => void;
}) {
  const editor = useEditor({
    extensions,
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none mx-auto mb-16 sm:mb-0 sm:mt-4",
      },
    },
    content: content,
    contentType: "markdown",
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.manager.serialize(
        editor.getJSON(),
      );
      onUpdate?.(markdown);
    },
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <MenuBar />
      <EditorContent editor={editor} />
    </EditorContext.Provider>
  );
}
