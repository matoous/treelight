<div align="center">

# Treelight

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) based syntax highlighter for javascript runtimes.
Uses [helix](https://github.com/helix-editor/helix) queries and themes under the hood.

</div>

## Usage

Install `@treelight/core` using `npm`:

```sh
npm i @treelight/core
```

In your code:

The runtime is completely modular. Both languages and themes are optional
add-ons, so browser bundles remain tiny and you only ship what you use.

```ts
import { Highlighter } from '@treelight/core'
import javascript from '@treelight/javascript'
import githubDark from '@treelight/theme-github-dark'

const highlighter = await Highlighter.create({
  languages: [['javascript', javascript]],
  themes: [githubDark],
  theme: 'github-dark',
})

const html = highlighter.highlight(`console.info("Hello World!")`, 'javascript')
document.body.innerHTML = html
```

`Highlighter.create` downloads and initializes every language you pass in, so
the returned `highlighter.highlight` method is synchronous and ready to use
inside render functions or server handlers. JavaScript constructors cannot be
`async`, so the static `create` helper performs the asynchronous setup and
returns a ready-to-use instance. Prefer the class directly if you need access to
the underlying `Treelight` instance, or call the convenience `createHighlighter`
helper which simply forwards to `Highlighter.create`.

### Languages

Languages are published as standalone packages named
`@treelight/<language>`. Each package contains the Helix highlight
queries plus a `wasmUrl` that points at the official Tree-sitter WebAssembly
artifact on GitHub (see
[`tree-sitter/tree-sitter`](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web#from-github)).
When you register the language, Treelight downloads that wasm at runtime (Node
18+ is required so that `fetch` is available).

To add another language, copy one of the existing packages under
`packages/languages/`, update the `id`, `wasmUrl`, and query strings, then
publish the package or wire it into your workspace. The language id should match
Helix's naming (`javascript`, `typescript`, `lua`, `rust`, …) so that users can
install it consistently:

```sh
npm i @treelight/core @treelight/typescript @treelight/javascript
```

### Themes

Treelight currently ships the GitHub theme family as workspace packages
(`@treelight/theme-github-dark`, `@treelight/theme-github-light`, etc.). You can
register whichever ones you need:

```ts
import githubLight from '@treelight/theme-github-light'

registerTheme(githubLight)
```

If you need additional themes, duplicate one of the existing packages under
`packages/themes/` and adjust the colors manually. The main package no longer
builds themes automatically.

## Development

- `npm run build` runs `turbo run build`, compiling every workspace package.
- `npm run lint` fans out Biome via Turborepo so each workspace is checked independently.
- `npm run test` executes the integration test workspace (see `packages/integration`).
