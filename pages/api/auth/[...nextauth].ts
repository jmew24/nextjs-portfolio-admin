import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { prisma } from '../../../common/server/get-prisma-client';
import { getUserByCredentials } from '../../../common/server/prisma-user';

export const getHash = async (password: string) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(password, salt);
};

export const isMatch = async (password: string, hash: string) => await bcrypt.compare(password, hash);

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	session: { strategy: 'jwt' },
	jwt: { secret: process.env.SECRET },
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			//name: `you're email and given password`,
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'email@email.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				const user = await getUserByCredentials(credentials);

				if (user) {
					// Check if the password was correct
					const passwordMatch = await isMatch(credentials?.password, user.password);
					delete user.password;
					if (passwordMatch) {
						return user;
					}
					return null;
				} else {
					// If you return null then an error will be displayed advising the user to check their details.
					return null;
					// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
				}
			},
		}),
	],
	/*
	pages: {
		signIn: '/auth/signin',
		signOut: '/auth/signout',
		error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/auth/verify-request', // (used for check email message)
		newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
	},
		*/
	callbacks: {
		async signIn({ user, account, credentials }) {
			await prisma.account.upsert({
				where: {
					provider_providerAccountId: {
						provider: 'credentials',
						providerAccountId: account.providerAccountId,
					},
				},
				update: {
					type: account.type,
					provider: account.provider,
				},
				create: {
					userId: user.id,
					type: account.type,
					provider: account.provider,
					providerAccountId: account.providerAccountId,
					refresh_token: account?.refresh_token,
					access_token: account?.access_token ?? String(credentials?.csrfToken),
					expires_at: account?.expires_at,
					token_type: account?.token_type,
					scope: account?.scope,
					id_token: account?.id_token,
					session_state: account?.session_state,
				},
			});
			return true;
		},
		async redirect({ baseUrl }) {
			return baseUrl;
		},
		async jwt({ token, user }) {
			const isUserSignedIn = user ? true : false;
			if (isUserSignedIn) {
				token.id = user.id.toString();
				token.user = user;
			}
			return token;
		},
		async session({ session, user, token }) {
			const isUserSignedIn = user ? true : false;
			if (isUserSignedIn) {
				const encodedToken = jwt.sign(token, process.env.SECRET, { algorithm: 'HS256' });
				session.id = token.id;
				session.token = encodedToken;
				prisma.session.upsert({
					where: {
						id: String(session.id),
						sessionToken: encodedToken,
					},
					update: {
						sessionToken: encodedToken,
						expires: session.expires,
					},
					create: {
						id: String(session.id),
						sessionToken: encodedToken,
						expires: session.expires,
						userId: user.id,
					},
				});
			}
			if (token.user) session.user = token.user as any;
			else if (user) session.user = user;

			return session;
		},
	},
	logger: {
		error(code, metadata) {
			console.error(code, metadata);
		},
		warn(code) {
			console.warn(code);
		},
		debug(code, metadata) {
			console.debug(code, metadata);
		},
	},
	theme: {
		colorScheme: 'dark', // "auto" | "dark" | "light"
	},
};

export default NextAuth(authOptions);
