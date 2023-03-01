import { Header } from "@/layout/header/Header";
import { Tasks } from "@/layout/tasks/Tasks";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      location.replace("/signin");
    },
  });

  if (status === "loading") return null;

  return (
    <>
      <Head>
        <title>Daische</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <Tasks />
    </>
  );
}
