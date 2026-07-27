# Contributing

## Development

- `npm run build` runs `turbo run build`, compiling every workspace package.
- `npm run lint` fans out Biome via Turborepo so each workspace is checked independently.
- `npm run test` executes the integration test workspace.
- `npm run check:languages` validates each `@treelight/<language>` package's upstream grammar metadata and query file declarations.

Each language package declares its upstream grammar in `package.json` under `treelightLanguage`. Keep `repo`, `revision`, `artifact`, and `queries` in sync with the checked-in WASM and query files so future automation can compare the local package against upstream and generate bumps.

## Publishing

Treelight uses Changesets with all public `@treelight/*` packages in one fixed version group. Add a changeset for user-facing package changes:

```sh
npm run changeset
```

Infrastructure-only changes can use an empty changeset:

```sh
npm run changeset -- --empty
```

On `main`, the release workflow opens a version PR when changesets are present. Merging that PR publishes the public workspace packages to npm with `npm run release`.

The workflow needs an `NPM_TOKEN` repository secret with publish access to the `@treelight` scope. It also sets `NPM_CONFIG_PROVENANCE=true`, so npm publishes include provenance from GitHub Actions.
