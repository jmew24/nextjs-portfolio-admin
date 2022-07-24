const main = {
	year: '2021',
	name: 'James Wilson',
	occupation: 'TV Production & Software Testing',
	description: 'Here you will find everything about me. Keep scrolling to see my experiences and skills',
	image: 'profilepic.jpg',
	bio: 'I am passionate about using problem-solving and teamwork to create the best productions possible that are professional and creative. I successfully integrate my skills in broadcasting and programming to provide innovative solutions. My knowledge of media production and communication highlight my ability to find alternate ways to inform and entertain audiences.',
	email: 'james@jmew.ca',
	website: 'https://www.jmew.ca',
	resumeDownload: './James_Wilson_Resume.pdf',
};

const address = {
	region: 'Toronto',
	province: 'Ontario',
	country: 'Canada',
};

const social = [
	{
		name: 'twitter',
		url: 'https://twitter.com/jmew24',
		className: 'fa fa-twitter',
	},
	{
		name: 'linkedin',
		url: 'https://www.linkedin.com/in/james-wilson-a8945334/',
		className: 'fa fa-linkedin',
	},
	{
		name: 'instagram',
		url: 'https://instagram.com/jmew24',
		className: 'fa fa-instagram',
	},
	{
		name: 'github',
		url: 'https://github.com/jmew24',
		className: 'fa fa-github',
	},
];

const general = {
	main,
	address,
	social,
};

export { main, address, social };

export default general;
