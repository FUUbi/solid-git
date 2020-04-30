import { PathLike } from 'fs'

export async function symlink (
    target : PathLike ,
    path : PathLike ,
    type? : string | null
) : Promise<void> {
    throw Error ( 'Not implemented.' )
}
