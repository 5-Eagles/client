import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import CryptoJS from 'crypto-js';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'signup') {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    // Input validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    try {
      // Sign up the user with email and password
      const { data: authResponse, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError || !authResponse.user) {
        return NextResponse.json(
          { error: authError?.message || 'Sign-up failed' },
          { status: 400 }
        );
      }

      // AES 암호화 키 가져오기
      const encryptionKey = process.env.AES_ENCRYPTION_KEY;
      if (!encryptionKey) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }

      // Generate a new Ethereum wallet
      const wallet = ethers.Wallet.createRandom();
      const publicKey = wallet.address;
      const privateKey = wallet.privateKey;

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
        return NextResponse.json({ error: dbError.message }, { status: 500 });
      }

      return NextResponse.json(
        { message: 'Signup successful', redirectTo: '/' },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  if (action === 'login') {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 }
      );
    }

    try {
      // Log in the user
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        return NextResponse.json(
          { error: loginError.message || 'Login failed' },
          { status: 401 }
        );
      }

      return NextResponse.json(
        { message: 'Login successful', redirectTo: '/' },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}
