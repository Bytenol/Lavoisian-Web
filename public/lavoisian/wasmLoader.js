// import createModule from "./lavoisian";

const DATABASE_NAME = "lavoisian";
const DATABASE_PATH = `${DATABASE_NAME}/${DATABASE_NAME}.db`; // Path inside Emscripten FS
const PUBLIC_DB_URL = `/lavoisian/${DATABASE_NAME}.db`; // URL served from /public

window.LavoisianDbLoaded = false;

const initDatabase = async(Module) => {
    return fetch(PUBLIC_DB_URL)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        const dir = `/${DATABASE_NAME}`;
        if (FS.analyzePath(dir).exists) {
            return buffer;
        }
        Module.FS.mkdir(dir);
        Module.FS.mount(Module.IDBFS, {}, `/${DATABASE_NAME}`);
        Module.FS.writeFile(DATABASE_PATH, new Uint8Array(buffer));
        Module.FS.syncfs(false, err => {
            if(err) console.error("Failed to sync with indexDB: ", err);
            window.LavoisianDbLoaded = true;
        });
        return buffer;
    })
    .catch(error => {
        console.error("Error getting database: ", error);
        return error;
    });
}


const loadWasmModule = async function () {
    if(window.LavoisianDbLoaded)
        return Promise.resolve(window.Module);

    await initDatabase(window.Module);
    if(!window.Module.Init(DATABASE_PATH)) {
        window.LavoisianDbLoaded = false;
        console.error("Unable to make database connection to lavoisian.db");
    }
    return Promise.resolve(window.Module);
}


window.runLavoisian = async function()
{
    const module = await loadWasmModule();
    return Promise.resolve(module);
}