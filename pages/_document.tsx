import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v5.0.0/mapbox-gl-geocoder.css" type="text/css"></link>
      <script src="https://unpkg.com/flowbite@1.4.4/dist/flowbite.js"></script>
      <title>Ihsan Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        <meta property="og:type" content="website" />
        <meta name="og:site_name" content="Ihsan Home"/>
        <meta property="og:title" content="IhsanHome, Exellence in real-estate" />
        <meta
          name="description"
          property="og:description"
          content="ihsan home is where you can find your dream home or shop"
        />
        <meta property="og:type" content="video.movie" />
        <meta
          property="og:url"
          content="https://ihsanhome.com/"
        />
        <meta
          name="image"
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/ihsan-home.appspot.com/o/IhsanHome.png?alt=media&token=6bbf4ab6-5ac4-4646-b346-05eb1915dc9f"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}