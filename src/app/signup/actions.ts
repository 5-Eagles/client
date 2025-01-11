'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email || !password || !name) {
    redirect('/error');
  }

  // Sign up the user with email and password
  const { data: authResponse, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authResponse.user) {
    console.log(authError);
    console.log(authResponse);

    redirect('/error');
  }

  // Save additional user data (ID is automatically generated in the database)
  const { error: dbError } = await supabase.from('users').insert({
    email,
    name,
  });

  if (dbError) {
    redirect('/error');
  }

  redirect('/');
}
