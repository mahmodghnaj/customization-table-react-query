import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(router.isReady);
  }, [router.isReady]);
  return (
    <QueryClientProvider client={queryClientState}>
      {ready && <Component {...pageProps} />}
    </QueryClientProvider>
  );
}
