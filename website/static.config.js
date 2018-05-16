const dotenv = require('dotenv')
const axios = require('axios');

const config = dotenv.config().parsed;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.DK_API_KEY}`;

export default {
	getSiteData: async () => {
		const { data: root } = await axios.get('https://conteudo.lp1960.com/api/content');
		return {
			root
		}
	},
	getRoutes: async () => {
		const { data: introPage } = await axios.get('https://conteudo.lp1960.com/api/content/0-intro');
		
		const { data: imagePage } = await axios.get('https://conteudo.lp1960.com/api/content/1-imagens');
		const { data: imageDirs } = await axios.get('https://conteudo.lp1960.com/api/dirs/1-imagens');
		
		const { data: projectsPage } = await axios.get('https://conteudo.lp1960.com/api/content/2-projectos');
		const { data: projectsDirs } = await axios.get('https://conteudo.lp1960.com/api/dirs/2-projectos');

		const imageMap = {};
		for (let i = 0; i < imageDirs.length; i++) {
			const key = imageDirs[i];
			const { data: image } = await axios.get('https://conteudo.lp1960.com/api/content/1-imagens/' + key);
			imageMap[key] = image;
		}

		const projectsMap = {};
		for (let i = 0; i < projectsDirs.length; i++) {
			const key = projectsDirs[i];
			const { data: project } = await axios.get('https://conteudo.lp1960.com/api/content/2-projectos/' + key);
			projectsMap[key] = project;
		}

		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
				getData: () => ({
					introPage,
				}),
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