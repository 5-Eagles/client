'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signup } from '@/app/api/auth/route';

export default function SignupPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white p-4'>
      <div className='w-full max-w-lg space-y-8 px-8'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold text-[#15357A]'>Sign Up</h1>
          <h2 className='text-2xl text-[#4285F4]'>
            CrediX<span className='text-black'>에 가입하세요</span>
          </h2>
        </div>

        <form action={signup} className='mt-12 space-y-8'>
          <div className='space-y-6'>
            <div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='w-full px-6 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg
                text-black placeholder-gray-400'
                required
              />
            </div>

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

            <div>
              <input
                type='text'
                name='name'
                placeholder='Name'
                className='w-full px-6 py-4 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg
                text-black placeholder-gray-400'
                required
              />
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
              <span className='text-[#4285F4]'>Sign up with Google</span>
            </button>

            <button className='w-full flex items-center justify-center px-6 py-4 bg-[#FEE500] rounded-full space-x-3 text-lg'>
              <Image src='/kakao.png' alt='Kakao' width={24} height={24} />
              <span className='text-black'>Sign up with Kakao</span>
            </button>

            <button className='w-full flex items-center justify-center px-6 py-4 bg-[#03C75A] rounded-full space-x-3 text-lg'>
              <Image src='/naver.png' alt='Naver' width={24} height={24} />
              <span className='text-white'>Sign up with Naver</span>
            </button>
          </div>

          <div className='text-center text-base text-gray-600 mt-6'>
            <span>이미 계정이 있으신가요? </span>
            <Link href='/login' className='text-[#4285F4] hover:underline'>
              로그인하기
            </Link>
          </div>

          <button
            type='submit'
            className='w-full py-4 bg-[#4285F4] text-white rounded-full hover:bg-blue-600 text-lg font-medium mt-6'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
