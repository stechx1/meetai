'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert('Error creating user');
        },
        onSuccess: () => {
          window.alert('User created successfully');
          setName('');
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  const onLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert('Error sigining in');
        },
        onSuccess: () => {
          window.alert('User signed in successfully');
          setName('');
          setEmail('');
          setPassword('');
        },
      }
    );
  };

  if (session) {
    return (
      <div className='flex flex-col p-4 gap-4'>
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='p-4 flex flex-col gap-y-4'>
        <Input
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onSubmit}>Create User</Button>
      </div>

      <div className='p-4 flex flex-col gap-y-4'>
        <Input
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder='password'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={onLogin}>Login</Button>
      </div>
    </div>
  );
}
