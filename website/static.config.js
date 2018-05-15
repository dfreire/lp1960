const dotenv = require('dotenv')
const axios = require('axios');

const config = dotenv.config().parsed;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.DK_API_KEY}`;

export default {
	getSiteData: () => ({
		title: 'LP1960',
	}),
	getRoutes: async () => {
		const { data: root } = await axios.get('https://conteudo.lp1960.com/api/content');
		const { data: intro } = await axios.get('https://conteudo.lp1960.com/api/content/0-intro');
		const { data: imagens } = await axios.get('https://conteudo.lp1960.com/api/content/1-imagens');
		const { data: imagensDirs } = await axios.get('https://conteudo.lp1960.com/api/dirs/1-imagens');
		const { data: projectos } = await axios.get('https://conteudo.lp1960.com/api/content/2-projectos');
		const { data: projectosDirs } = await axios.get('https://conteudo.lp1960.com/api/dirs/2-projectos');
		console.log('\nroot', root);
		console.log('\nintro', intro);
		console.log('\nimagens', imagens);
		console.log('\nimagensDirs', imagensDirs);
		console.log('\nprojectos', projectos);
		console.log('\nprojectosDirs', projectosDirs);

		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
				getData: () => ({
					root, intro,
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