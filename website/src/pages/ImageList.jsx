import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
const path = require('path');

export default withSiteData(withRouteData((props) => (
	<div>
		{props.images.map((image, i) => {
			return (
				<a key={i} href={image.href}>
					<img src={image.src} alt="" />
				</a>
			);
		})}
	</div>
)))
