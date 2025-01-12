'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Passion_One } from 'next/font/google';

const passionOne = Passion_One({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    // action 필드 추가
    formData.append('action', 'login');

    const response = await fetch('/api/auth', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/');
    } else {
      router.push(
        '/error?message=' + encodeURIComponent(data.error || 'Login failed')
      );
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white p-4'>
      <div className='w-full max-w-lg space-y-8 px-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold text-[#15357A]'>Log In</h1>
          <h2 className={`text-5xl ${passionOne.className}`}>
            <span className='text-[#4285F4]'>CrediX</span>
            <span className='text-black'>에 로그인하세요</span>
          </h2>
        </div>

        <form action={handleSubmit} className='mt-12 space-y-8'>
          <div className='space-y-6'>
            <input
              type='email'
              name='email'
              placeholder='Phone, email, or username'
              className='w-full px-6 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg
              text-black placeholder-gray-400'
              required
            />
            <div className='relative'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='w-full px-6 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg
                text-black placeholder-gray-400'
                required
              />
              <button type='button' className='absolute right-6 top-4'>
                🔒
              </button>
            </div>
          </div>

          <div className='relative text-center my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative'>
              <span className='px-6 bg-white text-gray-500 text-lg'>OR</span>
            </div>
          </div>

          <div className='space-y-5'>
            <button className='w-full flex items-center justify-center px-6 py-4 bg-white border border-[#4285F4] rounded-full space-x-3 hover:bg-gray-50 text-lg'>
              <Image src='/google.png' alt='Google' width={24} height={24} />
              <span className='text-[#4285F4]'>Login with Google</span>
            </button>

            <button className='w-full flex items-center justify-center px-6 py-4 bg-[#FEE500] rounded-full space-x-3 text-lg'>
              <Image src='/kakao.png' alt='Kakao' width={24} height={24} />
              <span className='text-black'>Login with Kakao</span>
            </button>

            <button className='w-full flex items-center justify-center px-6 py-4 bg-[#03C75A] rounded-full space-x-3 text-lg'>
              <Image src='/naver.png' alt='Naver' width={24} height={24} />
              <span className='text-white'>Login with Naver</span>
            </button>
          </div>

          <div className='text-center text-base text-gray-600 space-x-4 mt-6'>
            <Link href='/forgot-password' className='hover:underline'>
              아이디 / 비밀번호 찾기
            </Link>
            <span>|</span>
            <Link href='/signup' className='hover:underline'>
              회원가입
            </Link>
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-[#4285F4] text-white rounded-full hover:bg-blue-600 text-lg font-medium mt-6'
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
