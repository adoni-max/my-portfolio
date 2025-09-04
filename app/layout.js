
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Modern Portfolio | Harrison Ford',
  description: 'Personal portfolio website showcasing projects and skills',
  keywords: 'portfolio, frontend developer, web developer, react, next.js',
  author: 'Harrison Ford',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
