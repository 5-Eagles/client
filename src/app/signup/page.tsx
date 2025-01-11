'use client';

import { signup } from './actions';

export default function SignupPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-base-200'>
      <form
        action={signup} /* This is handled by Next.js */
        className='p-6 bg-white rounded-lg shadow-lg space-y-4 w-96'
      >
        <h1 className='text-2xl font-bold text-center'>Sign Up</h1>
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            required
            className='input input-bordered w-full'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password:
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='input input-bordered w-full'
          />
        </div>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium text-gray-700'
          >
            Name:
          </label>
          <input
            id='name'
            name='name'
            type='text'
            required
            className='input input-bordered w-full'
          />
        </div>
        <button type='submit' className='btn btn-primary w-full'>
          Sign Up
        </button>
      </form>
    </div>
  );
}
