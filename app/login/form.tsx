"use client"; // Indicates that this module is client-side code.

import { signIn } from "next-auth/react"; // Import the signIn function from NextAuth for authentication.
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation"; // Import Next.js navigation utilities.
import { ChangeEvent, useState } from "react"; // Import React hooks for managing component state.

export const LoginForm = () => {
  const router = useRouter(); // Initialize the Next.js router.
  const [loading, setLoading] = useState(false); // State for managing loading state.
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  }); // State for form input values.
  const [error, setError] = useState(""); // State for handling errors during authentication.

  const searchParams = useSearchParams(); // Get query parameters from the URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/api/auth/callback"; // Define a callback URL or use a default one.

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior.
    try {
      setLoading(true); // Set loading state to true.
      setFormValues({ email: "", password: "" }); // Clear form input values.

      // Attempt to sign in using the credentials (email and password).
      const res = await signIn("credentials", {
        redirect: false,
        email: formValues.email,
        password: formValues.password,
        callbackUrl,
      });

      setLoading(false); // Set loading state back to false.

      console.log(res); // Log the authentication response.
      if (!res?.error) {
        router.push(callbackUrl); // Redirect to the callback URL on successful authentication.
      } else {
        setError("invalid email or password"); // Set an error message for invalid credentials.
      }
    } catch (error: any) {
      setLoading(false); // Set loading state back to false on error.
      setError(error); // Set the error message for any other errors.
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {error && (
        <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
      )}

      {/* Sign In with Google button */}
      <a
        className="px-7 py-2 text-white bg-red-700 font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
        onClick={() => signIn("ac", { callbackUrl })}
        role="button"
      >
        <Image
          className="pr-2"
          src="/images/google.svg"
          alt="google logo"
          height={32}
          width={32}
        />
        Continue with Google
      </a>
    </form>
  );
};