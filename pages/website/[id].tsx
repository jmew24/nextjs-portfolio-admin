import React from 'react';
import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import ReactMarkdown from 'react-markdown';
import Router from 'next/router';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

import { WebsiteProps } from '../../common/types/web';
import prisma from '../../common/server/get-prisma-client';

import Layout from '../../components/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
	const {
		req,
		res,
		params: { id },
	} = context;
	const session = await getSession(context);

	if (!id || typeof id !== 'string') {
		res.writeHead(400).end('Invalid website id');
		return;
	}

	if (!session) {
		res.writeHead(401).end('Unauthorized');
		return;
	}

	const website = await prisma.website.findUnique({
		where: {
			id: id,
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

async function publishWebsite(id: String): Promise<void> {
	await fetch(`/api/website/publish/${id}`, {
		method: 'PUT',
	});
	await Router.push('/');
}

async function deleteWebsite(id: String): Promise<void> {
	await fetch(`/api/website/${id}`, {
		method: 'DELETE',
	});
	await Router.push('/');
}

export type Props = {
	website: WebsiteProps;
	session: Session;
};

const Website: React.FC<Props> = ({ website, session }) => {
	const router = useRouter();
	const isActive: (pathname: String) => boolean = (pathname) => router.pathname === pathname;

	const authorName = website?.owner?.firstName
		? website?.owner?.lastName
			? `${website?.owner?.firstName} ${website?.owner?.lastName}`
			: website?.owner?.firstName
		: 'Unknown owner';

	const userHasValidSession = Boolean(session);
	const websiteBelongsToUser = session?.user?.email === website.owner?.email;

	return (
		<Layout>
			<Link href={`/user/${website.owner?.id}`}>
				<a className='bold' data-active={isActive(`/user/${website.owner?.id}`)}>
					Go Back
				</a>
			</Link>
			<div>
				<h2>
					[{website?.public ? 'Public' : 'Private'}] {website.title}
				</h2>
				<p onClick={() => (website?.owner?.id ? Router.push('/user/[id]', `/user/${website.owner?.id}`) : {})}>
					By {authorName}
				</p>
				<ReactMarkdown children={website.url} />
				{(userHasValidSession && websiteBelongsToUser) ?? (
					<>
						<button onClick={() => Router.push('/website/update/[id]', `/website/update/${website.id}`)}>Edit</button>
						<button onClick={() => deleteWebsite(website.id)}>Delete</button>
						{!website.public ?? <button onClick={() => publishWebsite(website.id)}>Publish</button>}
					</>
				)}
				<button
					disabled={true /* REMOVE ONCE PREVIEW CODE IS FIXED */}
					onClick={() => Router.push('/website/preview/[id]', `/website/preview/${website.id}`)}
				>
					GoTo Preview
				</button>
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

				.bold {
					font-weight: bold;
					cursor: pointer;
				}

				a {
					text-decoration: none;
					color: #000;
					display: inline-block;
				}

				.left a[data-active='true'] {
					color: gray;
				}

				a + a {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Website;
