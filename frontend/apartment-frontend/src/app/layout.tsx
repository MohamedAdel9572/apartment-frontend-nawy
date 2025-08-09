import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apartment App',
  description: 'Apartment listing application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black min-h-screen">
        {children}
      </body>
    </html>
  );
}
