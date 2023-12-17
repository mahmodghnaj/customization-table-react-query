import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const [queryClientState] = useState(queryClient);
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClientState}>
      {router.isReady && <Component {...pageProps} />}
    </QueryClientProvider>
  );
}
