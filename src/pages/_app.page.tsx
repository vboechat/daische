import theme from "@/styles/theme";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Flex minHeight="100vh" flexDirection="column">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </Flex>
    </ChakraProvider>
  );
}
