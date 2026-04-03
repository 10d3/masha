"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useMemo } from "react"

interface TiptapRendererProps {
  // Can accept Tiptap JSON content or HTML string
  content: string | Record<string, unknown>
  className?: string
}

export function TiptapRenderer({ content, className = "" }: TiptapRendererProps) {
  // Parse content - can be JSON string, JSON object, or plain HTML/text
  const parsedContent = useMemo(() => {
    if (typeof content === "string") {
      // Try to parse as JSON first
      try {
        return JSON.parse(content)
      } catch {
        // If not JSON, treat as HTML or plain text
        return content
      }
    }
    return content
  }, [content])

  const editor = useEditor({
    extensions: [StarterKit],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `outline-none ${className}`,
      },
    },
  })

  return <EditorContent editor={editor} className={className} />
}

// Simple inline text renderer for single-line content
interface InlineRendererProps {
  content: string | Record<string, unknown>
  className?: string
}

export function InlineRenderer({ content, className = "" }: InlineRendererProps) {
  // For simple text, just render directly
  if (typeof content === "string" && !content.startsWith("{")) {
    return <span className={className}>{content}</span>
  }

  // Parse JSON content if needed
  const parsedContent = useMemo(() => {
    if (typeof content === "string") {
      try {
        return JSON.parse(content)
      } catch {
        return content
      }
    }
    return content
  }, [content])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        blockquote: false,
        codeBlock: false,
        horizontalRule: false,
      }),
    ],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `outline-none inline ${className}`,
      },
    },
  })

  return <EditorContent editor={editor} className={`inline ${className}`} />
}
