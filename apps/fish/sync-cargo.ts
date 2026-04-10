import fs from 'node:fs';
import pkg from './package.json';

const CARGO_TOML_PATH = "src-tauri/Cargo.toml";

const cargoToml = fs.readFileSync(CARGO_TOML_PATH, "utf-8");

const updated = cargoToml.replace(
  /^version\s*=\s*".*"/m,
  `version = "${pkg.version}"`
);

fs.writeFileSync(CARGO_TOML_PATH, updated);