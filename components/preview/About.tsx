import React from 'react';
import { useRecoilValue } from 'recoil';

import { generalState } from '../../common/recoil/states';

import Layout from '../Layout';

const AboutPage: React.FC = () => {
	const general = useRecoilValue(generalState);

	if (!general) {
		return (
			<Layout>
				<section className='page about' id='about'>
					Loading ...
				</section>
			</Layout>
		);
	}

	return (
		<Layout>
			<section className='page about' id='about'>
				<div className='row'>
					<div className='three columns'>
						<img className='profile-pic' src={`images/${general.image}`} alt='Profile Pic' />
					</div>
					<div className='nine columns main-col'>
						<h2>About Me</h2>

						<p>{general.bio}</p>
						<div className='row'>
							<div className='columns contact-details'>
								<h2>Contact Details</h2>
								<p className='address'>
									<span>
										Location: {general.region ? `${general.region} Region - ` : ''} {general.province},{' '}
										{general.country}
									</span>
									<br />
									<span>
										<a href={`mailto:${general.email}`}>{general.email}</a>
									</span>
								</p>
							</div>
							<div className='columns download'>
								<p>
									<a rel='noopener noreferrer' href={general.resumeDownload} target='_blank' className='button'>
										<i className='fa fa-download'></i>Download Resume
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<style jsx>{`
				.block {
					background: white;
					transition: box-shadow 0.1s ease-in;
				}

				.block:hover {
					box-shadow: 1px 1px 3px #aaa;
				}

				.block + .block {
					margin-top: 2rem;
				}
			`}</style>
		</Layout>
	);
};

export default AboutPage;
