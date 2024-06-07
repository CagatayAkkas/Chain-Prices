const express = require('express')
var bodyParser = require('body-parser');
const fs = require('fs')
const cors = require('cors')

class BaseServer {
    constructor(host, port) {
        this.host = host
        this.port = port
        this.baseRoutesPath = './server'

        this.#prepare()

        if (this.constructor == BaseServer) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }

    #prepare() {
        this.app = express()
        const allRoutePath = this.#findAllRoute()
        this.#importAllRoute(allRoutePath)

        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());
        this.app.use(cors())
    }

    #findAllRoute() {
        let allRouteDirectory = []

        const directory = fs.opendirSync(this.baseRoutesPath)
        let dirent

        while ((dirent = directory.readSync()) !== null) {
            if(dirent.isDirectory()) {
                allRouteDirectory.push(dirent.name)
            } else {
                continue
            }
        }

        directory.closeSync()

        return allRouteDirectory
    }

    #importAllRoute(allRoutePath) {
        let allRoute = []

        allRoutePath.forEach(routePath => {
            const directory = fs.opendirSync(this.baseRoutesPath + '/' + routePath)
            let dirent

            while((dirent = directory.readSync()) !== null) {
                import(`./${routePath}/${dirent.name}`).then(module => {
                    let allRoute = module.default.run()
                    this.#decideMethodAndRun(allRoute)
                })
                .catch(error => console.log(error))
            }

            directory.closeSync()
        });

        return allRoute
    }

    #decideMethodAndRun(allRoute) {
        allRoute.forEach(route => {
            switch(route.getMethod()) {
                case 'get':
                    this.app.get(route.getUrl(), route.getHandler())
                    break
                case 'post':
                    this.app.post(route.getUrl(), route.getHandler())
                    break
                case 'patch':
                    this.app.patch(route.getUrl(), route.getHandler())
                    break
                case 'delete':
                    this.app.delete(route.getUrl(), route.getHandler())
                    break
            }
        })
    }

    run() {
        throw new Error(`Method 'run()' must be implemented.`)
    }
}

module.exports = BaseServer
