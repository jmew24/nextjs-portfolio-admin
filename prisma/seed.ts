import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		email: 'james@jmew.ca',
		firstName: 'James',
		lastName: 'Wilson',
		websites: {
			create: [
				{
					title: `James Wilson's Portfolio`,
					url: 'www.jmew.ca',
					public: true,
				},
			],
		},
	},
	{
		email: 'jamiewalmsley529@gmail.com',
		firstName: 'Jamie',
		lastName: 'Walmsley',
	},
];

async function main() {
	await prisma.user.deleteMany();
	console.log(`Start seeding ...`);
	for (const u of userData) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Created user with id: ${user.id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
