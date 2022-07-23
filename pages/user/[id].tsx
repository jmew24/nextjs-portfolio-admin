import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';
import { UserProps } from '../../components/User';
import Website from '../../components/Website';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const user = await prisma.user.findUnique({
		where: {
			id: Number(params?.id) || -1,
		},
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
		props: user,
	};
};

const User: React.FC<UserProps> = (props) => {
	const { status } = useSession();
	const authorName = props.firstName
		? props.lastName
			? `${props.firstName} ${props.lastName}`
			: props.firstName
		: 'Unknown owner';

	if (status === 'loading') {
		return <div>Authenticating ...</div>;
	}

	return (
		<Layout>
			<div>
				<h2>{authorName}</h2>
				<div className='page'>
					<h1>Websites</h1>
					<main>
						{props?.websites?.map((website) => (
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
