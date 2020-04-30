import {
    MakeDirectoryOptions ,
    PathLike ,
    RmDirAsyncOptions ,
}                from 'fs'
import { Stats } from './stats'

export type Encoding = 'utf8'

export type MinimalFs = {
    fc : any
    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_readfile_path_options
     * Asynchronously reads the entire contents of a file. The underlying file will _not_ be closed automatically.
     * The `FileHandle` must have been opened for reading.
     * @param options An object that may contain an optional flag.
     * If a flag is not provided, it defaults to `'r'`.
     */
    readFile (
        path : PathLike ,
        options? : { encoding? : Encoding, flag? : string | number } | null
    ) : Promise<ArrayBuffer | string>;


    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_writefile_file_data_options
     * Asynchronously writes data to a file, replacing the file if it already exists. The underlying file will _not_ be closed automatically.
     * The `FileHandle` must have been opened for writing.
     * It is unsafe to call `writeFile()` multiple times on the same file without waiting for the `Promise` to be resolved (or rejected).
     * @param data The data to write. If something other than a `Buffer` or `Uint8Array` is provided, the value is coerced to a string.
     * @param options Either the encoding for the file, or an object optionally specifying the encoding, file mode, and flag.
     * If `encoding` is not supplied, the default of `'utf8'` is used.
     * If `mode` is not supplied, the default of `0o666` is used.
     * If `mode` is a string, it is parsed as an octal integer.
     * If `flag` is not supplied, the default of `'w'` is used.
     */
    writeFile (
        path : PathLike ,
        data : any ,
        options? : { encoding? : Encoding, mode? : string | number, flag? : string | number } | string | null
    ) : Promise<void>;

    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_unlink_path
     * Asynchronous unlink(2) - delete a name and possibly the file it refers to.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    unlink ( path : PathLike ) : Promise<void>

    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_readdir_path_options
     * Asynchronous readdir(3) - read a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options The encoding (or an object specifying the encoding), used as the encoding of the result. If not provided, `'utf8'` is used.
     */
    readdir ( path : PathLike ,
              options? : { encoding : BufferEncoding | null; withFileTypes? : false } | BufferEncoding | undefined | null ,
    ) : Promise<string[]>;


    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_mkdir_path_options
     * Asynchronous mkdir(2) - create a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     * @param options Either the file mode, or an object optionally specifying the file mode and whether parent folders
     * should be created. If a string is passed, it is parsed as an octal integer. If not specified, defaults to `0o777`.
     */
    mkdir (
        path : PathLike ,
        options? : number | string | MakeDirectoryOptions | undefined | null ,
    ) : Promise<void>;


    /**
     * - https://nodejs.org/api/fs.html#fs_fspromises_rmdir_path
     * Asynchronous rmdir(2) - delete a directory.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    rmdir (
        path : PathLike ,
        options? : RmDirAsyncOptions
    ) : Promise<void>;


    /**
     * Asynchronous fstat(2) - Get file status.
     */
    stat ( path : PathLike ) : Promise<Stats>;

    /**
     * Asynchronous lstat(2) - Get file status. Does not dereference symbolic links.
     * @param path A path to a file. If a URL is provided, it must use the `file:` protocol.
     */
    lstat ( path : PathLike ) : Promise<Stats>;

    readlink (
        path : PathLike ,
        options? : RmDirAsyncOptions
    ) : Promise<string | Buffer>;

    /**
     * Asynchronous symlink(2) - Create a new symbolic link to an existing file.
     * @param target A path to an existing file. If a URL is provided, it must use the `file:` protocol.
     * @param path A path to the new symlink. If a URL is provided, it must use the `file:` protocol.
     * @param type May be set to `'dir'`, `'file'`, or `'junction'` (default is `'file'`) and is only available on Windows (ignored on other platforms).
     * When using `'junction'`, the `target` argument will automatically be normalized to an absolute path.
     */
    symlink (
        target : PathLike ,
        path : PathLike ,
        type? : string | null
    ) : Promise<void>;

}

export interface PromisifiedFs {
    promises : MinimalFs;
}
