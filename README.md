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
const clusterHub = require('cluster-hub')

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
```

## Conclusion

If you find any errors in this, please let me know about it by using raise issue.
