import { Geist, Passion_One } from 'next/font/google';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: '5-Eagles',
  description: '',
};

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
          <div className='mt-5'/>
            {children}
        </main>
      </body>
    </html>
  );
}
