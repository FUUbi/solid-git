export abstract class Literal<T extends { toString () : string }> {
    static datatype : string = ''

    protected constructor ( protected value : T ) {

    }


    toString () : string {
        return this.value.toString ()
    }
}
