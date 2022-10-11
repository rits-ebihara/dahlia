import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html data-theme="garden">
      <Head />
      <body className="p-4">
        <Main />
        <NextScript />
        <div id="modal-root"></div>
        <div id="notification-root"></div>
      </body>
    </Html>
  );
}
