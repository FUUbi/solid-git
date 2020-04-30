import auth          from 'solid-auth-client'
import { HttpError } from './http-error'

export function checkResponse ( response : Promise<Response> ) : Promise<Response> {
    {
        return response.then ( r => {
                                   if ( r.ok ) {
                                       return r
                                   }
                                   else {
                                       throw new HttpError ( r )
                                   }
                               }
        )
    }
}

export async function spqrqlUpdate (
    uri : string ,
    query : string
) : Promise<Response> {
    return await auth
        .fetch (
            uri ,
            {
                method :  'POST' ,
                headers : new Headers ( { 'Content-Type' : 'application/sparql-update' } ) ,
                body :    query
            }
        )
}


export async function httpDelete ( uri : string ) : Promise<Response> {
    return await auth
        .fetch (
            uri ,
            { method : 'DELETE' }
        )
}

export async function httpGET ( uri : string ) : Promise<Response> {
    return await auth
        .fetch (
            uri ,
            { method : 'GET' }
        )
}

export async function httpPUT ( uri : string ,
                                data : any ) : Promise<Response> {
    return await auth
        .fetch (
            uri ,
            { method : 'PUT' , body : data }
        )
}

export async function getHexHash ( message : string ) {
    const encoder        = new TextEncoder ()
    const uint8Array     = encoder.encode ( message )
    const hashUnit8Array = new Uint8Array ( await crypto.subtle.digest (
        'SHA-256' ,
        uint8Array
    ) )

    // https://gist.github.com/tauzen/3d18825ae41ff3fc8981
    let hexHash = ''
    for (
        let i = 0 ;
        i < hashUnit8Array.length ;
        i++
    ) {
        let hex = ( hashUnit8Array[ i ] & 0xff ).toString ( 16 )
        hexHash
            += hex
    }
    return hexHash
}

