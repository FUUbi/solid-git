import { session }                                         from './src/session/Session'
import { cloneAddCommitPush as cloneAddCommitPushwithLFS } from './src/with-lightning-fs/clone-add-commit-push'
import { init as initWithLFS }                             from './src/with-lightning-fs/init'
import { addCommit as addCommitWithMSFS }                  from './src/with-minimal-solid-fs/add-commit'
import { init as initWithMSFS }                            from './src/with-minimal-solid-fs/init'

module.exports = {
    login :  session.getWebId () ,
    logout : session.logout ,
}


// @ts-ignore
const repositoryUrl   = () : string => document.getElementById ( 'init1repository_url' ).value
const init1Form       = document.getElementById ( 'init1Form' )
const init1FormResult = document.getElementById ( 'init1FormResult' )
const clone1Button    = document.getElementById ( 'clone1' )
const clone1Result    = document.getElementById ( 'clone1Result' )

init1Form?.addEventListener (
    'submit' ,
    async event => {
        event.preventDefault ()
        try {
            // @ts-ignore
            consoleLog.innerHTML = ''
            await initWithLFS ( repositoryUrl () )

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
            await cloneAddCommitPushwithLFS ( repositoryUrl () )
            if ( clone1Result ) {
                clone1Result.innerHTML =
                    `<div  class="alert alert-success" role="alert">
                     That's it. You can have a look at the <a href="${ repositoryUrl () }/objects">.git/objects</a> folder. 
                     If you see a info, a pack and some two digits folders every thing worked as expected.
                     </div>`
            }
        }
        catch ( e ) {
            if ( clone1Result ) {
                clone1Result.innerHTML =
                    `<div  class="alert alert-danger" role="alert">${ e.message } </div>`
            }
        }
    }
)


// @ts-ignore
const repositoryUrl2  = () : string => document.getElementById ( 'init2repository_url' ).value
const init2Form       = document.getElementById ( 'init2Form' )
const init2FormResult = document.getElementById ( 'init2FormResult' )
const clone2Button    = document.getElementById ( 'clone2' )
const clone2Result    = document.getElementById ( 'clone2Result' )

init2Form?.addEventListener (
    'submit' ,
    async event => {
        event.preventDefault ()
        try {
            // @ts-ignore
            consoleLog.innerHTML = ''
            await initWithMSFS ( repositoryUrl2 () )

            if ( init2FormResult ) {
                init2FormResult.innerHTML =
                    `<div  class="alert alert-success" role="alert">
                                    Great 🎊🎊, check it out <a href="${ repositoryUrl2 () }">here</a>.
                                 </div>`
            }
        }
        catch ( e ) {
            if ( init2FormResult ) {
                init2FormResult.innerHTML =
                    `<div  class="alert alert-danger" role="alert">${ e.message } </div>`
            }
        }
    }
)

clone2Button?.addEventListener (
    'click' ,
    async event => {

        try {

            await addCommitWithMSFS ( repositoryUrl2 () )
            if ( clone2Result ) {
                clone2Result.innerHTML =
                    `<div  class="alert alert-success" role="alert">
                     That's it. You can have a look at the <a href="${ repositoryUrl2 () }/.git/objects">.git/objects</a> folder. 
                     If you see a info, a pack and some two digits folders every thing worked as expected.
                     </div>`
            }
        }
        catch ( e ) {
            if ( clone2Result ) {
                clone2Result.innerHTML =
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


const consoleLog      = document.getElementById ( 'consoleLog' )
window.console.log = ( message ) => {
    const nextLog     = document.createElement ( 'div' )
    nextLog.className = 'alert alert-info'
    nextLog.innerHTML = message

    consoleLog?.appendChild ( nextLog )
    console.debug ( message )
}
