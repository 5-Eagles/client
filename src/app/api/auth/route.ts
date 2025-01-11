'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import CryptoJS from 'crypto-js';
import { ethers } from 'ethers';

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

  // AES 암호화 키 가져오기
  const encryptionKey = process.env.AES_ENCRYPTION_KEY;
  if (!encryptionKey) {
    throw new Error(
      'AES_ENCRYPTION_KEY is not defined in environment variables'
    );
  }

  // Generate a new Ethereum wallet
  const wallet = ethers.Wallet.createRandom();
  const publicKey = wallet.address; // 공개 키
  const privateKey = wallet.privateKey; // 비밀 키

  // Encrypt the private key
  const encryptedPrivateKey = CryptoJS.AES.encrypt(
    privateKey,
    encryptionKey
  ).toString();

  // Save user data, including wallet information
  const { error: dbError } = await supabase.from('users').insert({
    email,
    name,
    wallet_address: publicKey,
    wallet_private_key_encrypted: encryptedPrivateKey,
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
