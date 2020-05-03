import {
    PathLike ,
    RmDirAsyncOptions
}                     from 'fs'
import { httpDelete } from '../utils/http'

export async function rmdir (
    path : PathLike ,
    options? : RmDirAsyncOptions
) : Promise<void> {
    path = `https://${ path }`
    console.debug ( 'rm dir' )
    await httpDelete ( path.toString () )
}
