import React from 'react';
import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import { PreviewProps } from '../../components/Preview';
import prisma from '../../lib/prisma';
import { useSession } from 'next-auth/react';

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

const Preview: React.FC<PreviewProps> = (props) => {
	const { data: session, status } = useSession();
	const authorName = props?.owner?.firstName
		? props?.owner?.lastName
			? `${props?.owner?.firstName} ${props?.owner?.lastName}`
			: props?.owner?.firstName
		: 'Unknown owner';

	if (status === 'loading') {
		return <div>Authenticating ...</div>;
	}
	let title = props.title;

	return (
		<Layout>
			<div>
				<h2>{title}</h2>
				<p>By {authorName}</p>
				<ReactMarkdown children={props.url} />
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

export default Preview;
