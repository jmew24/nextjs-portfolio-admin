import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from './get-prisma-client';
import { getServerAuthSession } from './get-server-session';
import { isAdmin } from './get-user-access';

export const getWebsite = async (context: GetServerSidePropsContext) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-website.ts getWebsite');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if (!session) {
		return {
			props: { website: undefined, session: null },
		};
	}

	if (isAdmin(session)) {
		const website = await prisma.website.findUnique({
			where: {
				url: String(context.query.url),
			},
			select: {
				id: true,
				title: true,
				url: true,
				public: true,
				owner: {
					select: {
						id: true,
						email: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		return {
			props: { website, session },
		};
	}

	const website = await prisma.website.findUnique({
		where: {
			url: String(context.query.url),
		},
		select: {
			id: true,
			title: true,
			url: true,
			public: true,
			owner: {
				select: {
					id: true,
					email: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		props: { website, session },
	};
};
