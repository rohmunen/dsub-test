// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../src/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var id
  let { db } = await connectToDatabase();
  await db.collection('test').insertOne(req.body).then(res => {
    id = res.insertedId
  })
  res.status(200).json({ _id: id, amount: req.body.amount})
}
