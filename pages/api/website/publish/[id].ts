import prisma from '../../../../common/get-prisma-client';
import { getServerAuthSession } from '../../../../common/get-server-session';

// PUT /api/website/publish/:id
export default async function handle(context) {
	const { req, res } = context;
	const session = await getServerAuthSession(context);
	const websiteId = req.query.id;

	if (req.method === 'POST') {
		if (!session) {
			res.status(401).send({ message: 'Unauthorized' });
		}

		if (!websiteId || typeof websiteId !== 'string') {
			res.status(400).send({ message: 'Invalid website id' });
			return;
		}

		const post = await prisma.website.update({
			where: { id: websiteId },
			data: { public: true },
		});
		res.json(post);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
