'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const HomeView = () => {
  const { data: session, isPending } = authClient.useSession();

  if (session) {
    return (
      <div className='flex flex-col p-4 gap-4'>
        <p>Logged in as {session.user.name}</p>
        <Button disabled={isPending} onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      Homepage
    </div>
  );
};
