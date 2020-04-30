import auth from 'solid-auth-client'

export async function init ( url : string ) {
    console.log ( 'Init repository with url: ' + url )
    const resp = await auth
        .fetch (
            url + '/' ,
            { method : 'POST' }
        )
    if ( resp.status !== 201 ) {
        throw Error ( `HTTP Error: ${ resp.status } ${ resp.statusText }` )
    }
}
