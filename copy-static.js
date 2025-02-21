#!/usr/bin/env node
const { cp } = require("fs/promises");
const path = require("path");
const fs = require("fs");
const { fork } = require("child_process");
const ini = require('ini')

let total_waited = 0;
const MAX_WAIT = 5000;

async function waitForFileOrDir(source, interval = 100) {
  while (!fs.existsSync(source) && total_waited < MAX_WAIT) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    total_waited += interval;
  }
  if (total_waited >= MAX_WAIT) {
    throw new Error("Timed out waiting to copy static files");
  }
  return fs.existsSync(source);
}

function openPackageFileInDir(dir, wait = false) {
  if (!dir) {
    return undefined;
  }
  const pkj_path = path.join(dir, "package.json");
  if (wait) {
    waitForFileOrDir(pkj_path);
  }
  if(fs.existsSync(pkj_path)) {
    return JSON.parse(fs.readFileSync(pkj_path, "utf8"));
  }
  return undefined;
}
function moveUpDir(dir) {
  if (!dir) {
    throw new Error("Not in a directory");
  }
  return path.dirname(dir)
}

function findConsumerRoot() {
  let curr_dir = process.cwd();
  const root = path.parse(curr_dir).root;
  const lib_pkg = openPackageFileInDir(curr_dir, true);
  curr_dir = moveUpDir(curr_dir);
  while (curr_dir !== root) {
    const pkg = openPackageFileInDir(curr_dir);
    if (pkg !== undefined) {
      if (pkg.name !== lib_pkg.name) {
        return curr_dir;
      }
    }
    curr_dir = moveUpDir(curr_dir);
  }
  throw new Error("Could not get client root");
}

async function copyStaticFiles() {
  try {
    const source = path.resolve(__dirname, "lib", "static", "files");    
    await waitForFileOrDir(source);
    const consumer_root = findConsumerRoot();
    const ini_path = path.resolve(consumer_root, ".wiserrc");
    let config = {
      files: {
        destionation: 'public/files',
        skip: false,
        overwrite: false,
      },
    };
    if (fs.existsSync(ini_path)) {
      config = Object.assign(config, ini.parse(fs.readFileSync(ini_path, 'utf-8')));
      console.log(JSON.stringify(config));
    }
    if (config.files.skip) {
      console.log("Skipping static file copy.");
      return;
    }
    const destination = path.resolve(consumer_root, config.files.destination);
    await cp(source, destination, { recursive: true, force: config.files.overwrite });
    console.log(`Static files copied from ${source} to ${destination}`);
  } catch (error) {
    console.log("Error copying static files:", error);
    process.exit(0);
  }
}

(async () => {
  if (process.argv.includes("--child")) {
    copyStaticFiles();
  } else {
    console.log(`Postinstall: forking and waiting MAX ${Math.round(MAX_WAIT/1000)}s for static assets...`);
    setTimeout(() => {
      const child = fork(__filename, ["--child"], {
        detached: true,
        stdio: "inherit",
      });
      child.unref();
    }, 0);
  }
})();
