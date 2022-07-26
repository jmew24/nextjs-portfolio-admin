import React from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { UserProps } from '../../common/types/web';
import prisma from '../../common/get-prisma-client';
import { isAdmin } from '../../common/get-user-access';

import Website from '../../components/Website';
import Layout from '../../components/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		res,
		params: { id },
	} = context;
	const session = await getSession(context);

	if (!id || typeof id !== 'string') {
		res.writeHead(400).end('Invalid website id');
		return;
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
};

type Props = {
	user: UserProps;
	session: Session;
};

const User: React.FC<Props> = ({ user, session }) => {
	const authorName = user.firstName
		? user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.firstName
		: 'Unknown owner';

	if (!user || session.status === 'unauthenticated') {
		return <div>Authenticating ...</div>;
	}

	return (
		<Layout>
			<div>
				<h2>{authorName}</h2>
				<div className='page'>
					<h1>Websites</h1>
					<main>
						{user.websites?.map((website) => (
							<div key={website.id} className='block'>
								<Website website={website} />
							</div>
						))}
					</main>
				</div>
			</div>
			<style jsx>{`
				.page {
					background: white;
					padding: 2rem;
				}

				.actions {
					margin-top: 2rem;
				}

				button {
					background: #ececec;
					border: 0;
					border-radius: 0.125rem;
					padding: 1rem 2rem;
				}

				button + button {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default User;
