import { session }                                         from './src/session/Session'
import { cloneAddCommitPush as cloneAddCommitPushwithLFS } from './src/with-lightning-fs/clone-add-commit-push'
import { init as initWithLFS }                             from './src/with-lightning-fs/init'
import { addCommit as addCommitWithMSFS }                  from './src/with-minimal-solid-fs/add-commit'
import { init as initWithMSFS }                            from './src/with-minimal-solid-fs/init'

module.exports = {
    login :  session.getWebId () ,
    logout : session.logout ,
}

let currentLogElement = ''

// @ts-ignore
const repositoryUrl1  = () : string => document.getElementById ( 'init1repository_url' ).value
const init1Form       = document.getElementById ( 'init1Form' )
const init1FormResult = document.getElementById ( 'init1FormResult' )
const clone1Button    = document.getElementById ( 'clone1' )
const clone1Result    = document.getElementById ( 'clone1Result' )

init1Form?.addEventListener (
    'submit' ,
    async event => {
        event.preventDefault ()
        try {
            currentLogElement = 'init1FormResult'
            clearLog ()

            await initWithLFS ( repositoryUrl1 () )
            console.log (
                `
                  Great 🎊🎊, check it out <a href="${ repositoryUrl1 () }">here</a>.
                  ` ,
                'alert alert-success'
            )
        }
        catch ( e ) {
            console.log (
                e.message ,
                'alert alert-danger'
            )
        }
    }
)

clone1Button?.addEventListener (
    'click' ,
    async event => {

        try {
            currentLogElement = 'clone1Result'
            clearLog ()

            await cloneAddCommitPushwithLFS ( repositoryUrl1 () )

            console.log (
                `
                 That's it. You can have a look at the <a href="${ repositoryUrl1 () }/objects">.git/objects</a> folder. 
                 If you see a info, a pack and some two digits folders every thing worked as expected.
                ` ,
                'alert alert-success'
            )
        }
        catch ( e ) {
            console.log (
                e.message ,
                'alert alert-danger'
            )
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
            currentLogElement = 'init2FormResult'
            clearLog ()

            await initWithMSFS ( repositoryUrl2 () )

            console.log (
                `
                  Great 🎊🎊, check it out <a href="${ repositoryUrl2 () }">here</a>.
                  ` ,
                'alert alert-success'
            )
        }
        catch ( e ) {
            console.log (
                e.message ,
                'alert alert-danger'
            )
        }
    }
)

clone2Button?.addEventListener (
    'click' ,
    async event => {
        currentLogElement = 'clone2Result'
        clearLog ()
        try {
            await addCommitWithMSFS ( repositoryUrl2 () )
            console.log (
                `That's it. You can have a look at the <a href="${ repositoryUrl2 () }/.git/objects">.git/objects</a> folder. 
                        If you see a info, a pack and some two digits folders every thing worked as expected.` ,
                'alert alert-success' )
        }
        catch ( e ) {
            console.log ( e.message ,
                          'alert alert-danger'
            )
        }
    }
)

const updateDataList = (
    id : string ,
    value : string
) => {
    const el : HTMLDataListElement = document.getElementById ( id ) as HTMLDataListElement
    const option                   = document.createElement ( 'option' )
    option.value                   = value
    el.append ( option )
}

document.addEventListener (
    'DOMContentLoaded' ,
    async function ( event ) {

        session.getWebId ()
               .then ( ( webId ) => {
                   if ( webId ) {
                       console.log ( `Session WebId is defined for user  ${ webId }` )
                       session.renderLogin ( webId )
                       const origin = new URL ( webId ).origin
                       updateDataList (
                           'git_example_url1' ,
                           `${ origin }/public/test.git`
                       )
                       updateDataList (
                           'git_example_url1' ,
                           `${ origin }/private/test.git`
                       )
                       updateDataList (
                           'git_example_url2' ,
                           `${ origin }/public/test`
                       )
                       updateDataList (
                           'git_example_url2' ,
                           `${ origin }/private/test`
                       )
                   }
                   else {
                       console.log ( 'Session WebId is not defined. Login please.' )
                   }
               } )

    } )


const consoleLogElement = () => document.getElementById ( currentLogElement )
window.console.log      = ( message ,
                            className : string = 'alert alert-info' ) => {
    const nextLog     = document.createElement ( 'div' )
    nextLog.className = className
    nextLog.innerHTML = message

    consoleLogElement ()
        ?.appendChild ( nextLog )
    console.debug ( message )
}


function clearLog () {
    const el = consoleLogElement ()
    el
    ? el.innerHTML = ''
    : null
}
