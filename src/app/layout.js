import './globals.css';

export const metadata = {
  title: 'NST Connect',
  description: 'Connect, Augment your Reality',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}