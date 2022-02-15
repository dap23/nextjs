import '../styles/globals.css'
import Layout from '../components/layout'


export default function MyApp({ Component, pageProps, ...appProps }) {
  if ([`/print/[pid]`].includes(appProps.router.pathname)) {
    return <Component {...pageProps} />;
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}