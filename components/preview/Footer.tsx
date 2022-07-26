import React from 'react';
import { useRecoilValue } from 'recoil';

import { generalState } from '../../common/recoil/states';

const FooterPage: React.FC = () => {
	const general = useRecoilValue(generalState);

	if (!general) {
		return <footer>Loading ...</footer>;
	}

	return (
		<footer>
			<div className='row'>
				<div className='twelve columns'>
					<ul className='social-links'>
						{general?.socials?.map((social) => {
							return (
								<li key={social.name}>
									<a href={social.url}>
										<i className={social.className}></i>
									</a>
								</li>
							);
						})}
					</ul>

					<ul className='copyright'>
						<li>
							&copy; Copyright {general.year} {general.name}
						</li>
						<li>
							Design by{' '}
							<a title='Styleshout' href='http://www.styleshout.com/'>
								Styleshout
							</a>
						</li>
					</ul>
				</div>
				<div id='go-top'>
					<a className='smoothscroll' title='Back to Top' href='#home'>
						<i className='icon-up-open'></i>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default FooterPage;
