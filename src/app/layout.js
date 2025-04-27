// import './globals.css';

// export const metadata = {
//   title: 'NST Connect',
//   description: 'Connect, Augment your Reality',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>{children}</body>
//     </html>
//   );
// }
// app/layout.js
import './globals.css';
import { initializeCollections } from '@/lib/seedData';

// Call this during app initialization
initializeCollections();

export const metadata = {
  title: 'NST Connect',
  description: 'Connect, Augment your Reality',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}