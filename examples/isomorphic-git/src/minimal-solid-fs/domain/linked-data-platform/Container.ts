import { TurtleResource } from 'domain/iana/media-types/text/turtle/TurtleResource'
import { BinaryResource } from 'domain/linked-data-platform/BinaryResource'
import { Resource }       from 'domain/linked-data-platform/Resource'
import { Node }           from 'domain/rdf/Node'
import {
    Path ,
    ResolvedPath
}                         from 'ldflex'
import {
    ldp ,
    rdf
}                         from 'rdf-namespaces'
import { ENOENT }         from '../../errors'
import {
    getDefaultDirectoryStats ,
    getDefaultFileStats ,
    Stats
}                         from '../../stats'
import { getTagger } from '../../utils/logger'
import { httpGET }   from '../../utils/http'


export class Container extends Node {
    static type : string = ldp.Container
    protected tag        = getTagger ( Container.name ).tag

    constructor ( container : Path ) {
        super ( container )
    }

    async getResources () : Promise<( TurtleResource | Container | Resource | BinaryResource )[]> {
        console.log ( this.tag ( ( 'Get resources.' ) ) )
        const all : Resource[] =
                  await this.path[ ldp.contains ]
                      .toArray ()
                      .then ( ( resources : ResolvedPath[] ) =>
                                  resources.map ( r => new Resource ( r ) ) )

        const resources : ( TurtleResource | Container | Resource | BinaryResource )[]
                  = []
        for ( let r of all ) {
            try {
                if ( await r.isOfTypeTurtleResource () ) {
                    resources.push ( new TurtleResource ( r.getPath () ) )
                }
                else if ( await r.isOfTypeContainer () ) {
                    resources.push ( new Container ( r.getPath () ) )
                }
                else {
                    resources.push ( r )
                }
            }
            catch ( e ) {
                const resp = await httpGET ( r.getPath () )
                if ( resp.ok ) {
                    console.debug ( this.tag ( 'Add binary data to resources.' ) )
                    const resource = new BinaryResource ( r.getPath () ,
                                                          await resp.arrayBuffer () )
                    resources.push ( resource )
                }
            }
        }

        return resources
    }

    async getTurtleResources () : Promise<TurtleResource[]> {
        console.debug ( this.tag ( 'Get turtle resources' ) )

        const resources = await this.getResources ()
        console.debug ( this.tag ( `Found ${ resources.length } resources.` ) )

        const turtleResources = resources.filter ( r => r instanceof TurtleResource ) as TurtleResource[]
        console.debug ( this.tag ( `Found ${ turtleResources.length } turtle resources.` ) )
        return turtleResources
    }

    async getContainers () : Promise<Container[]> {
        console.debug ( this.tag ( 'Get containers' ) )

        const resources = await this.getResources ()
        console.debug ( this.tag ( `Found ${ resources.length } resources.` ) )

        const containers = resources.filter ( r => r instanceof Container ) as Container[]
        console.debug ( this.tag ( `Found ${ containers.length } containers.` ) )
        return containers
    }

    async getStats ( uri : string ) : Promise<Stats> {
        console.debug ( this.tag ( 'Get stats ' + uri ) )
        let stats : Stats | null       = null
        let resources : ResolvedPath[] = await this.path[ ldp.contains ]
            .toArray ()
        resources.push ( this.path )
        for ( let r of resources ) {
            const rUri = r.toString ()
            if ( rUri !== uri ) {
                continue
            }

            if ( await this.isOfTypeContainer ( r ) ) {
                stats = getDefaultDirectoryStats ()
            }
            else {
                stats = getDefaultFileStats ()
            }
            stats.date             = new Date ( ( await r[ 'http://purl.org/dc/terms/modified' ] ).toString () )
            const mtime            = ( await r[ 'http://www.w3.org/ns/posix/stat#mtime' ] ).toString ()
                                                                                           .split ( '.' )
            stats.mtimeSeconds     = mtime[ 0 ]
            stats.mtimeNanoseconds = mtime[ 1 ]
            stats.size             = ( await r[ 'http://www.w3.org/ns/posix/stat#size' ] ).toString ()

        }
        if ( !stats ) {
            throw ENOENT
        }
        return stats
    }


    private async isOfTypeContainer ( path : ResolvedPath ) : Promise<boolean> {

        const acceptedContainerTypes = [
            ldp.Container ,
            ldp.BasicContainer
        ]

        for await( let type of path[ rdf.type ] ) {
            for ( let accepted of acceptedContainerTypes ) {
                if ( type.toString () === accepted ) {
                    return true
                }
            }
        }
        return false
    }

}
