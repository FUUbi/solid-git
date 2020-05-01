import git  from 'isomorphic-git'
import auth from 'solid-auth-client'
import {
    minimalFs ,
    SolidFileSystem
}           from '../minimal-solid-fs/solid-file-system'

export async function addCommit ( url : string ) {
    console.log ( 'Init minimal solid file system.' )
    const dir = url
    const fs  = new SolidFileSystem (
        auth ,
        minimalFs ,
        'root'
    )
    const pfs = fs.promises

    console.log ( 'List content of current directory:<br> ' +
                      ( await pfs.readdir ( dir ) )
                          .reduce ( (
                                        a ,
                                        b
                                    ) => `&nbsp; ${ a } <br> &nbsp; ${ b } <br>` )
    )

    const newMessage = 'Very short README with a random number: ' + Math.random ()
    console.log ( `Update README.md with the following content:  <br>  &nbsp; ${ newMessage }` )

    await fs.promises.writeFile (
        `${ dir }/README.md` ,
        newMessage ,
        'utf8'
    )

    console.log ( `Stage README.md` )
    await git.add ( { fs , dir , filepath : 'README.md' } )

    console.log ( `Commit.` )
    await git.commit (
        {
            fs ,
            dir ,
            message : 'Add a README' ,
            author :  {
                name :  'Test Bot' ,
                email : 'test@bot.com'
            }
        }
    )
}
