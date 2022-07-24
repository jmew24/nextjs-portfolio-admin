import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { WebsiteProps } from '../../components/Website';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const website = await prisma.website.findUnique({
		where: {
			id: Number(params?.id) || -1,
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
		props: website,
	};
};

async function publishWebsite(id: number): Promise<void> {
	await fetch(`/api/website/publish/${id}`, {
		method: 'PUT',
	});
	await Router.push('/');
}

async function deleteWebsite(id: number): Promise<void> {
	await fetch(`/api/website/${id}`, {
		method: 'DELETE',
	});
	await Router.push('/');
}

const Website: React.FC<WebsiteProps> = (props) => {
	const router = useRouter();
	const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

	const { data: session, status } = useSession();
	const authorName = props?.owner?.firstName
		? props?.owner?.lastName
			? `${props?.owner?.firstName} ${props?.owner?.lastName}`
			: props?.owner?.firstName
		: 'Unknown owner';

	if (status === 'loading') {
		return <div>Authenticating ...</div>;
	}
	const userHasValidSession = Boolean(session);
	const websiteBelongsToUser = session?.user?.email === props.owner?.email;
	let title = props.title;

	return (
		<Layout>
			<Link href={`/user/${props.owner?.id}`}>
				<a className='bold' data-active={isActive(`/user/${props.owner?.id}`)}>
					Go Back
				</a>
			</Link>
			<div>
				<h2>{title}</h2>
				<p onClick={() => (props?.owner?.id ? Router.push('/user/[id]', `/user/${props.owner?.id}`) : {})}>
					By {authorName}
				</p>
				<ReactMarkdown children={props.url} />
				{(userHasValidSession && websiteBelongsToUser) ?? (
					<>
						<button onClick={() => Router.push('/website/update/[id]', `/website/update/${props.id}`)}>Edit</button>
						<button onClick={() => deleteWebsite(props.id)}>Delete</button>
						{!props.public ?? <button onClick={() => publishWebsite(props.id)}>Publish</button>}
					</>
				)}
				<button onClick={() => Router.push('/website/preview/[id]', `/website/preview/${props.id}`)}>
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
