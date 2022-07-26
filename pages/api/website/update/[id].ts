import prisma from '../../../../common/get-prisma-client';
import { getServerAuthSession } from '../../../../common/get-server-session';

// POST /api/website/update/:id
// Required fields in body: url, title, isPublic
// Optional fields in body:
export default async function handle(context) {
	const { req, res } = context;
	const session = await getServerAuthSession(context);
	const { url, title, isPublic } = req.body;
	const websiteId = req.query.id;

	if (req.method === 'POST') {
		if (!session) {
			res.status(401).send({ message: 'Unauthorized' });
		}

		if (!websiteId || typeof websiteId !== 'string') {
			res.status(400).send({ message: 'Invalid website id' });
			return;
		}

		const current = await prisma.website.findFirst({
			where: { id: websiteId, owner: { email: session?.user?.email } },
		});
		if (current) {
			const post = await prisma.website.update({
				where: { id: websiteId },
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
		throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
	}
}
