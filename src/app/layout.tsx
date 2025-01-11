import { Geist } from 'next/font/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: '5-Eagles',
  description: '',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={geistSans.className}
      data-theme='light'
      suppressHydrationWarning
    >
      <body className='bg-background text-foreground'>
        <main className='min-h-screen flex flex-col items-center'>
          <div className='mt-4'/>
            {children}
        </main>
      </body>
    </html>
  );
}
