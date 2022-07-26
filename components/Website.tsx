import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';

import { WebsiteProps } from '../common/types/web';

const WebsitePage: React.FC<{ website: WebsiteProps }> = ({ website }) => {
	const authorName = website?.owner?.firstName
		? website?.owner?.lastName
			? `${website?.owner?.firstName} ${website?.owner?.lastName}`
			: website?.owner?.firstName
		: 'Unknown owner';

	return (
		<div onClick={() => Router.push('/website/[id]', `/website/${website.id}`)}>
			<h2>
				[{website?.public ? 'Public' : 'Private'}]{website.title}....
			</h2>

			<small>By {authorName}</small>
			<ReactMarkdown children={website.url} />
			<style jsx>{`
				div {
					color: inherit;
					padding: 0.5rem;
				}
			`}</style>
		</div>
	);
};

export default WebsitePage;
