import git  from 'isomorphic-git'
import auth from 'solid-auth-client'
import {
    minimalFs ,
    SolidFileSystem
}           from '../minimal-solid-fs/solid-file-system'

export async function init ( url : string ) {
    const dir = url
    const fs  = new SolidFileSystem (
        auth ,
        minimalFs ,
        'root'
    )
    const pfs = fs.promises
    console.log ( 'Init repository with url: ' + url )
    await git.init ( { dir , fs } )
    await pfs.readdir ( dir )
}
