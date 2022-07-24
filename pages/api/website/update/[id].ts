import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../../lib/prisma';

// POST /api/website/update/:id
// Required fields in body: url, title, isPublic
// Optional fields in body:
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { url, title, isPublic } = req.body;
	const websiteId = req.query.id;

	const session = await getSession({ req });

	if (req.method === 'POST') {
		if (session) {
			const current = await prisma.website.findFirst({
				where: { id: Number(websiteId), owner: { email: session?.user?.email } },
			});
			if (current) {
				const post = await prisma.website.update({
					where: { id: Number(websiteId) },
					data: {
						url: url,
						title: title,
						public: isPublic,
					},
				});
				res.json(post);
			} else {
				res.status(401).send({ message: 'Could not find that webpage for this user' });
			}
		} else {
			res.status(401).send({ message: 'Unauthorized' });
		}
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
