import auth from 'solid-auth-client'

export async function init ( url : string ) {
    const resp = await auth
        .fetch (
            url + '/' ,
            { method : 'POST' }
        )
    if ( resp.status !== 201 ) {
        console.log ( resp )
        throw Error ( `HTTP Error: ${ resp.status } ${ resp.statusText }` )
    }
}
