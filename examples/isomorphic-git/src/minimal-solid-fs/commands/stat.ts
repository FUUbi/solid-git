import data                    from '@solid/query-ldflex'
import { ContainerRepository } from 'domain/linked-data-platform/ContainerRepository'
import { PathLike , }          from 'fs'
import { ENOENT }              from '../errors'
import { Stats }               from '../stats'

/*
* We need to set these stats correctly, since they are used in the git status
* to check if a file has changed.

unction compareStats(entry, stats) {
  // Comparison based on the description in Paragraph 4 of
  // https://www.kernel.org/pub/software/scm/git/docs/technical/racy-git.txt
  const e = normalizeStats(entry);
  const s = normalizeStats(stats);
  const staleness =
    e.mode !== s.mode ||
    e.mtimeSeconds !== s.mtimeSeconds ||
    e.ctimeSeconds !== s.ctimeSeconds ||
    e.uid !== s.uid ||
    e.gid !== s.gid ||
    e.ino !== s.ino ||
    e.size !== s.size;
  return staleness
}

*
* Further the path provided to the stats is

* * */

export async function stat ( path : PathLike ) : Promise<Stats> {
    console.debug ( `Get linked data stats of resource ${ path }` )
    // isomorphic git splits up the path up,
    path = `https://${ path }`
    try {
        let directory = ''
        path          = path.toString ()
        if ( // is a directory
            path.endsWith ( '/' )
        ) {
            directory = path
        }
        else {// is a file
            let fileName = path.toString ()
                               .split ( '/' )
                               .pop ()
            fileName     = fileName
                           ? fileName
                           : ''
            directory    = path.replace (
                new RegExp (
                    `${ fileName }$` ,
                    'g'
                ) ,
                ''
            )
        }
        await data.clearCache ( directory )
        console.debug ( `Directory ${ directory }` )

        const container = await new ContainerRepository ().get ( directory )
        return await container.getStats ( path )
    }
    catch ( e ) {
        throw ENOENT
    }
}

