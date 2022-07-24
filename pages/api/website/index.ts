import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import { getSession } from 'next-auth/react';

// POST /api/website
// Required fields in body: url, title, isPublic
// Optional fields in body:
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { url, title, isPublic } = req.body;

	const session = await getSession({ req });
	if (session) {
		const result = await prisma.website.create({
			data: {
				url: url,
				title: title,
				public: isPublic,
				owner: { connect: { email: session?.user?.email } },
			},
		});
		res.json(result);
	} else {
		res.status(401).send({ message: 'Unauthorized' });
	}
}
