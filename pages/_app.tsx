import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Header, Footer } from 'components'
import 'css/global.css'

export default ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </SessionProvider>
  )
}