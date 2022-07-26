import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

import { prisma } from './get-prisma-client';
import { getServerAuthSession } from './get-server-session';
import { isAdmin } from './get-user-access';

export const getUsers = async (context: GetServerSidePropsContext) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-user.ts getManyUsers');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if (!session) {
		return {
			props: { users: [], session: null },
		};
	}

	if (isAdmin(session)) {
		const users = await prisma.user.findMany({
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				accessLevel: true,
				websites: {
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
				},
			},
		});

		return {
			props: { users, session },
		};
	}

	const users = await prisma.user.findMany({
		where: {
			email: session?.user?.email,
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			accessLevel: true,
			websites: {
				where: {
					public: true,
					OR: [{ owner: { email: session.user.email } }],
				},
				select: {
					id: true,
					title: true,
					url: true,
					public: true,
					owner: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			},
		},
	});

	return {
		props: { users, session },
	};
};

export const getUser = async (context: GetServerSidePropsContext) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-user.ts getUser');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if (!session) {
		return {
			props: { user: null, session: null },
		};
	}

	const user = await prisma.user.findFirst({
		where: {
			email: session?.user?.email,
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			accessLevel: true,
			websites: {
				select: {
					id: true,
					title: true,
					url: true,
					public: true,
					owner: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			},
		},
	});

	return {
		props: { user, session },
	};
};

export const getUserById = async (context: GetServerSidePropsContext) => {
	const {
		res,
		params: { id },
	} = context;
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-website.ts getWebsite');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if (!id || typeof id !== 'string') {
		res.writeHead(400).end('Invalid website id');
		return;
	}

	if (!session) {
		return {
			props: { user: null, session: null },
		};
	}

	if (isAdmin(session)) {
		const user = await prisma.user.findUnique({
			where: {
				id: id,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				accessLevel: true,
				websites: {
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
				},
			},
		});

		return {
			props: { user, session },
		};
	}

	const user = await prisma.user.findUnique({
		where: {
			id: id,
			email: session.user.email,
		},
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
			accessLevel: true,
			websites: {
				where: {
					public: true,
				},
				select: {
					id: true,
					title: true,
					url: true,
					public: true,
					owner: {
						select: {
							id: true,
							firstName: true,
							lastName: true,
						},
					},
				},
			},
		},
	});

	return {
		props: { user, session },
	};
};

export const getUserByEmail = async (context: GetServerSidePropsContext, email: string) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-user.ts getUserByEmail');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if ((session && isAdmin(session)) || session?.user?.email === email) {
		const user = await prisma.user.findFirst({
			where: {
				email: email,
			},
			select: {
				id: true,
				email: true,
				firstName: true,
				lastName: true,
				accessLevel: true,
				websites: {
					select: {
						id: true,
						title: true,
						url: true,
						owner: {
							select: {
								id: true,
								firstName: true,
								lastName: true,
							},
						},
					},
				},
			},
		});

		return {
			props: { user, session },
		};
	}

	return {
		props: { user: undefined, session: undefined },
	};
};

export const getUserByCredentials = async (credentials: Record<'email' | 'password', string>) => {
	return await prisma.user.findFirst({
		where: { email: credentials?.email },
		select: {
			id: true,
			password: true,
			email: true,
			emailVerified: true,
			image: true,
			firstName: true,
			lastName: true,
			accessLevel: true,
			websites: {
				select: {
					id: true,
					url: true,
					title: true,
					public: true,
				},
			},
		},
	});
};

export const getUserWebsites = async (context: GetServerSidePropsContext, userId: string) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-user.ts getUserWebsites');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if (!session) {
		return {
			props: { websites: [], session: undefined },
		};
	}

	if (isAdmin(session)) {
		const websites = await prisma.website.findMany({
			where: {
				owner: {
					id: userId,
				},
			},
			select: {
				id: true,
				title: true,
				url: true,
				public: true,
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		return {
			props: { websites, session },
		};
	}

	const websites = await prisma.website.findMany({
		where: {
			owner: {
				id: userId,
				email: session?.user?.email,
			},
		},
		select: {
			id: true,
			title: true,
			url: true,
			owner: {
				select: {
					id: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return {
		props: { websites, session },
	};
};

export const getUserWebsitesByEmail = async (context: GetServerSidePropsContext, email: string) => {
	const session = await getServerAuthSession(context);
	const session2 = await getSession(context);
	console.log('prisma-user.ts getUserWebsitesByEmail');
	console.log('getServerAuthSession', session);
	console.log('getSession', session2);

	if ((session && isAdmin(session)) || session?.user?.email === email) {
		const websites = await prisma.website.findMany({
			where: {
				owner: {
					email: email,
				},
			},
			select: {
				id: true,
				title: true,
				url: true,
				public: true,
				owner: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
					},
				},
			},
		});

		return {
			props: { websites, session },
		};
	}

	return {
		props: { websites: [], session: undefined },
	};
};
