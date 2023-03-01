import { ChakraTheme, extendTheme } from "@chakra-ui/react";

const customChakraTheme: Partial<ChakraTheme> = {
  config: {
    initialColorMode: "dark",
  },
  fonts: {
    heading: "Poppins, system-ui, sans-serif",
    body: "Poppins, system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.900",
      },
    },
  },
};

const theme = extendTheme(customChakraTheme);

export default theme;
