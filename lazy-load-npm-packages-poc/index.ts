
import fs = require('fs');
import path = require('path');
import childproc = require('child_process');

export class DynamicallyLoadedNpmPackage {

  public thePackage?: any;

  constructor(public readonly packageName: string) {
    console.log('constructor');
    this.thePackage = this.requireWrapper(this.packageName);

    if (!this.thePackage) {
      this.shellOutToNpmInstallPackage();
      this.thePackage = this.requireWrapperWithFallbacks();
    }
    if (this.thePackage) {
      console.log(`Successfully loaded ${this.packageName}`);
    }
  }

  public listPackageApis() {
    console.log(Object.keys(this.thePackage))
  }

  private requireWrapperWithFallbacks(): any {
    let p = this.requireWrapper(this.packageName);

    if (!p){
      // Try again after clearing the require cache
      this.clearNodeRequireCache();
      p = this.requireWrapper(this.packageName);

      if (!p) {
        // Try again with the absolute path
        const dir = this.checkRequirePathsForTheDynamicallyLoadedPackage();
        if (dir) {
          p = this.requireWrapper(dir);
        }
      }
    }
    return p;
  }

  private requireWrapper(input: string): any {
    console.log(`attempting require('${input}')`);
    try {
      return require(input);
    } catch (err) {
      console.log(`require('${input}') failed`);
      if (err instanceof Error) {
        console.error(err.name, err.message.split('\n')[0]);
      }
    }
  }

  private checkRequirePathsForTheDynamicallyLoadedPackage(): string {
    console.log("Checking require paths for the desired package...")
    let resultDir = "";
    console.log("  require paths: ", JSON.stringify(require.main?.paths));
    require.main?.paths.forEach((p) => {
      const dir = path.join(p, this.packageName);
      const testPath = path.join(dir, 'package.json')
      try {
        const statTestPathResult = fs.statSync(testPath);
        if (statTestPathResult.isFile()) {
          console.log(`  Success: ${testPath} is a file.`);
          resultDir = dir;
        }
      } catch(err) {
        // Do  nothing
      }
    });
    if (!resultDir) {
      console.log(`  Failure: ${this.packageName} does not exist in any of the require paths`)
    }
    return resultDir;
  }

  private shellOutToNpmInstallPackage() {
    const prefix = require.main?.paths[0].split('/').slice(0, -1).join('/');
    console.log(`Shelling out to run npm install ${this.packageName} --no-save --prefix ${prefix}`);
    const result = childproc.execSync(`pwd; npm prefix; npm install ${this.packageName} --no-save --prefix ${prefix}`);
    console.log(result.toString('utf8'));
  }

  private clearNodeRequireCache() {
    console.log('Clearing require.cache');
    Object.keys(require.cache).forEach(function(key) { delete require.cache[key] });
    console.log('require cache: ', require.cache);
  }
}