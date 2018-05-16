import React from 'react'
import { withSiteData, withRouteData } from 'react-static'
const md = require('markdown-it')('commonmark');

export default withSiteData(withRouteData((props) => (
	<div>
		<h1>{props.introPage.fields.title_pt}</h1>
		<div dangerouslySetInnerHTML={{ __html: md.render(props.introPage.fields.text) }} />
	</div>
)))
