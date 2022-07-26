import prisma from '../../../common/server/get-prisma-client';
import { getServerAuthSession } from '../../../common/server/get-server-session';

// DELETE /api/website/:id
export default async function handle(context) {
	const { req, res } = context;
	const session = await getServerAuthSession(context);
	const websiteId = req.query.id;

	if (!websiteId || typeof websiteId !== 'string') {
		res.status(400).send({ message: 'Invalid website id' });
		return;
	}

	if (req.method === 'DELETE') {
		if (!session) {
			res.status(401).send({ message: 'Unauthorized' });
		}

		if (!websiteId || typeof websiteId !== 'string') {
			res.status(400).send({ message: 'Invalid website id' });
			return;
		}

		const post = await prisma.website.delete({
			where: { id: websiteId },
		});
		res.json(post);
	} else {
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
