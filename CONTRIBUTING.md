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

The release workflow uses the `CHANGESETS_TOKEN` repository secret for the Changesets GitHub token. Configure it as a fine-grained personal access token or GitHub App installation token with repository access to `matoous/treelight` and write access to contents and pull requests. This token is only for the GitHub release PR and branch updates.

Publishing uses npm trusted publishing from GitHub Actions, so the workflow does not need an `NPM_TOKEN` repository secret. Trusted publishing requires npm `11.5.1` or newer and Node.js `22.14.0` or newer in CI. The release workflow grants `id-token: write`; npm detects the GitHub Actions OIDC environment during `npm publish` and creates provenance automatically.

npm requires a trusted publisher configuration for each published package. For a package that already exists, open the package on npmjs.com, then use **Settings -> Trusted Publisher** and add:

- provider: GitHub Actions
- organization or user: `matoous`
- repository: `treelight`
- workflow filename: `ci.yaml`
- allowed action: `npm publish`

npm trusted publishing is package-level, not scope-level. The package must already exist before you can configure trusted publishing. For brand-new packages, publish an initial version manually from an npm account that can publish to `@treelight`, then configure the trusted publisher before relying on CI for subsequent releases.

When adding a new public package, bootstrap it locally before merging the release PR that should include it:

```sh
npm login
npm ci
npm run build
npm run publish:initial -- @treelight/<package>
```

`npm run publish:initial` only accepts explicit public workspace package names and requires each selected package to still be at `0.0.1`. It publishes each selected package with public access, then configures npm trusted publishing for the same package against `matoous/treelight` and `ci.yaml`. Future versions should then go through the normal Changesets release workflow on `main`.

The npm CLI trusted publishing setup requires npm `11.15.0` or newer, account-level 2FA, and interactive npm authentication; granular access tokens with bypass 2FA are not supported for `npm trust`.

If the initial publish succeeds but trusted publishing setup needs to be retried, run `npm run trust:packages -- @treelight/<package>` for the already-published package.

Pass multiple package names to bootstrap several new packages in one run:

```sh
npm run publish:initial -- @treelight/theme-ayu-dark @treelight/theme-dracula
```
