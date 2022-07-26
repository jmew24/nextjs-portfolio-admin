import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '../../../common/get-prisma-client';

// POST /api/website
// Required fields in body: url, title, isPublic
// Optional fields in body:
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	const { url, title, isPublic } = req.body;

	const session = await getSession({ req });
	if (session) {
		try {
			const result = await prisma.website.create({
				data: {
					url: url,
					title: title,
					public: isPublic,
					owner: { connect: { email: session?.user?.email } },
				},
			});
			res.json(result);
		} catch (e) {
			let errorData = { message: e.message, title: 'unknown', targets: [] };
			if (e?.code === 'P2002') {
				errorData.title = 'constraint violation';
				errorData.targets = [e?.meta?.target];
			}

			res.status(500).send(errorData);
		}
	} else {
		res.status(401).send({ message: 'Unauthorized' });
	}
}
