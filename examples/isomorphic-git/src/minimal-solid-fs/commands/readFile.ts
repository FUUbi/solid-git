import { ENOENT }    from '../errors'
import { PathLike }  from '../path'
import { Encoding }  from '../promisified-fs'
import {
    checkResponse ,
    httpGET
}                    from '../utils/http'
import { HttpError } from '../utils/http-error'

export async function readFile (
    path : PathLike ,
    options? : {
                   encoding? : Encoding
                   flag? : string | number
               } | null
) : Promise<ArrayBuffer | string> {
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
        throw ENOENT.withPathInfo ( path.asUrl )
    }

    // @ts-ignore
    throw new HttpError ( res )
}

