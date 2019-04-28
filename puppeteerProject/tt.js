const puppeteer = require('puppeteer-core');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
// const savePath = '/screenshots/';
const savePath = '/Users/zhengshibin/Desktop/wonderfull_app/app/app/backend/www/resource/img/mt/';
const port = 8668;
const crypto = require('crypto');
// const target = 'https://backend.wandougongzhu.cn/magicTpl/render';
const target = 'http://backend.inagora.org/magicTpl/render';
let browser = null;

function md5(input) {
	return crypto
		.createHash('md5')
		.update(input)
		.digest('hex');
}

function send500(res) {
	res.writeHead(500, {
		'content-type': 'text/plain; charset=utf-8'
	});
	res.end('');
}

async function takePhoto(page, url, data, file) {
	await page.setViewport({
		width: 1242,
		height: 765
	});

	// 等待页面加载完毕
	await page.goto(url, {
		waitUntil: 'load'
	});

	function doCut() {
		return new Promise((resolve, reject) => {
			let rCount = 0; // 请求数
			let tid = null;
			page.on('request', () => {
				rCount++;
				clearTimeout(tid);
			});
			page.on('requestfinished', () => {
				if (rCount === 0) {
					return;
				}
				rCount--;
				setTimeout(() => {
					if (rCount <= 0) {
						resolve();
					}
				}, 500);
			});
			page.on('requestfailed', (err) => {
				reject(err);
			});
			tid = setTimeout(() => {
				resolve();
			}, 500);
		});
	}

	let loading = doCut();

	await page.evaluate((card) => {
		app.card = JSON.parse(card);
	}, data);

	await loading;

	// 计算裁剪区域
	let clip = await page.evaluate(() => {
		let card = document.querySelector('.x-card');
		let rect = card.getBoundingClientRect();

		return {
			x: rect.left,
			y: rect.top,
			width: rect.width,
			height: rect.height
		};
	});

	await page.screenshot({
		path: file,
		type: 'png',
		omitBackground: true,
		clip
	});
}

(async () => {
	try {
		browser = await puppeteer.launch({
			headless: false,
			executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome',
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const server = http.createServer(async (req, res) => {

			try {
				let params = url.parse(req.url);
				let path = params.path;
				if (req.method === 'POST') {
					if (path === '/takeme') {
						let body = ''; // 接受post参数
						req.on('data', (chunk) => {
							body += chunk;
						});
						req.on('end', async () => {
							try {
								console.log(body);
								let post = querystring.parse(body);
								let { id, data } = post;

								if (id && data) {
									data = decodeURIComponent(data);
									
									console.log(data);
									let page = await browser.newPage();
									let curl = `${target}?id=${id}`;
									let filename = `${md5(curl + data)}.png`;
									let file = `${savePath}${filename}`;
									try {
										await takePhoto(page, `${target}?id=${id}`, data, file);
										console.log(filename);
										res.end(filename);
									} catch (err) {
										console.log(err);
									}
									await page.close();
									res.end('');
								}
								send500(res);
							} catch(err) {
								console.error(err);
								send500(res);
							}
						});
						return;
					}
				}
				send500(res);
			} catch(err) {
				console.error(err);
				send500(res);
			}
		});

		server.on('clientError', (err, socket) => {
			socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
		});
		server.listen(port);

		console.info(`MTC waiting for your coming on ${port}`);
	} catch (err) {
		console.error(err);
	}
})();