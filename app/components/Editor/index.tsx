'use client'

import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { UpdateJournal } from '@/util/api'

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
      <textarea value={content} onChange={() => handleChange} />
    </div>
  )
}

export default Editor
