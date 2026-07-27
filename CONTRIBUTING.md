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

Publishing uses npm trusted publishing from GitHub Actions, so the workflow does not need an `NPM_TOKEN` repository secret. Trusted publishing requires npm `11.5.1` or newer and Node.js `22.14.0` or newer in CI. The release workflow grants `id-token: write`; npm detects the GitHub Actions OIDC environment during `npm publish` and creates provenance automatically.

npm requires a trusted publisher configuration for each published package. For a package that already exists, open the package on npmjs.com, then use **Settings -> Trusted Publisher** and add:

- provider: GitHub Actions
- organization or user: `matoous`
- repository: `treelight`
- workflow filename: `CI.yml`
- allowed action: `npm publish`

npm trusted publishing is package-level, not scope-level. The package must already exist before you can configure trusted publishing. For brand-new packages, publish an initial version manually from an npm account that can publish to `@treelight`, then configure the trusted publisher before relying on CI for subsequent releases.

The npm CLI can configure trusted publishing in bulk after the packages exist. It requires npm `11.15.0` or newer, account-level 2FA, and interactive npm authentication; granular access tokens with bypass 2FA are not supported for `npm trust`.

```sh
for package in \
  @treelight/browser \
  @treelight/core \
  @treelight/ecma \
  @treelight/elixir \
  @treelight/go \
  @treelight/html \
  @treelight/java \
  @treelight/javascript \
  @treelight/json \
  @treelight/php \
  @treelight/python \
  @treelight/rust \
  @treelight/scheme \
  @treelight/theme-github-dark \
  @treelight/theme-github-light \
  @treelight/tsx \
  @treelight/typescript \
  @treelight/yaml
do
  npm trust github "$package" --repo matoous/treelight --file CI.yml --allow-publish --yes
  sleep 2
done
```
