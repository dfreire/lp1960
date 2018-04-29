import React from 'react'
import { Router, Link, withRouter } from 'react-static'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'

const links = [
	{ to: '/', name: 'intro' },
	{ to: '/imagens', name: 'imagens' },
	{ to: '/projectos', name: 'projectos' },
];

const App = () => (
	<Router>
		<AppContent />
	</Router>
);

const AppContent = withRouter((props) => {
	links.forEach(link => link.className = link.to === props.location.pathname ? classes.navLinkActive : classes.navLink);

	return (
		<div className={classes.page}>
			{console.log('props', props)}
			<div className={classes.headerBlock}>
				<div className={classes.header}>
					<div className={classes.navLeft}>
						<Link className={classes.brand} to="/">LP1960</Link>
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
			<div className={classes.contentBlock}>
				<div className={classes.content}>
					<Routes />
				</div>
			</div>
		</div>
	);
});


const classes = {
	page: "h-full bg-grey-lightest",

	headerBlock: "bg-white py-2 shadow-md border-b mb-3",
	header: "container mx-auto px-2 max-w-lg flex items-center",

	navLeft: "flex-1 list-reset",
	navLeftItem: "inline-block mr-8",

	navCenter: "flex-1 text-center",

	navRight: "flex-1 list-reset text-right flex justify-end",
	navRightItem: "inline-block px-2 text-center",

	contentBlock: "py-4",
	content: "container mx-auto px-2 max-w-lg ",

	brand: "brand text-black no-underline text-5xl font-black",
	navLink: "no-underline lowercase font-light text-grey-dark hover:uppercase hover:font-normal",
	navLinkActive: "no-underline text-black uppercase font-normal",
};

export default hot(module)(App)
