import { SignIn } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      <SignIn signUpUrl="/sign-up" />
    </div>
  )
}
