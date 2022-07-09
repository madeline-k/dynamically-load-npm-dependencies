# Run this script after making changes to the jsii library in ../lazy-load-npm-packages-poc
pip uninstall lazy_load_npm_packages_poc -y
pip install ../lazy-load-npm-packages-poc/dist/python/lazy_load_npm_packages_poc-1.0.0-py3-none-any.whl