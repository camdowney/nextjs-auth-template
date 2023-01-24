import Head from 'next/head'

export default () => {
  return <>
    <Head>
      <title>NextJS + Auth Template</title>
    </Head>
    
    <section>
      <div className='container'>
        <h1>NextJS + Auth Template</h1>
        <div className='btn-group'>
          <a href='/sign-in'>Sign in</a>
          <a href='/admin'>Admin</a>
        </div>
      </div>
    </section>
  </>
}