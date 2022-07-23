import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Create: React.FC = () => {
	const [url, setUrl] = useState('');
	const [title, setTitle] = useState('');
	const [isPublic, setIsPublic] = useState(false);

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const body = { url, title, isPublic };
			await fetch(`/api/website`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			await Router.push('/websites');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<div>
				<form onSubmit={submitData}>
					<h1>New Website</h1>
					<input
						autoFocus
						onChange={(e) => setUrl(e.target.value)}
						placeholder='wwww.url.com'
						type='text'
						value={url}
					/>
					<input onChange={(e) => setTitle(e.target.value)} placeholder='Title' type='text' value={title} />
					<input onChange={() => setIsPublic((oldValue) => !oldValue)} type='checkbox' checked={isPublic} />
					<input disabled={!url || !title} type='submit' value='Create' />
					<a className='back' href='#' onClick={() => Router.push('/')}>
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
