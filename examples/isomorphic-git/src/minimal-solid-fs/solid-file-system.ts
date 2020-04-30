import data                from '@solid/query-ldflex'
import { SolidAuthClient } from 'solid-auth-client'
import { mkdir }           from './commands/mkdir'
import { readdir }         from './commands/readdir'
import { readFile }        from './commands/readFile'
import { readlink }        from './commands/readLink'
import { rmdir }           from './commands/rmDir'
import { stat }            from './commands/stat'
import { symlink }         from './commands/symlink'
import { unlink }          from './commands/unLink'
import { writeFile }       from './commands/writeFile'
import {
    MinimalFs ,
    PromisifiedFs
}                          from './promisified-fs'

const FC = require ( 'solid-file-client' )

export class SolidFileSystem implements PromisifiedFs {
    private fileClient

    constructor ( private auth : SolidAuthClient ,
                  public promises : MinimalFs ,
                  private root : string ,
    ) {

        this.fileClient = new FC ( this.auth )
    }

    async wipe () : Promise<void> {
        if ( !this.root.endsWith ( '/' ) ) {
            this.root += '/'
        }
        console.log ( this.root )
        await this.fileClient.deleteFolder ( this.root )
                  .catch ( e => {
                      if ( e.status !== 404 ) {
                          throw  e
                      }
                  } )
    }
}

export const minimalFs : MinimalFs = {
    fc :    null ,
// @ts-ignore
    data :  data ,
    mkdir , readdir ,
    writeFile , readFile ,
    stat , rmdir ,
    lstat : stat ,

    unlink ,
    readlink ,
    symlink
}
