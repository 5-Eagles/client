'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;
  const name = formData.get('name') as string | null;

  // Input validation
  if (!email || !password || !name) {
    console.error('Missing required fields');
    redirect('/error?message=Missing%20required%20fields');
  }

  // Sign up the user with email and password
  const { data: authResponse, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authResponse.user) {
    console.error('Sign-up error:', authError?.message);
    redirect(
      `/error?message=${encodeURIComponent(authError?.message || 'Sign-up failed')}`
    );
  }

  // Save additional user data
  const { error: dbError } = await supabase.from('users').insert({
    email,
    name,
  });

  if (dbError) {
    console.error('Database error:', dbError.message);
    redirect(
      `/error?message=${encodeURIComponent(dbError.message || 'Failed to save user data')}`
    );
  }

  // Redirect to home after successful signup
  redirect('/');
}

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  // Input validation
  if (!email || !password) {
    console.error('Missing email or password');
    redirect('/error?message=Missing%20email%20or%20password');
  }

  // Log in the user
  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    console.error('Login error:', loginError.message);
    redirect(
      `/error?message=${encodeURIComponent(loginError.message || 'Login failed')}`
    );
  }

  // Revalidate the cache and redirect
  revalidatePath('/');
  redirect('/');
}
