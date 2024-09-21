import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hadix - UI Builder',
  description: 'UI Builder for Hadix',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
