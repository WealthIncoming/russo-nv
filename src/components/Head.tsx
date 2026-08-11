export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Fonts are self-hosted (see src/styles/fonts.css). Preload the two
          latin variable fonts so text renders without a CSS-then-font chain. */}
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/inter/inter-var-latin.woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="font"
        type="font/woff2"
        href="/fonts/syne/v24/8vIH7w4qzmVxm2BL9G78HEY.woff2"
        crossOrigin="anonymous"
      />
    </>
  );
};
