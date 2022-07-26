import { Session } from 'next-auth';

import { AccessLevel } from '../common/types/web';
import prisma from '../common/get-prisma-client';

export const getUserAccess = async (session: Session) => {
	if (!session) {
		return AccessLevel.GUEST;
	}

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
		select: {
			accessLevel: true,
		},
	});

	return user?.accessLevel ?? AccessLevel.GUEST;
};

export const isAdmin = async (session: Session) => {
	const userAccess = await getUserAccess(session);

	switch (Number(userAccess)) {
		case AccessLevel.ROOT:
		case AccessLevel.ADMIN:
			return true;
		default:
			return false;
	}
};
