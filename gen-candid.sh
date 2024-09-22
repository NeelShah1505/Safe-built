#!/bin/sh

cargo build --release --target wasm32-unknown-unknown --package BlockHero_backend && \
candid-extractor target/wasm32-unknown-unknown/release/BlockHero_backend.wasm > src/BlockHero_backend/BlockHero_backend.did
