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

Publishing uses npm trusted publishing from GitHub Actions, so the workflow does not need an `NPM_TOKEN` repository secret. npm requires a trusted publisher configuration for each published package. For a package that already exists, open the package on npmjs.com, then use **Settings -> Trusted Publisher** and add:

- provider: GitHub Actions
- organization or user: `matoous`
- repository: `treelight`
- workflow filename: `CI.yml`
- allowed action: `npm publish`

npm trusted publishing is package-level, not scope-level. For brand-new packages, publish the initial version manually from an npm account that can publish to `@treelight`, then configure the trusted publisher in each package's settings before relying on CI for subsequent releases.
