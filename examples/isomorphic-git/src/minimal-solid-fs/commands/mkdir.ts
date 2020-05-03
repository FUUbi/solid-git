import { ContainerRepository } from 'domain/linked-data-platform/ContainerRepository'
import {
    MakeDirectoryOptions ,
    PathLike
}                              from 'fs'
import { EACCE }               from '../errors'

export async function mkdir (
    path : PathLike ,
    options : number | string | MakeDirectoryOptions | undefined | null
) : Promise<void> {

    path = `https://${ path }`
    const repo = new ContainerRepository ()
    console.debug ( `Linked data make dir: ${ path }` )
    try {
        // todo error handling, will not throw anything at the moment
        await repo.create ( path.toString () )
    }
    catch ( e ) {
        if ( e.code === 401 ) {
            throw EACCE
        }
        throw e
    }
}



