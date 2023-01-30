import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth/next'
import { signIn } from 'next-auth/react'
import { authOptions } from 'pages/api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin',
      }
    }
  }

  return {
    props: {},
  }
}

export default () => {
  return <>
    <Head>
      <title>Sign In | NextJS + Auth Template</title>
    </Head>

    <section>
      <div className='container'>
        <h1>Sign In</h1>
        <div className='btn-group'>
          <button onClick={() => signIn('google')}>Sign in with Google</button>
        </div>
      </div>
    </section>
  </>
}