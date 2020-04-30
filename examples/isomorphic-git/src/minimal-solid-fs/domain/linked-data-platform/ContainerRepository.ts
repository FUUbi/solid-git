import data          from '@solid/query-ldflex'
import { Container } from 'domain/linked-data-platform/Container'
import { getTagger } from '../../utils/logger'
import {
    httpDelete ,
    spqrqlUpdate
}                    from '../../utils/http'


function assertTailingSlash ( uri : string ) {
    uri = uri.trim ()
    if ( !/\/$/g.test ( uri ) ) {
        uri += '/'
    }
    return uri
}

export class ContainerRepository {
    protected tag = getTagger ( ContainerRepository.name ).tag

    async get ( uri : string ) : Promise<Container> {
        console.debug ( this.tag ( `Get container with uri ${ uri }` ) )
        return new Container ( data[ assertTailingSlash ( uri ) ] )
    }

    async create ( uri : string ) {
        uri = assertTailingSlash ( uri )
        await spqrqlUpdate ( uri + '.dummy' ,
                             `INSERT DATA {   }` )
        await httpDelete ( uri + '.dummy' )
    }

    async getContainers ( conainer : Container ) {
        conainer.getResources ()
    }
}
