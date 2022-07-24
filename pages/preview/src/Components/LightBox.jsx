import React, { useState, useRef, useEffect } from 'react';

import Lightbox from 'react-image-lightbox';
import '../Styles/lightbox.css';

const LightBox = (props) => {
	const [state, setState] = useState({
		id: props.id ? props.id : 'lightBox-ID',
		source: props.source ? props.source : 'none',
		isOpen: false,
		photoIndex: 0,
		images: props.images ? props.images : [],
	});
	const curImage = state.images[state.photoIndex];
	let _isMounted = useRef(false);
	let _curId = useRef('');

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const handleIdChange = (event) => {
		if (!state.isOpen) {
			if (_curId.current === '') {
				const curId = event.detail.id();
				if (curId === `${state.source}-${state.id}`) {
					_curId.current = curId;
					setState((prevState) => ({
						...prevState,
						isOpen: true,
					}));
				}
			} else {
				_curId.current = '';
			}
		}
	};

	useEffect(() => {
		_isMounted.current = true;

		return () => {
			_isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		window.addEventListener('id_change', handleIdChange);

		return () => {
			window.removeEventListener('id_change', handleIdChange);
		};
	}, [handleIdChange]);

	useEffect(() => {
		if (!_isMounted.current) return;

		if (!state.isOpen) {
			_curId.current = '';
			window.dispatchEvent(new Event('nav-reset'));
		}
	}, [state.isOpen]);

	return (
		<div
			className='item-wrap clickable'
			onClick={() =>
				setState((prevState) => ({
					...prevState,
					isOpen: true,
				}))
			}
		>
			<img alt={props.title ? props.title : ''} src={state.images[0].src} />{' '}
			<div className='overlay'>
				<div className='gallery-item-meta'>
					<h5>{props.title}</h5>
					<p>Click to view photo gallery</p>
				</div>
			</div>
			{state.isOpen && (
				<Lightbox
					enableZoom={false}
					imageTitle={props.title ? props.title : ''}
					imageCaption={curImage.description ? curImage.description : ''}
					mainSrc={curImage.src}
					nextSrc={state.images[(state.photoIndex + 1) % state.images.length].src}
					prevSrc={state.images[(state.photoIndex + state.images.length - 1) % state.images.length].src}
					onCloseRequest={() =>
						_isMounted.current &&
						setState((prevState) => ({
							...prevState,
							isOpen: false,
						}))
					}
					onMovePrevRequest={() =>
						_isMounted.current &&
						setState((prevState) => ({
							...prevState,
							photoIndex: (state.photoIndex + state.images.length - 1) % state.images.length,
						}))
					}
					onMoveNextRequest={() =>
						_isMounted.current &&
						setState((prevState) => ({
							...prevState,
							photoIndex: (state.photoIndex + 1) % state.images.length,
						}))
					}
				/>
			)}
		</div>
	);
};

export default LightBox;
