import {
    PathLike ,
    RmDirAsyncOptions
}                     from 'fs'
import { httpDelete } from '../utils/http'

export async function rmdir (
    path : PathLike ,
    options? : RmDirAsyncOptions
) : Promise<void> {
    console.debug ( 'rm dir' )
    await httpDelete ( path.toString () )
}
