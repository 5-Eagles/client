'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.error('Signup error:', error);
      return { error: error.message };
    }

    console.log('Signup successful:', data);
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error) {
    console.error('Error details:', error);
    return { error: error.message };
  }
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
