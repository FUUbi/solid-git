import { ENOENT }    from '../errors'
import { Encoding }  from '../promisified-fs'
import {
    checkResponse ,
    httpGET
}                    from '../utils/http'
import { HttpError } from '../utils/http-error'
import { PathLike }            from 'fs'

export async function readFile (
    path : PathLike ,
    options? : {
                   encoding? : Encoding
                   flag? : string | number
               } | null
) : Promise<ArrayBuffer | string> {
    path = `https://${ path }`
    console.debug ( `Read file: ${ path }` )

    const res = null
    try {
        const res = await checkResponse ( httpGET ( path ) )
        if ( res.status === 200 ) {
            if ( options && options.encoding ) {
                return new TextDecoder ( options.encoding ).decode ( await res.arrayBuffer () )
            }
            return res.arrayBuffer ()
        }
    }
    catch ( e ) {
        throw ENOENT.withPathInfo ( path )
    }

    // @ts-ignore
    throw new HttpError ( res )
}

