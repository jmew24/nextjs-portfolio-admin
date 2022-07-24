export const NetworkList = ({ socials }) => {
	socials.map((network) => {
		return (
			<li key={network.name}>
				<a href={network.url}>
					<i className={network.className}></i>
				</a>
			</li>
		);
	});
};
