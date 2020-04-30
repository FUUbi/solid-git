import { Node } from 'domain/rdf/Node'
import { Path } from 'ldflex'

export class TurtleResource extends Node {
    static type : string = 'http://www.w3.org/ns/iana/media-types/text/turtle#Resource'

    constructor ( turtleResource : Path ) {
        super ( turtleResource )
    }

    getResourceName () : string {
        return this.path.toString ()
                   .split ( '/' )
                   .pop ()
    }
}
