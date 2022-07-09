#!/usr/bin/env python3
from lazy_load_npm_packages_poc import DynamicallyLoadedNpmPackage

print('index.py entrypoint')

package = DynamicallyLoadedNpmPackage(package_name='@aws-cdk/core')

package.list_package_apis()