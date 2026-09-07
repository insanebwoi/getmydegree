declare module 'virtual:image-manifest' {
  /** Image base name (no extension) to the file that exists for it. */
  export const imageManifest: Record<string, string>
  /**
   * Image base name to a JPEG/PNG file for that image, with its pixel size   a
   * WebP/AVIF sibling never wins here, since social scrapers (Facebook,
   * LinkedIn, WhatsApp) render those unreliably for og:image.
   */
  export const ogImageManifest: Record<string, { src: string; width: number; height: number }>
  /** Files in public/images/gallery, filename order. */
  export const galleryImages: { src: string; width: number; height: number }[]
}
