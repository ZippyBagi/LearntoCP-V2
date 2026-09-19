import { signInWithGoogle } from '@/app/scripts/login/actions'

export default async function LoginPage({searchParams} : { searchParams: Promise<{ next?: string }>; }) {

  const { next = "/" } = await searchParams;

  const signInWithGoogleWithNext = signInWithGoogle.bind(null, next);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-xl font-bold">Sign In</h1>
            <form action={signInWithGoogleWithNext}>
                <button type="submit" className="px-4 py-2 border rounded shadow">
                    Sign in with Google
                </button>
            </form>
    </div>
  )
}