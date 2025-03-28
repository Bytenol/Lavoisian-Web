// import createModule from "./lavoisian";

const DATABASE_NAME = "lavoisian";
const DATABASE_PATH = `${DATABASE_NAME}/${DATABASE_NAME}.db`; // Path inside Emscripten FS
const PUBLIC_DB_URL = `lib/esm/${DATABASE_NAME}.db`; // URL served from /public


const initDatabase = async(Module) => {
    return fetch(PUBLIC_DB_URL)
    .then(response => response.arrayBuffer())
    .then(buffer => {
        Module.FS.mkdir(`/{${DATABASE_NAME}`);
        Module.FS.mount(Module.IDBFS, {}, `/{${DATABASE_NAME}`);
        Module.FS.writeFile(DATABASE_PATH, new Uint8Array(buffer));
        Module.FS.syncfs(false, err => {
            if(err) console.error("Failed to sync with indexDB: ", err);
        });
        return buffer;
    })
    .catch(error => {
        console.error("Error getting database: ", error);
        return error;
    });
}


const loadWasmModule = async function () {
    if(window.Module)
        return Promise.resolve(window.Module);

    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "./lib/esm/lavoisian.js";
        script.type = "module";

        script.onload = () => {
            console.log(Module);
            // createModule().then((instance) => {
            //     window.Module = instance; // Store the WASM module globally
            //     console.log("WASM Module Loaded!");
            //     console.log(window.Module);
            //     // initDatabase(window.Module).then(e => {
            //     //     resolve(e);
            //     // })
            // }).catch(reject);
        }

        script.onerror = reject;

        document.body.appendChild(script);
    });
}


// export {
//     loadWasmModule
// }