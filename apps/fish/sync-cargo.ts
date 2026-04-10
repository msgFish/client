import fs from 'node:fs';
import pkg from './package.json';

const CARGO_TOML_PATH = "src-tauri/Cargo.toml";

const cargoToml = fs.readFileSync(CARGO_TOML_PATH, "utf-8");
let version = pkg.version;

const isWindows = process.env.BUILD_TARGET?.includes("windows");

function toMsiVersion(version: string) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-.*?(\d+))?/);
  if (!match) return version;

  const [, major, minor, patch, pre] = match;
  return pre
    ? `${major}.${minor}.${patch}.${pre}`
    : `${major}.${minor}.${patch}`;
}

if (isWindows) {
  version = toMsiVersion(version);
}

const updated = cargoToml.replace(
  /^version\s*=\s*".*"/m,
  `version = "${version}"`
);

fs.writeFileSync(CARGO_TOML_PATH, updated);