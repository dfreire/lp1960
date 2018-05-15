import React from 'react'
import { withSiteData } from 'react-static'

export default withSiteData((props) => (
	<div>
		<h1>Home</h1>
		{JSON.stringify(props)}
	</div>
))
