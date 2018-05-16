const dotenv = require('dotenv')
const axios = require('axios');
const path = require('path');

const config = dotenv.config().parsed;

axios.defaults.headers.common['Authorization'] = `Bearer ${config.DK_API_KEY}`;

export default {
	getSiteData: async () => {
		const {
			data: root
		} = await axios.get('https://conteudo.lp1960.com/api/content');
		return {
			title: root.fields.title_pt,
		}
	},
	getRoutes: async () => {
		const {
			data: introPage
		} = await axios.get('https://conteudo.lp1960.com/api/content/0-intro');

		const {
			data: imagesPage
		} = await axios.get('https://conteudo.lp1960.com/api/content/1-imagens');
		const {
			data: imageDirs
		} = await axios.get('https://conteudo.lp1960.com/api/dirs/1-imagens');

		const {
			data: projectsPage
		} = await axios.get('https://conteudo.lp1960.com/api/content/2-projectos');
		const {
			data: projectDirs
		} = await axios.get('https://conteudo.lp1960.com/api/dirs/2-projectos');

		// https://conteudo.lp1960.com/api/files/1-imagens/1-b/brina-blum-275955-unsplash.jpg?w=800

		const imageList = [];
		for (let i = 0; i < imageDirs.length; i++) {
			const dir = imageDirs[i];
			const {
				data: image
			} = await axios.get('https://conteudo.lp1960.com/api/content/1-imagens/' + dir);
			image.baseUrl = 'https://conteudo.lp1960.com/api/files/1-imagens/' + dir;
			imageList.push(image);
		}

		const projectList = [];
		for (let i = 0; i < projectDirs.length; i++) {
			const dir = projectDirs[i];
			const {
				data: image
			} = await axios.get('https://conteudo.lp1960.com/api/content/2-projectos/' + dir);
			image.baseUrl = 'https://conteudo.lp1960.com/api/files/2-projectos/' + dir;
			projectList.push(image);
		}

		return [{
				path: '/',
				component: 'src/pages/Home.jsx',
			}, {
				path: '/intro',
				component: 'src/pages/Intro.jsx',
				getData: () => ({
					text: introPage.fields.text,
				}),
			},
			{
				path: '/imagens',
				component: 'src/pages/ImageList.jsx',
				getData: () => {
					const images = imageList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/imagens/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
						}));
					return {
						images,
					}
				},
				children: imageList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			},
			{
				path: '/projectos',
				component: 'src/pages/ImageList.jsx',
				getData: () => {
					const images = projectList
						.filter(item => item.fields.image != null)
						.map((item, i) => ({
							href: `/projectos/${i}`,
							src: `${item.baseUrl}/${item.fields.image}`,
						}));
					return {
						images,
					}
				},
				children: projectList.map((item, i) => ({
					path: `/${i}`,
					component: 'src/pages/Image.jsx',
					getData: () => ({
						src: `${item.baseUrl}/${item.fields.image}`,
					})
				})),
			},
			{
				is404: true,
				component: 'src/pages/404.jsx',
			},
		]
	},
}