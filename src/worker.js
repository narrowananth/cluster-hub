import process from "process"

process.on("message", async props => {
	const { inputData, index, workerLocation } = props

	const { childCoreProcessFunc } = await import(workerLocation)

	childCoreProcessFunc({ data: inputData, cpuIndex: index })

	process.send("")
})
