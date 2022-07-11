import { DynamicallyLoadedNpmPackage } from "lazy-load-npm-packages-poc";

const cdkCore = new DynamicallyLoadedNpmPackage("@aws-cdk/core");

cdkCore.listPackageApis();