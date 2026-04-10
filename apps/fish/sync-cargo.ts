import fs from 'node:fs';
import pkg from './package.json';

const CARGO_CONFIG_PATH = "src-tauri/Cargo.toml";
const TAURI_CONFIG_PATH = "src-tauri/tauri.config.json";

const cargoConfig = fs.readFileSync(CARGO_CONFIG_PATH, "utf-8");
const semver = pkg.version;

const updatedCargo = cargoConfig.replace(
  /^version\s*=\s*".*"/m,
  `version = "${semver}"`
);

fs.writeFileSync(CARGO_CONFIG_PATH, updatedCargo);

/* Handle Windows because it's special */
const isWindows = process.env.BUILD_TARGET?.includes("windows");

if (isWindows) {
  const tauriConfig = JSON.parse(fs.readFileSync(TAURI_CONFIG_PATH, "utf-8"));

  tauriConfig.bundle = tauriConfig.bundle || {};
  tauriConfig.bundle.windows = tauriConfig.bundle.windows || {};
  tauriConfig.bundle.windows.wix = tauriConfig.bundle.windows.wix || {};

  const semverWindows = toMsiVersion(semver);

  tauriConfig.bundle.windows.wix.version = semverWindows;

  fs.writeFileSync(
    TAURI_CONFIG_PATH, 
    JSON.stringify(tauriConfig, null, 2)
  );
}

function toMsiVersion(version: string) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-.*?(\d+))?/);
  if (!match) return '0.0.0';

  const [, major, minor, patch, pre] = match;
  return pre
    ? `${major}.${minor}.${patch}.${pre}`
    : `${major}.${minor}.${patch}`;
}