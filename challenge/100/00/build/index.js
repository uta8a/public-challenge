import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

import websocketPlugin from '@fastify/websocket';
import fastifyStatic from '@fastify/static'
import * as url from 'url';

// click more than 1000000 times!
const CLICK_MAX = 1000000

function filterInt(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
        return Number(value)
    } else {
        return NaN
    }
}

fastify.register(websocketPlugin)
fastify.register(fastifyStatic, { root: url.fileURLToPath(new URL('.', import.meta.url)) });

fastify.register(async function () {
    fastify.route({
        method: 'GET',
        url: '/',
        handler: (req, reply) => {
            reply.sendFile('./public/index.html');
        },
        wsHandler: (conn, req) => {
            conn.setEncoding('utf-8')
            conn.socket.on('message', message => {
                const data = filterInt(message.toString());
                console.log(data)
                if (isNaN(data)) {
                    const reply = { message: null, error: 'not a number' }
                    conn.socket.send(JSON.stringify(reply))
                    return
                }
                if (data + 1 > CLICK_MAX) {
                    const reply = { message: null, error: `Flag is: ${process.env.FLAG}` }
                    conn.socket.send(JSON.stringify(reply))
                    return
                }
                const reply = { message: data + 1, error: null }
                conn.socket.send(JSON.stringify(reply))
            })
        }
    })
})

const start = async () => {
    try {
        await fastify.listen(8000, '0.0.0.0') // dockerの上では0.0.0.0でlistenしてやる必要がある
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
