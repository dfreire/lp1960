export default {
	getSiteData: () => ({
		title: 'LP1960',
	}),
	getRoutes: async () => {
		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
			},
			{
				path: '/imagens',
				component: 'src/pages/Imagens.jsx',
			},
			{
				path: '/projectos',
				component: 'src/pages/Projectos.jsx',
			},
			{
				is404: true,
				component: 'src/pages/404.jsx',
			},
		]
	},
}