const url = require('url')
const fs = require('fs')

module.exports = (req, res) => {
	const pathname = url.parse(req.url).pathname
	switch(pathname) {
		case '/dist/bundle.js':
			res.writeHead(200, { 'Content-Type': 'application/javascript' })
      fs.createReadStream('./dist/bundle.js').pipe(res);
			break
		default:
			res.writeHead(200, {
				'Content-Type': 'text/html',
				'Link': '<http://localhost:80/dist/bundle.js>; rel="fragment-script"'
			})
			return res.end('')
	}
}
