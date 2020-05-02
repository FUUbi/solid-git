import FS       from '@isomorphic-git/lightning-fs'
import git      from 'isomorphic-git'
import { http } from './http/http'

export async function cloneAddCommitPush ( url : string ) {
    console.log ( 'Init lightning file system.' )
    const fs  = new FS ( 'fs' ,
                         { wipe : true } )
    const pfs = fs.promises
    const dir = '/examples'

    console.log ( 'Clone repository.' )
    await git.clone ( {
                          fs ,
                          http ,
                          dir ,
                          url ,
                          ref :          'master' ,
                          singleBranch : true ,
                          depth :        1
                      } )
    console.log ( 'List content of current directory: <br> ' +
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

    console.log ( `Push.` )
    await git.push ( {
                         fs ,
                         http ,
                         dir ,
                     } )


}
