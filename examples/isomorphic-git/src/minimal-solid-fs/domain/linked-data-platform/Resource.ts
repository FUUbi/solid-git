import { TurtleResource } from 'domain/iana/media-types/text/turtle/TurtleResource'
import { Container }      from 'domain/linked-data-platform/Container'
import { Node }           from 'domain/rdf/Node'
import { Path }           from 'ldflex'
import {
    ldp ,
    rdf
}                         from 'rdf-namespaces'
import { getTagger } from '../../utils/logger'
import { httpGET }   from '../../utils/http'

export class Resource extends Node {
    static type : string = ldp.Resource
    protected tag        = getTagger ( Resource.name ).tag

    constructor ( resource : Path ) {
        super ( resource )
    }

    async isOfTypeTurtleResource () : Promise<boolean> {

        console.debug ( this.tag ( `Is ${ this.getPath () } of type ${ TurtleResource.type }` ) )
        await httpGET ( this.path.toString () ) // hotfix, otherwise ldflex throws an error we can not catch
        return ( await this.path[ rdf.type ] ).toString () === TurtleResource.type
    }

    async isOfTypeContainer () : Promise<boolean> {
        console.debug ( this.tag ( `Is ${ this.getPath () } of type ${ Container.type }` ) )
        await httpGET ( this.path.toString () ) // hotfix, otherwise ldflex throws an error we can not catch

        const acceptedContainerTypes = [
            ldp.Container ,
            ldp.BasicContainer
        ]

        for await( let type of this.path[ rdf.type ] ) {
            for ( let accepted of acceptedContainerTypes ) {
                if ( type.toString () === accepted ) {
                    return true
                }
            }
        }
        return false
    }
}
