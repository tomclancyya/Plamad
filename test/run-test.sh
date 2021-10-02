#!/bin/sh

node --experimental-specifier-resolution=node ./test/test-engine/imports-manager.js test
node --experimental-specifier-resolution=node ./test/app-test.js
node --experimental-specifier-resolution=node ./test/test-engine/imports-manager.js production