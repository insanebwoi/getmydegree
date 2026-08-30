declare module '*.md' {
  export const html: string
}

declare module '*.md?meta' {
  export const meta: {
    title: string
    excerpt: string
    category: string
    date: string
    author: string
    cover?: string
    readingMinutes: number
  }
}
