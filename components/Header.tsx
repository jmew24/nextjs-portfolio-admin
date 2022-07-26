import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { UserProps } from '../common/types/web';

const Header: React.FC = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [userId, setUserId] = useState('');
	const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname;

	useEffect(() => {
		if (session && session.user) {
			const user = session.user as UserProps;
			setUserId(user.id);
		}
	}, [session]);

	let left = (
		<div className='left'>
			<Link href='/'>
				<a className='bold' data-active={isActive('/')}>
					Home
				</a>
			</Link>
			<style jsx>{`
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
		</div>
	);

	let right = null;

	if (status === 'loading') {
		right = (
			<div className='right'>
				<p>Validating session ...</p>
				<style jsx>{`
					.right {
						margin-left: auto;
					}
				`}</style>
			</div>
		);
	}

	if (!session) {
		right = (
			<div className='right'>
				<Link href='/api/auth/signin'>
					<a data-active={isActive('/api/auth/signin')}>Log in</a>
				</Link>
				<style jsx>{`
					a {
						text-decoration: none;
						color: #000;
						display: inline-block;
					}

					a + a {
						margin-left: 1rem;
					}

					.right {
						margin-left: auto;
					}

					.right a {
						border: 1px solid black;
						padding: 0.5rem 1rem;
						border-radius: 3px;
					}
				`}</style>
			</div>
		);
	} else if (session) {
		right = (
			<div className='right'>
				<p>
					{session.user.name} ({session.user.email})
				</p>
				{userId && (
					<Link href={`/user/${userId}`}>
						<button disabled={isActive(`/user/${userId}`)}>
							<a data-active={isActive(`/user/${userId}`)}>My websites</a>
						</button>
					</Link>
				)}
				<Link href='/create'>
					<button>
						<a>New website</a>
					</button>
				</Link>
				<button onClick={() => signOut()}>
					<a>Log out</a>
				</button>
				<style jsx>{`
					a {
						text-decoration: none;
						color: #000;
						display: inline-block;
					}

					p {
						display: inline-block;
						font-size: 13px;
						padding-right: 1rem;
					}

					a + a {
						margin-left: 1rem;
					}

					.right {
						margin-left: auto;
					}

					.right a {
						border: 1px solid black;
						padding: 0.5rem 1rem;
						border-radius: 3px;
					}

					button {
						border: none;
					}
				`}</style>
			</div>
		);
	}

	return (
		<nav>
			{left}
			{right}
			<style jsx>{`
				nav {
					display: flex;
					padding: 2rem;
					align-items: center;
				}

				button:disabled {
					cursor: not-allowed;
					pointer-events: all !important;
				}

				button:disabled a {
					cursor: not-allowed;
					pointer-events: all !important;
				}

				a:disabled {
					cursor: not-allowed;
					pointer-events: all !important;
				}
			`}</style>
		</nav>
	);
};

export default Header;
