import "../styles/globals.css";
import Layout from "../components/layout";
import { UserProvider } from "@auth0/nextjs-auth0";

export default function MyApp({ Component, session, pageProps, ...appProps }) {
  if ([`/print/[pid]`].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />;
  }
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
