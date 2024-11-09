import http from 'http';
import fs from 'fs';
const server = http.createServer((req, res) => {
  console.log(req.url);

  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write('<h1>Hola mundo!!</h1>');
  // res.end();

  // const data = { name: 'Samuel Pérez', age: 30, city: 'Cuenca' };
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify(data));

  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
    return;
  }
  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  } else if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  }
  const cssFile = fs.readFileSync(`./public${req.url}`, 'utf-8');
  res.end(cssFile);
});

server.listen(8080, () => {
  console.log('Server running');
});
