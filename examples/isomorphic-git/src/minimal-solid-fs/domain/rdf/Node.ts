import data        from '@solid/query-ldflex'
import { Path }    from 'ldflex'
import { httpGET } from '../../utils/http'

export abstract class Node {
    public static type : string = 'http://example.com/ns/solid/some#thing'
    protected path : Path

    protected constructor ( path : Path ) {
        this.path = data[ path ]
    }


    getPath () : Path {
        return this.path
    }

    async exists () : Promise<boolean> {
        const reps = await httpGET ( this.path.toString () )
        return reps.ok && reps.status === 200
    }

    protected async filterExistingNodes<T extends Node> ( nodes : T [] ) : Promise<T[]> {
        const validNodes : T[] = []
        for ( let n of nodes ) {
            if ( await n.exists () ) {
                validNodes.push ( n )
            }
        }
        return validNodes
    }

    public toString () : string {
        return this.path.toString ()
    }


}
