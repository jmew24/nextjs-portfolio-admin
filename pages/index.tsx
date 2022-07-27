import React from 'react';
import type { GetServerSideProps } from 'next';
import { Session } from 'next-auth';

import { UserProps } from '../common/types/web';
import { getUsers } from '../common/server/get-prisma-user';

import Layout from '../components/Layout';
import User from '../components/User';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		props: { users, session },
	} = await getUsers(context);

	if (!session) {
		return {
			redirect: {
				destination: '/api/auth/signin',
				permanent: false,
			},
		};
	}

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
