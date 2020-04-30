export interface Stats {
    ctimeSeconds : number,
    ctimeNanoseconds : number,
    mtimeSeconds : number,
    mtimeNanoseconds : number,
    date : Date;
    dev : number;
    ino : number;
    mode : number;
    nlink : number;
    uid : number;
    gid : number;
    size : number;
    birthtimeMs : number;

    isFile () : boolean;

    isDirectory () : boolean;

    isSymbolicLink () : boolean;
}

const defaultStats : Stats = {
    ctimeSeconds :     0 ,
    ctimeNanoseconds : 0 ,
    mtimeSeconds :     0 ,
    mtimeNanoseconds : 0 ,
    birthtimeMs :      0 ,
    dev :              0 ,
    gid :              0 ,
    ino :              0 ,
    mode :             0 ,
    nlink :            0 ,
    size :             0 ,
    uid :              0 ,
    date :             new Date () ,
    isDirectory () : boolean {
        return false
    } ,
    isFile () : boolean {
        return false
    } ,
    isSymbolicLink () : boolean {
        return false
    }
}

export const getDefaultDirectoryStats = () => ( {
    ... defaultStats ,
    isDirectory () : boolean {
        return true
    }
} )

export const getDefaultFileStats = () => ( {
    ... defaultStats ,
    isFile () : boolean {
        return true
    }
} )
