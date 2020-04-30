export type PathLike =
    {
        asUrl : string
    }
    &
    PathProxyTarget
    & string

export type PathProxyTarget = {
    baseUrl : string,
    path : string
}

export class PathLikeFactory {
    static create ( path : PathProxyTarget ) : PathLike {
        // @ts-ignore
        return new Proxy (
            path ,
            {
                get : function (
                    target : PathProxyTarget ,
                    property
                ) {
                    console.log ( property )
                    console.log ( target )
                    switch ( property ) {
                        case 'asUrl':
                            return `${ target.baseUrl }${ target.path }`
                        case 'baseUrl':
                            return target.baseUrl
                        case 'path':
                            return target.path
                        /*
                                                case 'toPrimitive':
                                                    return 'string'
                                                case 'toString':
                                                    return target.path
                                                case 'valueOf':
                                                    return target.path.valueOf ()
                        */
                    }

                    const prop = target.path[ property ]
                    if ( typeof prop === 'function' ) {
                        return () => {
                            return prop.apply (
                                target.path ,
                                // @ts-ignore
                                arguments
                            )
                        }
                    }
                    return prop
                }
            }
        )
    }

}

