// https://www-numi.fnal.gov/offline_software/srt_public_context/WebDocs/Errors/unix_system_errors.html
type FsErrorType =
    'EEXIST'
    | 'ENOENT'
    | 'ENOTDIR'
    | 'ENOTEMPTY'
    | 'ETIMEDOUT'
    | 'EACCES'

export class FsError extends Error {

    constructor (
        public     message : string ,
        public code : FsErrorType ) {
        super ( message )
        this.message = `${ code }: ${ message }`
    }

    public withPathInfo ( path : string ) {
        this.message = `${ this.message } ${ path }`
    }
}

export const EEXIST = new FsError (
    'File exists.' ,
    'EEXIST'
)

export const ENOENT = new FsError (
    'No such file or directory.' ,
    'ENOENT' )

export const ENOTDIR   = new FsError (
    'Not a directory.' ,
    'ENOTDIR'
)
export const ENOTEMPTY = new FsError (
    'Directory not empty.' ,
    'ENOTEMPTY'
)

export const ETIMEDOUT = new FsError (
    'Connection timed out.' ,
    'ETIMEDOUT'
)

export const EACCE = new FsError (
    'Permission denied .' ,
    'EACCES'
)

