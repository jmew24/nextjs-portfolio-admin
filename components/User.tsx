import React from 'react';
import Router from 'next/router';
import Website, { WebsiteProps } from './Website';

export type UserProps = {
	id: number;
	email: string;
	firstName: string;
	lastName: boolean;
	websites: WebsiteProps[] | null;
};

const UserPage: React.FC<{ user: UserProps }> = ({ user }) => {
	const authorName = user.firstName
		? user.lastName
			? `${user.firstName} ${user.lastName}`
			: user.firstName
		: 'Unknown owner';

	return (
		<div onClick={() => Router.push('/user/[id]', `/user/${user.id}`)}>
			<h2>{authorName}</h2>
			<small>Email: {user.email}</small>

			{user.websites.length > 0 ? (
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
			) : null}

			<style jsx>{`
				div {
					color: inherit;
					padding: 1rem;
				}
			`}</style>
		</div>
	);
};

export default UserPage;
