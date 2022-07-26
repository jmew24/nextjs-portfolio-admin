import React from 'react';
import type { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { UserProps } from '../common/types/web';
import prisma from '../common/get-prisma-client';
import { isAdmin } from '../common/get-user-access';

import Layout from '../components/Layout';
import User from '../components/User';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
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
		props: { users, session },
	};
};

type Props = {
	users: UserProps[];
	session: Session;
};

const HomePage: React.FC<Props> = ({ users }) => {
	return (
		<Layout>
			<div className='page'>
				<h1>Users</h1>
				<main>
					{users?.map((user) => (
						<div key={`${user.id}`} className='block'>
							<User user={user} />
						</div>
					))}
				</main>
			</div>
			<style jsx>{`
				.block {
					background: white;
					transition: box-shadow 0.1s ease-in;
				}

				.block:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.block + .block {
					margin-top: 2rem;
				}

				button:disabled {
					cursor: not-allowed;
					pointer-events: all !important;
				}

				button:disabled a {
					cursor: not-allowed;
					pointer-events: all !important;
				}

				a:disabled {
					cursor: not-allowed;
					pointer-events: all !important;
				}
			`}</style>
		</Layout>
	);
};

export default HomePage;
