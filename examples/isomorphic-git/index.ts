import { session } from './src/session/Session'
import { clone }   from './src/with-lightning-fs/clone'
import { init }    from './src/with-lightning-fs/init'

module.exports = {
    login :  session.getWebId () ,
    logout : session.logout ,
}


const repositoryUrl = () : string => {
    // @ts-ignore
    return document.getElementById ( 'init1repository_url' ).value
}

const init1Form       = document.getElementById ( 'init1Form' )
const init1FormResult = document.getElementById ( 'init1FormResult' )
const clone1Button    = document.getElementById ( 'clone1' )
const clone1Resutl    = document.getElementById ( 'clone1Result' )
const consoleLog      = document.getElementById ( 'consoleLog' )

init1Form?.addEventListener (
    'submit' ,
    async event => {
        event.preventDefault ()
        try {
            // @ts-ignore
            consoleLog.innerHTML = ''
            await init ( repositoryUrl () )

            if ( init1FormResult ) {
                init1FormResult.innerHTML =
                    `<div  class="alert alert-success" role="alert">
                                    Great 🎊🎊, check it out <a href="${ repositoryUrl () }">here</a>.
                                 </div>`
            }
        }
        catch ( e ) {
            if ( init1FormResult ) {
                init1FormResult.innerHTML =
                    `<div  class="alert alert-danger" role="alert">${ e.message } </div>`
            }
        }
    }
)

clone1Button?.addEventListener (
    'click' ,
    async event => {

        try {
            await clone ( repositoryUrl () )
            if ( clone1Resutl ) {
                clone1Resutl.innerHTML =
                    `<div  class="alert alert-success" role="alert">
                     That's it. You can have a look at the <a href="${ repositoryUrl () }/objects">.git/objects</a> folder. 
                     If you see a info, a pack and some two digits folders every thing worked as expected.
                     </div>`
            }
        }
        catch ( e ) {
            if ( clone1Resutl ) {
                clone1Resutl.innerHTML =
                    `<div  class="alert alert-danger" role="alert">${ e.message } </div>`
            }
        }
    }
)


document.addEventListener (
    'DOMContentLoaded' ,
    async function ( event ) {

        session.getWebId ()
               .then ( ( webId ) => {
                   if ( webId ) {
                       console.log ( `Session WebId is defined for user  ${ webId }` )
                       session.renderLogin ( webId )
                   }
                   else {
                       console.log ( 'Session WebId is not defined. Login please.' )
                   }
               } )

    } )


window.console.log = ( message ) => {
    const nextLog     = document.createElement ( 'div' )
    nextLog.className = 'alert alert-info'
    nextLog.innerHTML = message

    consoleLog?.appendChild ( nextLog )
}
