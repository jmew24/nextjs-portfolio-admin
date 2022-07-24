import React from 'react';
import type { GetServerSideProps } from 'next';
import { RecoilRoot } from 'recoil';

import Layout from '../components/Layout';
import User, { UserProps } from '../components/User';
import ErrorBoundary from '../components/ErrorBoundary';

import prisma from '../lib/prisma';

export const getServerSideProps: GetServerSideProps = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			firstName: true,
			lastName: true,
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
		props: { users },
	};
};

type Props = {
	users: UserProps[];
};

const HomePage: React.FC<Props> = (props) => {
	return (
		<ErrorBoundary>
			<RecoilRoot>
				<Layout>
					<div className='page'>
						<h1>Users</h1>
						<main>
							{props.users.map((user) => (
								<div key={user.id} className='block'>
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
					`}</style>
				</Layout>
			</RecoilRoot>
		</ErrorBoundary>
	);
};

export default HomePage;
