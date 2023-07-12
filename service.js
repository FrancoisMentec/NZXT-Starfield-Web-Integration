import { Service } from 'node-windows'

const svc = new Service({
    name: 'NZXT Starfield Web Integration',
    description: 'A web server for the NZXT Starfield Web Integration',
    script: './index.js'
})

svc.on('install', () => {
    svc.start()
})

svc.install()