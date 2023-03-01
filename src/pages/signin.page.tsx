import { Center, Container, Flex, Text } from "@chakra-ui/react";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import React from "react";

import logo from "../../public/daische-transparent-logo.png";
import googleLogo from "../../public/google_signin.png";

export default function SignIn() {
  const { status } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      location.replace("/");
    }
  }, [status]);

  if (status === "loading") return null;

  return (
    <>
      <Head>
        <title>Daische - Sign In</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container
        as="main"
        maxW="container.lg"
        marginTop={4}
        justifyContent="center"
      >
        <Center flexDirection="column">
          <Image
            src={logo}
            quality={100}
            width={180}
            alt="Daische Logo"
            priority
          />
        </Center>
        <Flex flexDirection="column" alignItems="center" mt={16} gap={2}>
          <Text fontWeight="semibold" fontSize="2xl">
            Authenticate with
          </Text>
          <Image
            src={googleLogo}
            style={{ cursor: "pointer" }}
            quality={100}
            width={200}
            alt="Google sign-in button"
            onClick={() => signIn("google", { callbackUrl: "about:blank" })}
            priority
          />
        </Flex>
      </Container>
    </>
  );
}
