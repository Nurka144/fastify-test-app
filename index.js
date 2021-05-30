const pino = require('pino')
const fastify = require('fastify')({
    logger: {
        level: 'info',
        file: pino.destination('./log/app.log') 
      }
});

// fastify.get('/', {
//     schema: {
//       response: {
//         401: {
//           type: 'object',
//           properties: {
//             statusCode: { type: 'number' },
//             code: { type: 'string' },
//             error: { type: 'string' },
//             message: { type: 'string' },
//             time: { type: 'string' }
//           }
//         }, 
//         200: {
//             type: 'object',
//             properties: {
//                 data: { 
//                     type: 'object',
//                     properties: {
//                         message: {type: 'string'},
//                         id: {type: 'number'}
//                     }
//                 }, 
//                 errCode: {type: 'number'}
//             }
//         }
//       }
//     }
//   }, async function (request, reply) {
//     // const error = new Error('Ошибка сервера')
//     // error.time = '1s'
//     // reply.code(401).send(error)
//     await new Promise(function (resolve, reject) {setTimeout(() => resolve('done'), 10000)})
//     return {
//         data: {message: 'done', id: 1},
//         errCode: 0
//     }
// })


fastify.register((instance, opts, next) => {

    instance.get('/', (req, res) => { res.send(req.raw.method); req.log.info('some log') })
    instance.post('/', (req, res) => { res.send(req.raw.method) })
    instance.put('/', (req, res) => { res.send(req.raw.method) })
    instance.patch('/', (req, res) => { res.send(req.raw.method) })
  
    instance.get('/other', (req, res) => { res.send('other code') })
  
    next()
  }, { prefix: 'user' })

const app = fastify;

module.exports = app;

fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})