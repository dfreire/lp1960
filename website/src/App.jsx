import React from 'react'
import { Router, Link, withRouter, withSiteData } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

const links = [
	{ to: '/intro', name: 'intro' },
	{ to: '/imagens', name: 'imagens' },
	{ to: '/projectos', name: 'projectos' },
];

const App = () => (
	<Router>
		<AppContent />
	</Router>
);

const AppContent = withRouter(withSiteData((props) => {
	links.forEach(link => link.className = props.location.pathname.startsWith(link.to) ? classes.navLinkActive : classes.navLink);

	return (
		<div className={classes.page}>
			<div className={classes.headerBlock1}>
				<div className={classes.headerBlock2}>
					<div className={classes.header}>
						<div className={classes.navLeft}>
							<Link className={classes.brand} to="/">{props.title}</Link>
						</div>
						<ul className={classes.navRight}>
							{links.map(link => (
								<li key={link.name} className={classes.navRightItem}>
									<Link className={link.className} to={link.to}>{link.name}</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className={classes.contentBlock}>
				<div className={classes.content}>
					<Routes />
				</div>
			</div>

			<div className={classes.footerBlock}>
				<div className={classes.footer}>
					<a className={classes.footerLink} href="mailto:info@lp1960.com">info@lp1960.com</a>
				</div>
			</div>
		</div>
	);
}));

const classes = {
	page: "w-full h-full",

	headerBlock1: "bg-grey-lightest pb-4",
	headerBlock2: "bg-white py-2 shadow-md",
	header: "container mx-auto p-2 max-w-lg flex items-center",

	navLeft: "flex-1 list-reset",
	navLeftItem: "inline-block mr-8",

	navCenter: "flex-1 text-center",

	navRight: "flex-1 list-reset text-right flex justify-end",
	navRightItem: "inline-block px-2 text-center",

	brand: "brand text-black no-underline text-4xl font-black",
	navLink: "no-underline px-3 py-2 lowercase font-light text-grey-dark rounded border border-white hover:border-grey-light",
	navLinkActive: "no-underline px-3 py-2 lowercase font-light text-grey-lightest bg-blue rounded",

	contentBlock: "contentBlock py-4",
	content: "container mx-auto px-2 max-w-lg",

	footerBlock: "footerBlock bg-grey-darkest w-full py-4",
	footer: "container mx-auto px-2 max-w-lg text-center",
	footerLink: "no-underline text-grey-light text-sm hover:text-white",
};

export default hot(module)(App)
