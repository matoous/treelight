<div align="center">

# Treelight

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) based syntax highlighter for javascript runtimes.

</div>

## When to use Treelight

- Ideal for pre-rendered code: docs sites, design systems, MDX/markdown pipelines, and server-side rendering where the wasm cost can be amortized.
- Less suitable for latency-sensitive editors or client bundles that must stay tiny: the binaries are sizeable and each language requires an asynchronous setup step.
- Works well when you can control the runtime (Node 18+, SSR frameworks, build scripts) and ship the final HTML rather than running the highlighter in every browser session.

Treelight shines (pun intended) when you can prepare highlights ahead of time; if you need an always-on client highlighter, consider a lighter, regex-based option.

## Usage

Install `@treelight/core` using `npm`:

```sh
npm i @treelight/core
```

In your code:

The runtime is completely modular. Both languages and themes are optional add-ons, so browser bundles remain relatively small and you only ship what you use.

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

 `Highlighter.create` downloads and initializes every language you pass in, so the returned `highlighter.highlight` method is synchronous and ready to use inside render functions or server handlers. JavaScript constructors cannot be `async`, so the static `create` helper performs the asynchronous setup and returns a ready-to-use instance. Prefer the class directly if you need access to the underlying `Treelight` instance, or call the convenience `createHighlighter` helper which simply forwards to `Highlighter.create`.

## How this works

Treelight compiles Tree-sitter grammars to WebAssembly, loads their highlight queries, and runs `tree_sitter_highlight` to produce tagged ranges. Those ranges are merged into HTML spans using the selected theme palette. Because wasm modules and queries are loaded once during `Highlighter.create`, every subsequent `highlight` call is synchronous and cheap.

### Languages

Languages are published as standalone packages named `@treelight/<language>`. Each package contains the Tree-sitter highlight queries plus a `wasmUrl` that points at the official Tree-sitter WebAssembly artifact on GitHub (see [`tree-sitter/tree-sitter`](https://github.com/tree-sitter/tree-sitter/tree/master/lib/binding_web#from-github)). When you register the language, Treelight downloads that wasm at runtime (Node 18+ is required so that `fetch` is available).

To add another language, copy one of the existing packages under `packages/languages/`, update the `id`, `wasmUrl`, and query strings, then publish the package or wire it into your workspace. The language id should match the upstream Tree-sitter grammar (`javascript`, `typescript`, `lua`, `rust`, …) so that users can install it consistently:

```sh
npm i @treelight/core @treelight/typescript @treelight/javascript
```

### Themes and highlight scopes

Treelight currently ships two GitHub-derived themes as workspace packages (`@treelight/theme-github-dark` and `@treelight/theme-github-light`). Register whichever one you need:

```ts
import githubLight from '@treelight/theme-github-light'

registerTheme(githubLight)
```

Themes are plain objects that map Tree-sitter highlight names (e.g. `@function.call`, `@variable.parameter`) to CSS classes and colors. Refer to the [Tree-sitter highlighting docs](https://tree-sitter.github.io/tree-sitter/syntax-highlighting#highlights) for the list of available scopes. If you need additional themes, duplicate one of the existing packages under `packages/themes/` and adjust the colors manually. The main package no longer builds themes automatically.

## Development

- `npm run build` runs `turbo run build`, compiling every workspace package.
- `npm run lint` fans out Biome via Turborepo so each workspace is checked independently.
- `npm run test` executes the integration test workspace (see `packages/integration`).
