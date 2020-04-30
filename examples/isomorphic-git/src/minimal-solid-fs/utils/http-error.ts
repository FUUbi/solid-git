export class HttpError extends Error {
    public readonly code : number

    constructor (
        response : Response
    ) {
        super ( '' )
        this.code    = response.status
        this.message = `${ response.statusText }: ${ response.url }, see https://developer.mozilla.org/de/docs/Web/HTTP/Status/${ response.status }`
    }
}
