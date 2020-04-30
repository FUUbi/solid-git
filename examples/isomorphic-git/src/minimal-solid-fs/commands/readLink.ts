import {
    PathLike ,
    RmDirAsyncOptions
} from 'fs'

export async function readlink (
    path : PathLike ,
    options? : RmDirAsyncOptions
) : Promise<string | Buffer> {
    throw Error ( 'Not implemented.' )
}

