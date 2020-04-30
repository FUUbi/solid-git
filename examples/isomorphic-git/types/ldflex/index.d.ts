declare module 'ldflex' {
    import {
        NamedNode ,
        Term
    } from 'rdf-js'

    // @ts-ignore
    export type ResolvedPath =
        {
            subject : Promise<Path>
            subjects : Promise<Path[]>
            predicate : Promise<Path>
            predicates : Promise<Path[]>
            pathExpression : Promise<{ subject : NamedNode }[]>
            sparql : Promise<string>
            termType : Promise<Term['termType']> | Term['termType']
            value : string
            toString () : string
            toPrimitive () : number | string | boolean | undefined | symbol | unknown
        }
        & Term

    // @ts-ignore
    export type Path =
        Promise<ResolvedPath>
        & { [ key : string ] : Path }
        & {
            add ( ... args ) : Promise<ResolvedPath>
            set ( ... args ) : Promise<ResolvedPath>
            replace ( ... args ) : Promise<ResolvedPath>
            delete () : Promise<ResolvedPath>
            sort () : Promise<ResolvedPath> & Path
            sortDesc () : Promise<ResolvedPath> & Path
            toArray () : Promise<ResolvedPath[]>
        }


    export class PathFactory {
        constructor ( settings : any )

        create ( node : { subject : NamedNode } ) : Path
    }
}
