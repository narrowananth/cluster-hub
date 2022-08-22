const numCPUs = require('os').cpus().length
const process = require('process')
const { fork } = require('child_process')
const path = require('path')

let splitToChunks = (data, parts) => {
    let result = []
    for (let i = parts; i > 0; i--) { //reverse for loop
        result.push(data.splice(0, Math.ceil(data.length / i)))
    }
    return result
}

let cluster = (data, workerLocation, onClusterFinish, onClusterError) => {

    let chunks = splitToChunks(data, numCPUs)
    let workerPromises = []

    for (let i = 0; i < numCPUs; i++) {
        let workerProcess = new Promise((resolve, reject) => {
            let worker = fork(path.join(__dirname, 'worker.js'), [i])
            worker.send({ data: chunks[i], index: i, workerLocation })
            worker.on("message", ({ status, childWorkerResponse, error }) => {
                if (status === "success") {
                    resolve(childWorkerResponse)
                } else if (status === "failure") {
                    reject(error)
                } else {
                    resolve()
                }
                worker.disconnect()
            })
            worker.on("error", () => {
                worker.disconnect()
                reject()
            })
        })
        workerPromises.push(workerProcess)
    }

    Promise.all(workerPromises).then((workerPromiseData) => {
        if (onClusterFinish) {
            onClusterFinish(workerPromiseData)
        } else {
            process.exit()
        }
    }).catch((workerPromiseError) => {
        if (onClusterError) {
            onClusterError(workerPromiseError)
        }
    })
}

module.exports = cluster