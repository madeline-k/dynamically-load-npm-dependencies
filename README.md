# dynamically-load-lambda-layer-dependencies

This repository is for a proof-of-concept showing it is possible to...
- Download an npm package, then `require()` and use it at runtime using Node.js. 
- Download an npm package, then `require()` and use it in the [jsii runtime](https://aws.github.io/jsii/overview/runtime-architecture/) for a jsii target language. In this case, Python was used.
- Use the same npm package in a network-restricted environment if it was installed in the consuming TS/JS project, before execution.
- Use the same npm package in a network-restricted environment if it's jsii target language version was installed in the consuming project. In this case, if it's Python version was installed before execution. 


This repository has 3 subdirectories:
