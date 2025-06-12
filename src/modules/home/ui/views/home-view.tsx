'use client';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const HomeView = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  if (session) {
    return (
      <div className='flex flex-col p-4 gap-4'>
        <p>Logged in as {session.user.name}</p>
        <Button
          disabled={isPending}
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => router.push('/sign-in'),
              },
            })
          }
        >
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
