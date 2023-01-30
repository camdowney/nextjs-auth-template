import { useState } from 'react'
import { getServerSession } from 'next-auth/next'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { signOut } from 'next-auth/react'
import prisma from 'lib/prisma'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const _session = await getServerSession(ctx.req, ctx.res, authOptions)

  if (!_session) {
    return {
      redirect: {
        permanent: false,
        destination: '/sign-in',
      }
    }
  }

  const posts = await prisma.post.findMany({
    orderBy: [
      { id: 'desc' },
    ],
  })

  return {
    props: {
      _posts: JSON.parse(JSON.stringify(posts)),
    },
  }
}

interface PageProps {
  _posts: Post[]
}

export default ({ _posts }: PageProps) => {
  const [posts, setPosts] = useState(_posts)

  async function createPost(e: any) {
    e.preventDefault()

		const { title, content } = Object.fromEntries(new FormData(e.target))

    const res = await fetch('/api/prisma', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create',
        title,
        content,
      }),
    })

    const post = await res.json()

		setPosts([post, ...posts])
  }

	async function deletePost(e: any, id: Number) {
    e.preventDefault()

    await fetch('/api/prisma', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        action: 'delete',
        id,
      }),
    })

		setPosts(posts.filter(post => post.id !== id))
	}

  return <>
    <Head>
      <title>Admin | NextJS + Auth Template</title>
    </Head>

    <section>
      <div className='container'>
        <h1>Admin</h1>
        <button onClick={() => signOut()} className='button'>Sign out</button>
      </div>
    </section>

    <section>
      <div className='container'>
        <h2>Create Post</h2>
        <form onSubmit={createPost}>
          <input name='title' placeholder='Title' required />
          <textarea name='content' placeholder='Content' required />
          <div>
            <button type='submit'>Create Post</button>
          </div>
        </form>
      </div>
    </section>

    <section>
      <div className='container'>
        <h2>All Posts</h2>
        <div className='posts'>
          {posts.map((post, index) =>
            <div className='post' key={index}>
              <h3>{post.title}</h3>
              <p className='post-content'>{post.content}</p>
              <button className='post-delete-btn' onClick={e => deletePost(e, post.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>
    </section>
  </>
}