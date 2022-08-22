 Cluster Hub
=============

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
const clusterHub = require('@ananth_1725/cluster-hub')

clusterHub(data, workerLocation, onClusterFinish, onClusterError) // these four params are mandatory

`param - data`

`param type - data : array`

`param - workerLocation`

`param type - workerLocation : your logic file absolute path`

`param - onClusterFinish`

`param type - onClusterFinish : Callback function`

`Retur type - success response`

`param - onClusterError`

`param type - onClusterError : Callback function`

`Retur type - error response`


for example : data 

In the above example, `function()` declaration the data param is the most important thing. The data is your array, it is like [1,2,3,4,5].

for example : workerLocation

In the above example, `function()` declaration the workerLocation param is another important thing. The workerLocation have your absolute location of your worker `function()` logic. That worker `function` is your core logic. Let is see the small example below.

create one new file in the directory like sample.js. This sample.js file will export the core logic `function()`, you give this file absolute path in the npm `function()`. 

use the path pack for the worker core logic file location, like
const path = require('path') // Important for the path specification in your side
let paths = (path.join(__dirname, "./sample")) // give your core logic path in this path section
clusterHub(data, paths, onClusterFinish, onClusterError)

let sum = (props) => {
    return (props.index)
}
module.exports = sum

for example : onClusterFinish and onClusterError

In the above example, these two `function()`, are return you core logic success output or error output. So we declare these two `functions()`, For example

clusterHub(data, paths, (data) => {
 console.log(data)
}, (err) => {
    console.log(err)
})

```

## Conclusion

If you find any errors in this, please let me know about it by using raise issue.
