import auth from 'solid-auth-client'

const loading      = document.getElementById ( 'loading' )
const webIdElement = document.getElementById ( 'webId' )
const elLoggedIn   = document.getElementById ( 'loggedIn' )
const elLoggedOut  = document.getElementById ( 'loggedOut' )

function getIdentityProvider () {
    const loading = document.getElementById ( 'loading' )
    loading!.style.display
                  = 'none'
    // @ts-ignore
    const form    = document.forms.idpForm
    form.style.display
                  = 'initial'

    const idpPromise = new Promise ( (
                                         resolve ,
                                         _reject
                                     ) => {
        form.addEventListener (
            'submit' ,
            event => {
                event.preventDefault ()
                resolve ( form.elements.identity_provider.value )
            }
        )
    } )

    return idpPromise
}

async function getWebId () {
    /* 1. Check if we've already got the user's WebID and access to their Pod: */
    let session = await auth.currentSession ()
    if ( session ) {
        return session.webId
    }

    const identityProvider = ( getIdentityProvider () as Promise<string> )
    identityProvider.then ( i => auth.login ( i ) )
}

function logout () {
    auth.logout ()
        .then ( () => {
            renderLogout ()
            console.log ( 'Logged out' )
        } )
}

const renderLogin = ( webId : string ) => {
    loading!.style.display
        = 'none'
    webIdElement!.textContent
        = webId
    elLoggedIn!.style.display
        = 'flex'


    elLoggedOut!.style.display
        = 'none'
}

const renderLogout = () => {
    webIdElement!.textContent
               = ''
    elLoggedIn!.style.display
               = 'none'
    elLoggedOut!.style.display
               = 'flex'
    // @ts-ignore
    const form = document.forms.idpForm
    form.style.display
               = 'initial'
}


export const session = {
    getWebId :    getWebId ,
    logout :      logout ,
    renderLogin : renderLogin ,
}
