import { cpus } from "os"
import process from "process"
import { fork } from "child_process"
import path from "path"
import { fileURLToPath } from "url"

const cpuCores = cpus().length

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

export const cluster = async (inputData, workerLocation) => {
	const chunks = splitToChunks(inputData, cpuCores)

	const workerPromises = []

	for (let i = 0; i < cpuCores; i++) {
		const workerProcess = new Promise((resolve, reject) => {
			const worker = fork(path.join(__dirname, "worker.js"), [i])

			worker.send({ inputData: chunks[i], index: i, workerLocation })

			worker.on("message", () => {
				worker.disconnect()

				resolve()
			})

			worker.on("error", () => {
				worker.disconnect()

				reject()
			})
		})

		workerPromises.push(workerProcess)
	}

	Promise.all(workerPromises).then(async value => {
		process.exit()
	})
}

const splitToChunks = (inputData, cpuCoresCount) => {
	const result = []

	for (let i = cpuCoresCount; i > 0; i--)
		//reverse for loop
		result.push(inputData.splice(0, Math.ceil(inputData.length / i)))

	return result
}
