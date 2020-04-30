import FS       from '@isomorphic-git/lightning-fs'
import git      from 'isomorphic-git'
import { http } from './http/http'

export async function clone ( url : string ) {
    const fs  = new FS ( 'fs' ,
                         { wipe : true } )
    const pfs = fs.promises
    const dir = '/examples'
    await git.clone ( {
                          fs ,
                          http ,
                          dir ,
                          url ,
                          ref :          'master' ,
                          singleBranch : true ,
                          depth :        1
                      } )
    console.log ( await pfs.readdir ( dir ) )
    await fs.promises.writeFile (
        `${ dir }/README.md` ,
        'Very short README' ,
        'utf8'
    )

    await git.add ( { fs , dir , filepath : 'README.md' } )

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

    let pushResult = await git.push ( {
                                          fs ,
                                          http ,
                                          dir ,
                                      } )


    return
}
