import React from 'react'
import { withSiteData, withRouteData } from 'react-static'

export default withSiteData(withRouteData((props) => (
	<div>
		<img src={props.src} alt="" />
	</div>
)))
