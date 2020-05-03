import { ResourceRepository } from 'domain/linked-data-platform/ResourceRepository'
import { PathLike }           from 'fs'
import { httpPUT }            from '../utils/http'

export async function writeFile (
    path : PathLike ,
    data : any ,
    options ? : {
                    encoding? : string | null
                    mode? : string | number
                    flag? : string | number
                } | string | null
) : Promise<void> {
    path = `https://${ path }`
    const repo = new ResourceRepository ()
    console.debug ( `Linked data write file ${ path }` )
    await httpPUT (
        path.toString () ,
        data
    )

}
