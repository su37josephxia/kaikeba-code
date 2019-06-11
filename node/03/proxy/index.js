const api = require('./api')
const proxy = require('./proxy')
api.listen(4000)
proxy.listen(3000)