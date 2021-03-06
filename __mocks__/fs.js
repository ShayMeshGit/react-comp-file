"use strict";

const path = require("path");

const fs = jest.createMockFromModule("fs");

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = Object.create(null);
  for (const file in newMockFiles) {
    const dir = path.dirname(file);

    if (!mockFiles[dir]) {
      mockFiles[dir] = [];
    }
    mockFiles[dir].push(path.basename(file));
  }
}
function writeFileSync(directoryPath, data) {
  mockFiles[directoryPath] = data;
}

function existsSync(directoryPath) {
  return Object.keys(mockFiles).some((dir) => dir === directoryPath);
}

// A custom version of `readdirSync` that reads from the special mocked out
// file list set via __setMockFiles
function readdirSync(directoryPath) {
  return mockFiles[directoryPath] || [];
}

function mkdirSync(directoryPath) {
  mockFiles[directoryPath] = "";
}

fs.__setMockFiles = __setMockFiles;
fs.writeFileSync = writeFileSync;
fs.existsSync = existsSync;
fs.mkdirSync = mkdirSync;
fs.readdirSync = readdirSync;

module.exports = fs;
