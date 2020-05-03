import { PathLike }   from 'fs'
import { httpDelete } from '../utils/http'

export async function unlink ( path : PathLike ) : Promise<void> {
    path = `https://${ path }`
    console.log ( 'Unlink ' + path.toString () )
    await httpDelete ( path.toString () )
}
