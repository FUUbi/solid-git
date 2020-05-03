import { ContainerRepository } from 'domain/linked-data-platform/ContainerRepository'
import { Resource }            from 'domain/linked-data-platform/Resource'
import { PathLike }            from 'fs'
import { ENOTDIR }             from '../errors'

export async function readdir (
    path : PathLike ,
    options : { encoding : BufferEncoding | null; withFileTypes? : false } | BufferEncoding | undefined | null
        = { encoding : 'utf-8' }
) :
    Promise<string[ ]> {
    path = `https://${ path }`
    console.debug ( 'Linked data file system read dir' )
    const container = await new ContainerRepository ().get ( path.toString () )
    if ( !await new Resource ( container.getPath () ).isOfTypeContainer () ) {
        throw ENOTDIR
    }
    const resources = await container.getResources ()
    return resources.map ( c => c.toString () )
}
