'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useAutosave } from 'react-autosave'
import { UpdateJournal } from '@/util/api'

// Carregando o Editor dinamicamente para evitar problemas de SSR
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface EditorProps {
  entry: {
    id: string
    content: string
    ownerId: string
    createdAt: string
    updatedAt: string
  }
}

const Editor: React.FC<EditorProps> = ({ entry }) => {
  const [content, setContent] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (value: string) => {
    setContent(value)
  }

  useAutosave({
    data: content,
    onSave: async (_content) => {
      setIsLoading(true)
      const updated = await UpdateJournal(entry.id, _content)
      setIsLoading(false)
    },
  })

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full h-full">
      <h1 className="text-2xl font-bold mb-4">Text Editor</h1>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        className="bg-white rounded-md shadow-sm text-xl overflow-auto"
        modules={{
          toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline'],
            ['code-block', 'blockquote'],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
      />
    </div>
  )
}

export default Editor
