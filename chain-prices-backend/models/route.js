class Route {
    constructor(method, url, handler) {
        this.method = method
        this.url = url
        this.handler = handler
    }

    getUrl() {
        return this.url
    }

    getMethod() {
        return this.method
    }

    getHandler() {
        return this.handler
    }
}

module.exports = Route;
