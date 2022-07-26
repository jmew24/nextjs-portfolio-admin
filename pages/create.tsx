import React, { useState } from 'react';
import Router from 'next/router';

import { WebsiteProps } from '../common/types/web';

import Layout from '../components/Layout';

const Create = () => {
	const [state, setState] = useState({ url: '', title: '', isPublic: false });
	const [errorState, setErrorState] = useState({ url: { invalid: false, message: '' } });

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/website`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(state),
			});
			if (response.status === 200) {
				const data = (await response.json()) as WebsiteProps;
				if (data) {
					Router.push('/website/[id]', `/website/${data.id}`);
				}
			} else {
				const data = await response.json();
				setErrorState((prevState) => ({ ...prevState, url: { invalid: true, message: data?.message } }));
			}
		} catch (error) {
			console.error(error);
		}
	};

	const urlError = () => {
		if (errorState.url.invalid) {
			return <span className='error'>(Error: You must select a unique url)</span>;
		} else {
			return <></>;
		}
	};

	return (
		<Layout>
			<div>
				<form onSubmit={submitData}>
					<h1>New Website</h1>
					<label htmlFor='url'>Url: {urlError()}</label>
					<input
						id='url'
						onChange={(e) => {
							setState((prevState) => ({ ...prevState, url: e.target.value }));
							if (errorState.url.invalid)
								setErrorState((prevState) => ({ ...prevState, url: { invalid: false, message: '' } }));
						}}
						placeholder='wwww.url.com'
						type='text'
						value={state.url}
						autoFocus
					/>
					<label htmlFor='title'>Title: </label>
					<input
						id='title'
						onChange={(e) => setState((prevState) => ({ ...prevState, title: e.target.value }))}
						placeholder='Title'
						type='text'
						value={state.title}
					/>
					<label htmlFor='isPublic'>IsPublic: </label>
					<input
						id='isPublic'
						onChange={() => setState((prevState) => ({ ...prevState, isPublic: !prevState.isPublic }))}
						type='checkbox'
						checked={state.isPublic}
					/>
					<footer>
						<input disabled={!state.url || !state.title} type='submit' value='Create' />
						<a className='back' href='#' onClick={() => Router.push('/')}>
							or Cancel
						</a>
					</footer>
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
					cursor: pointer;
				}

				footer {
					padding: 2rem 0rem;
				}

				.back {
					margin-left: 1rem;
				}

				.error {
					color: darkred;
				}
			`}</style>
		</Layout>
	);
};

export default Create;
