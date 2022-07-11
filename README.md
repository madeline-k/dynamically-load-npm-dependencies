# dynamically-load-npm-dependencies

This repository is for a proof-of-concept showing it is possible to...
- Download an npm package, then `require()` and use it at runtime using Node.js. 
- Download an npm package, then `require()` and use it in the [jsii
  runtime](https://aws.github.io/jsii/overview/runtime-architecture/) for a jsii
  target language. In this case, Python was used.
- Use the same npm package in a network-restricted environment if it was
  installed in the consuming TS/JS project, before execution.
- Use the same npm package in a network-restricted environment if it's jsii
  target language version was installed in the consuming project. In this case,
  if it's Python version was installed before execution. 


This repository has 3 subdirectories:

`lazy-load-npm-packages-poc/`: A jsii library containing the logic to dynamically load npm dependencies at runtime.

`python-consumer/`: A Python project that uses `lazy-load-npm-packages-poc`.

`node-consumer/`: A TypeScript project that uses `lazy-load-npm-packages-poc`.

## Steps to build and test

### Build & Package the jsii library

```
cd lazy-load-npm-packages-poc
npm run build && npm run package
```

### Test Python consumer

#### Setup

```
cd python-consumer
python3 -m venv .env
source .env/bin/activate
pip install -r requirements.txt
```

#### Test with network

```
./index.py
```

#### Test without network

1. Clear npm cache, and install the Python version of the dependency.
```
npm cache clean --force
pip install aws-cdk.core
```

2. Turn your mac into airplane mode or turn off wi-fi.

3. For the npm version of the dependency to be available in the jsii runtime
process, the Python library has to have been loaded/imported already. Add the
following or something similar to `./index.py`:

```
from aws_cdk.core import App
```

4. Run it.

```
./index.py
```

### Test Node consumer

#### Setup

```
npm install
npx tsc
```

#### Test with network

```
node ./index.js
```

#### Test without network

1. Clear npm cache, and install the dependency you are trying to dynamically load.
```
npm cache clean --force
npm install @aws-cdk/core
```

2. Turn your mac into airplane mode or turn off wi-fi.

3. Run it.

```
node ./index.js
```