import { session } from './src/session/Session'

module.exports = {
    login :                  session.getWebId () ,
    logout :                 session.logout ,
}

session.getWebId ()
       .then ( ( webId ) => {
           if ( webId ) {
               session.renderLogin ( webId )
           }
       } )

session.getWebId ()
       .then ( ( webId ) => {
           if ( webId ) {
               session.renderLogin ( webId )
           }
       } )



document.addEventListener (
    'DOMContentLoaded' ,
    async function ( event ) {
        console.log("sd")
    }
)
