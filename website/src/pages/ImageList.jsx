import React from 'react'
import { Link, withSiteData, withRouteData } from 'react-static'
const path = require('path');

export default withSiteData(withRouteData((props) => (
	<div>
		{props.images.map((image, i) => {
			return (
				<Link key={i} to={image.href}>
					<img src={image.src} alt="" />
				</Link>
			);
		})}
	</div>
)))
