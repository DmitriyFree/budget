const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server.json');
const middlewares = jsonServer.defaults({
  static: './dist'
});
const PORT = 'https://mybudgetproject.herokuapp.com';
server.use(middlewares);
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}))
server.use(router);
server.listen(PORT, () => {
  console.log('Server is running');
});
