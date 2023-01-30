import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import prisma from 'lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const _session = await getServerSession(req, res, authOptions)
  const { action, ...data } = req.body

  if (req.method !== 'POST' || !action || !_session) {
    return res.status(400).end()
  }

  if (action === 'create') {
    try {
      const { title, content } = data

      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      })
  
      return res.status(200).json(post)
    }
    catch (err) {
      return res.status(500).json([])
    }
  }
  else if (action === 'delete') {
    try {
      const { id } = data

      await prisma.post.delete({
        where: {
          id
        },
      })
  
      return res.status(200).end()
    }
    catch (err) {
      return res.status(500).end()
    }
  }

  return res.status(500).end()
}