import data          from '@solid/query-ldflex'
import { Resource }  from 'domain/linked-data-platform/Resource'
import { getTagger } from '../../utils/logger'


export class ResourceRepository {
    protected tag = getTagger ( ResourceRepository.name ).tag

    async get ( uri : string ) : Promise<Resource> {
        console.debug ( this.tag ( `Get container with uri ${ uri }` ) )
        return new Resource ( data[ uri ] )
    }
}
