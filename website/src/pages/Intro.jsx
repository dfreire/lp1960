import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
const md = require('markdown-it')('commonmark');

export default withSiteData(withRouteData((props) => (
	<div>
		<div dangerouslySetInnerHTML={{ __html: md.render(props.text) }} />
	</div>
)))
