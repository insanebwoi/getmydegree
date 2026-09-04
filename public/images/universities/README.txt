Drop the page banner here as `universities-banner.webp` and it appears
behind the header on /universities  no code change needed.

The registry slot is declared in src/data/images.ts as 'universities-banner'.
Any of .avif .webp .jpg .jpeg .png resolves; whichever ranks highest in
FORMAT_PRIORITY (vite.config.ts) wins, so a .webp beats a .png of the
same name.
