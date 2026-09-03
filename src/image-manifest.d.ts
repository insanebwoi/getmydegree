declare module 'virtual:image-manifest' {
  /** Image base name (no extension) to the file that exists for it. */
  export const imageManifest: Record<string, string>
  /** Files in public/images/gallery, filename order. */
  export const galleryImages: string[]
}
