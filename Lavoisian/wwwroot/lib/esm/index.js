import createModule from "./lavoisian.js"

let dbLoaded = false;
const DATABASE_PATH = "/lavoisian/lavoisian.db"; // Path inside Emscripten FS
const PUBLIC_DB_URL = "/lavoisian/lavoisian.db"; // URL served from /public

const initDatabase = async(Module) => {
    if(dbLoaded)
        return Promise.resolve();

    return fetch(PUBLIC_DB_URL)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.FS.mkdir("/lavoisian");
        Module.FS.mount(Module.IDBFS, {}, "/lavoisian");
        Module.FS.writeFile(DATABASE_PATH, new Uint8Array(buffer));
        Module.FS.syncfs(false, err => {
            if(err) console.error("Failed to sync with indexDB: ", err);
            // else console.log("Database saved persistently.");
            dbLoaded = true;
        })
    })
    .catch(error => {
        console.error("Error getting database: ", error);
        return error;
    });
}


const getModule = async() => {
    return createModule().then(async(Module) => {
        initDatabase(Module);
        return Module;
    }).catch(error => {
        console.error("Error creating module: ", error);
        return error;
    });
}


export { getModule };