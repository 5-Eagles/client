'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get('message') || 'An unexpected error occurred';

  return (
    <div className='p-6 bg-white rounded-lg shadow-lg text-center space-y-4 w-96'>
      <h1 className='text-2xl font-bold text-red-600'>Error</h1>
      <p className='text-gray-700'>{decodeURIComponent(errorMessage)}</p>
      <Link href='/' className='btn btn-primary'>
        Go Home
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-base-200'>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
