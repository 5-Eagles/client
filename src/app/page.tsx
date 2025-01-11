import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <br />
      <Link href='/login'>Log in</Link>
      <br />
      <br />
      <Link href='/signup'>Sign up</Link>
      <br />
      <br />
      <Link href='/profile'>Login user only profile page</Link>
      <br />
      <br />
    </div>
  );
}
