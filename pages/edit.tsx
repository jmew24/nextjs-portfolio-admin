import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import { WebsiteProps } from '../common/types/web';

import Layout from '../components/Layout';

const Create: React.FC<{ website: WebsiteProps }> = ({ website }) => {
	const [websiteSettings, setWebsiteSettings] = useState({} as WebsiteProps);

	useEffect(() => {
		setWebsiteSettings(website);
	}, [website]);

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			await fetch(`/api/website/update/${websiteSettings.id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(websiteSettings),
			});
			await Router.push('/websites');
		} catch (error) {
			console.error(error);
		}
	};

	if (!websiteSettings) {
		return (
			<Layout>
				<div>Loading ...</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div>
				<form onSubmit={submitData}>
					<h1>Edit Website</h1>
					<section id='base-settings'>
						<h3>Base Settings</h3>

						<input
							autoFocus
							onChange={(e) => setWebsiteSettings({ ...websiteSettings, url: e.target.value })}
							placeholder='wwww.url.com'
							type='text'
							value={websiteSettings.url}
						/>
						<input
							onChange={(e) => setWebsiteSettings({ ...websiteSettings, title: e.target.value })}
							placeholder='Title'
							type='text'
							value={websiteSettings.title}
						/>
						<input
							onChange={() => setWebsiteSettings({ ...websiteSettings, public: !websiteSettings.public })}
							type='checkbox'
							checked={websiteSettings.public}
						/>
					</section>

					<input disabled={!websiteSettings.url || !websiteSettings.title} type='submit' value='Save' />
					<a className='back' href='#' onClick={() => Router.push('/website/[id]', `/website/${websiteSettings.id}`)}>
						or Cancel
					</a>
				</form>
			</div>
			<style jsx>{`
				.page {
					background: white;
					padding: 3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				input[type='text'],
				textarea {
					width: 100%;
					padding: 0.5rem;
					margin: 0.5rem 0;
					border-radius: 0.25rem;
					border: 0.125rem solid rgba(0, 0, 0, 0.2);
				}

				input[type='submit'] {
					background: #ececec;
					border: 0;
					padding: 1rem 2rem;
				}

				.back {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Create;
