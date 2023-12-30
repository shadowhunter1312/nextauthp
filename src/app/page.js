"use client";
import {useSession} from "next-auth/react";
import styles from './page.module.css'

export default function Home() {
  const {data: session, status} = useSession();
  console.log("status", status);
  console.log("session", session);


  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>
  }
 

  return (
    <main className={styles.main}>
      <div className={styles.description}>
      <a href="/api/auth/signin">Sign in</a>
      </div>
      
    </main>
  )
}


