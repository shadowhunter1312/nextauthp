"use client";
import { useSession } from "next-auth/react";
import styles from './page.module.css';
import { signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    // While the session is being fetched, you can show a loading state
    return <p>Loading...</p>;
  }

  if (status === "authenticated") {
    console.log(session.user)
    // Once the session is authenticated, show the user information and the sign-out button
    return (
      <p>
        Signed in as {session.user.username} <button onClick={() => signOut()}>Sign out</button>
      </p>
    );
  }

  // If the status is neither "loading" nor "authenticated", show the sign-in link
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <a href="/api/auth/signin">Sign in</a>
      </div>
    </main>
  );
}


