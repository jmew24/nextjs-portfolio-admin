import React, { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { filteredGalleriesState } from '../../common/recoil/states';

import LightBox from './LightBox';

const GalleryPage: React.FC = () => {
	const productionGalleryState = useRecoilValue(filteredGalleriesState(0));
	const codingGalleryState = useRecoilValue(filteredGalleriesState(1));

	if (!productionGalleryState && !codingGalleryState) {
		return <div>Loading ...</div>;
	}

	const productionGallery = useMemo(
		() =>
			productionGalleryState.map((gallery, index) => {
				const prefixUrl = `images/portfolio/production/gallery/${gallery.id}`;
				const images = gallery.images.map((image) => {
					return image.file
						? Object.assign(
								{},
								{
									src: `${prefixUrl}/${image.file}`,
									description: image.description ? image.description : '',
								},
						  )
						: null;
				});
				return images.length > 0 ? (
					<div
						key={`gallery-production-${gallery.id}-${index}`}
						id={`gallery-production-${gallery.id}`}
						className='columns gallery-item'
					>
						<LightBox
							key={`gallery-lightbox-production-${gallery.id}-${index}`}
							id={gallery.id}
							source={'gallery-production'}
							title={gallery.title}
							images={images}
						/>
					</div>
				) : null;
			}),
		[productionGalleryState],
	);
	const codingGallery = useMemo(
		() =>
			codingGalleryState.map((gallery, index) => {
				const prefixUrl = `images/portfolio/coding/gallery/${gallery.id}`;
				const images = gallery.images.map((image) => {
					return image.file
						? Object.assign(
								{},
								{
									src: `${prefixUrl}/${image.file}`,
									description: image.description ? image.description : '',
								},
						  )
						: null;
				});
				return images.length > 0 ? (
					<div
						key={`gallery-coding-${gallery.id}-${index}`}
						id={`gallery-coding-${gallery.id}`}
						className='columns gallery-item'
					>
						<LightBox
							key={`gallery-lightbox-production-${gallery.id}-${index}`}
							id={gallery.id}
							source={'gallery-coding'}
							title={gallery.title}
							images={images}
						/>
					</div>
				) : null;
			}),
		[codingGalleryState],
	);

	return productionGallery.length > 0 || codingGallery.length > 0 ? (
		<div className='row' id='gallery'>
			<div className='twelve columns collapsed'>
				<h1>Check Out My Photo Gallery</h1>

				<div className='gallery-wrapper bgrid-quarters s-bgrid-thirds cf'>{productionGallery}</div>

				<div className='gallery-wrapper bgrid-quarters s-bgrid-thirds cf'>{codingGallery}</div>
			</div>
		</div>
	) : null;
};

export default GalleryPage;
