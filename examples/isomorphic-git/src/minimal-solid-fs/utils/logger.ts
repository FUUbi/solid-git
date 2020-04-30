export function getTagger ( tag : string ) {
    return {
        tag : ( message : String ) => `${ tag }: ${ message }`
    }
}
