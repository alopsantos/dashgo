import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { makeServer } from "../services/mirage";
import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContent";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "../styles/theme";

if(process.env.NODE_ENV === 'development') {
  makeServer();
}
const queryCliente = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryCliente}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
