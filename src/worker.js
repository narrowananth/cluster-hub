import process from "process"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

process.on("message", async props => {
	const { workerLocation } = props

	const { childCoreProcessFunc } = await import(path.join(__dirname, "..", workerLocation))

	childCoreProcessFunc(props)

	process.send("")
})
