const createPath = (path: string) => {
  return window.location.origin + path
}

export const UpdateJournal = async (id, content) => {
  const res = await fetch(createPath(`/api/journal/${id}`), {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  })

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const CreateNewJournal = async () => {
  const response = await fetch(
    new Request(createPath('/api/journal'), {
      method: 'POST',
    })
  )

  if (response.ok) {
    const data = await response.json()
    return data.data
  }
}
