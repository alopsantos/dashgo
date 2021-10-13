import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { makeServer } from "../services/mirage";
import { ReactQueryDevtools } from "react-query/devtools";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "../styles/theme";

if (process.env.NODE_ENV === "development") {
  makeServer();
}
import { queryClient } from "../services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
