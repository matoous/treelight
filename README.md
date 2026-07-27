<div align="center">

# Treelight

[Tree-sitter](https://tree-sitter.github.io/tree-sitter/) based syntax highlighter for JavaScript runtimes.

</div>

Treelight is a code-highlighter based on Tree-sitter grammars. It gives you the most accurate highlights and at cost of bundle size. It is split into small packages, so applications install the runtime plus only the languages and themes they use.

## When to Use Treelight

- Good fit for docs sites, design systems, MDX/markdown pipelines, static generation, SSR, and other flows where code blocks can be highlighted ahead of time.
- Useful when you want Tree-sitter-quality parsing instead of regex-based highlighting.
- Less suitable for latency-sensitive editors or very small client bundles: each language includes a grammar WASM payload and needs asynchronous setup.

## Packages

- `@treelight/core` provides the runtime, language/theme registration, and highlighter APIs.
- `@treelight/browser` configures `web-tree-sitter` for browser bundlers and re-exports the core API.
- `@treelight/<language>` packages provide language definitions with inlined grammar WASM and highlight queries.
- `@treelight/theme-github-dark` and `@treelight/theme-github-light` provide bundled themes.

Bundled language packages currently cover Bash, C, C++, CSS, Dockerfile, Elixir, Go, GraphQL, HTML, Java, JavaScript, JSON, Lua, Markdown, PHP, Python, Ruby, Rust, Scheme, SQL, TOML, TSX, TypeScript, YAML, and Zig.

## Node and SSR Usage

Install the runtime, at least one language, and a theme:

```sh
npm i @treelight/core @treelight/javascript @treelight/theme-github-dark
```

Create a highlighter once, then reuse it for synchronous highlighting:

```ts
import { Highlighter } from '@treelight/core'
import javascript from '@treelight/javascript'
import githubDark from '@treelight/theme-github-dark'

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
})

const html = highlighter.highlight(`console.info("Hello World!")`, 'javascript')
```

`Highlighter.create` loads every registered language up front. After that, `highlighter.highlight(...)` is synchronous and ready to use in render functions, server handlers, or build scripts.

## Browser Usage

Browser apps also need the shared `web-tree-sitter` runtime WASM. Use `@treelight/browser` so bundlers such as Vite can resolve that asset:

```sh
npm i @treelight/browser @treelight/javascript @treelight/theme-github-dark
```

```ts
import { createBrowserHighlighter } from '@treelight/browser'
import javascript from '@treelight/javascript'
import githubDark from '@treelight/theme-github-dark'

const highlighter = await createBrowserHighlighter({
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
})

document.body.innerHTML = highlighter.highlight(
  `console.info("Hello World!")`,
  'javascript',
)
```

If your bundler cannot resolve `web-tree-sitter/web-tree-sitter.wasm?url`, pass `parserWasmUrl`:

```ts
import { createBrowserHighlighter } from '@treelight/browser'
import javascript from '@treelight/javascript'
import githubDark from '@treelight/theme-github-dark'

const highlighter = await createBrowserHighlighter({
  parserWasmUrl: '/assets/web-tree-sitter.wasm',
  languages: [javascript],
  themes: [githubDark],
  theme: 'github-dark',
})
```

## Lazy Language Loading

For applications where users can choose from many languages, register lazy imports so each language stays in its own browser chunk:

```ts
import { createBrowserTreelight } from '@treelight/browser'
import githubDark from '@treelight/theme-github-dark'

const treelight = createBrowserTreelight({
  themes: [githubDark],
  theme: 'github-dark',
})

treelight.registerLanguage('javascript', () => import('@treelight/javascript'))
treelight.registerLanguage('typescript', () => import('@treelight/typescript'))

const html = await treelight.highlight(code, 'typescript')
```

Eager imports are simpler when the language list is small. Lazy imports are better for browser apps that expose many languages.

## Themes

Themes are plain objects that map Tree-sitter highlight captures, such as `@function.call` or `@variable.parameter`, to CSS classes and colors. Register a bundled theme during highlighter creation:

```ts
import { Highlighter } from '@treelight/core'
import javascript from '@treelight/javascript'
import githubLight from '@treelight/theme-github-light'

const highlighter = await Highlighter.create({
  languages: [javascript],
  themes: [githubLight],
  theme: 'github-light',
})
```

The generated HTML uses the theme classes directly, so applications can render the returned string into their own markup pipeline.

## How It Works

Language packages export a `LanguageDefinition` containing:

- a language id, such as `javascript` or `rust`
- compiled grammar WASM
- Tree-sitter highlight queries

Treelight loads those definitions into `web-tree-sitter`, runs Tree-sitter highlighting, and renders the captured ranges into themed HTML spans.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development, language-package maintenance, and publishing instructions.
