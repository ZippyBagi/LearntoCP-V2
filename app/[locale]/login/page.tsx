import { signInWithGoogle } from '@/app/scripts/login/actions'
import { redirect } from '@/app/i18n/navigation';
import { createClient } from '@/app/scripts/supabase/server';

export default async function LoginPage() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-xl font-bold">Sign In</h1>
      
      <form action={signInWithGoogle}>
        <button type="submit" className="px-4 py-2 border rounded shadow">
          Sign in with Google
        </button>
      </form>

    </div>
  )
}