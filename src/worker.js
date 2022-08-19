const process = require('process')

process.on('message', async(props) => {
    let { workerLocation } = props
    let childWorker = require(workerLocation)
    try {
        let childWorkerResponse = await childWorker(props)
        process.send({ status: "success", childWorkerResponse })
    } catch (error) {
        process.send({ status: "failure", error })
    }
})