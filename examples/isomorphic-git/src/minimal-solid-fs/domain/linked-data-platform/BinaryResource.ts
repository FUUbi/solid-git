import { Node } from 'domain/rdf/Node'
import { Path } from 'ldflex'

export class BinaryResource extends Node {
    constructor (
        path : Path ,
        public readonly data : ArrayBuffer
    ) {
        super ( path )
    }

}
