import { cpus } from "os"
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
				// The worker has finished its task, so exit gracefully.
				worker.disconnect()

				resolve()
			})

			worker.on("error", err => {
				// Handle errors in the worker process.
				console.error(`Worker ${i} encountered an error:`, err)

				worker.disconnect()

				reject(err)
			})

			worker.on("exit", (code, signal) => {
				if (code !== 0) {
					// The worker process exited with a non-zero code.
					console.error(`Worker ${i} exited with code ${code}`)

					reject(`Worker ${i} exited with code ${code}`)
				}
			})
		})

		workerPromises.push(workerProcess)
	}

	try {
		await Promise.all(workerPromises)

		console.log("All workers have finished their tasks.")

		process.exit(0) // Exit with a success status code.
	} catch (error) {
		console.error("Cluster encountered an error:", error)

		process.exit(1) // Exit with an error status code.
	}
}

const splitToChunks = (inputData, cpuCoresCount) => {
	const result = []

	for (let i = cpuCoresCount; i > 0; i--)
		// Reverse for loop.
		result.push(inputData.splice(0, Math.ceil(inputData.length / i)))

	return result
}
