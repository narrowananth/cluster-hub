# Cluster Hub

This NPM package usefull for reduce the work load.

for example, consider there is a array of jobs that will be run same function every time, if the array length is 100 that function will be called every time it also processes 100 times.

So this NPM package will be partitioned that work load between the number of proccessors in cpus.

This NPM package build purpose is to reduce your work load, time management and also use your all core proccessors in the cpus

## Installation

You can install the cluster-hub from npm by running.

```sh
npm i @ananth_1725/cluster-hub
```

## Usage

```js

import cluster from "@ananth_1725/cluster-hub"

cluster(data,childCoreProcessFuncLocation) // these two params are mandatory

`param - data`

`param type - data : array`

`param - childCoreProcessFuncLocation`

`param - type - childCoreProcessFuncLocation : your child core logic function absolute file path`

for example :-

const data = [1,2,3,4]

const childCoreProcessFuncLocation = "/Users/ananths/scripts/src/core/integration/integration-report.js" // file path given like this else throw error or not properly process.

cluster(data,childCoreProcessFuncLocation)



Also kindly use the child core function name as `childCoreProcessFunc`. Because this name is predefined. // else throw error or not properly process

const childCoreProcessFunc = (sampleData) => { // sampleData is object

    interface sampleData : {
        data : any
        cpuIndex : number
    }

    console.log(sampleData)
}

Finally you got sliced input to your childCoreProcessFunc(), You can perform your work on this function

```

## Conclusion

If you find any errors in this, please let me know about it by using raise issue.
