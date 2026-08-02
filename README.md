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
- `@treelight/plugin-astro` installs Treelight as an Astro Markdown/MDX code block integration.
- `@treelight/plugin-rehype` renders HTML AST code blocks with Treelight in unified pipelines.
- `@treelight/plugin-remark` renders Markdown AST code blocks with Treelight when a remark-stage transform is needed.
- `@treelight/plugin-rspress` integrates Treelight with Rspress's Shiki pipeline.
- `@treelight/<language>` packages select cacheable WASM assets in browser bundles and self-contained definitions in Node and SSR runtimes.
- `@treelight/theme-<theme>` packages provide bundled themes.

Bundled language packages currently cover Astro, AWK, Bash, C, C#, C++, comment annotations, CSS, Dart, Dockerfile, Elixir, ERB, Fish, Go, Go format strings, GraphQL, HCL/Terraform, HEEx, HTML, Java, JavaScript, jq, JSDoc, JSON, Kotlin, LaTeX, Lua, Lua format strings, Markdown, Markdown inline, Nix, PHP, PHPDoc, PowerShell, Protobuf, Python, regular expressions, Ruby, Rust, Scheme, SQL, Svelte, Swift, TOML, TSX, TypeScript, Vue, YAML, and Zig.

Bundled theme packages currently cover Ayu Dark, Catppuccin Mocha, Dracula, Everforest Dark, GitHub Dark, GitHub Light, Gruvbox, Gruvbox Material, Kanagawa, Nord, One Dark, Rose Pine, Solarized Light, and Tokyo Night.

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

Language packages automatically use a URL to the grammar in Vite and Astro browser builds. The bundler emits the WASM as a hashed, cacheable asset, and the first highlight fetches it without any asset-copy or `locateFile` configuration. Node and SSR imports remain self-contained.

Use an explicit `/browser` or `/embedded` import only when you need to override that automatic selection.

Eager imports are simpler when the language list is small. Lazy imports are better for browser apps that expose many languages.

## Injections

Injection queries highlight one language embedded inside another. Register both the host language and each injection target you want to use:

```ts
import comment from '@treelight/comment'
import { Highlighter } from '@treelight/core'
import go from '@treelight/go'
import goFormatString from '@treelight/go-format-string'
import regex from '@treelight/regex'

const highlighter = await Highlighter.create({
  languages: [go, comment, goFormatString, regex],
})

const html = highlighter.highlight(
  `// TODO: validate this pattern
pattern := regexp.MustCompile(\`^[a-z]+$\`)
fmt.Printf("matches: %03d", total)`,
  'go',
)
```

Treelight discovers injections recursively. For example, TypeScript can inject JSDoc, which can inject comment annotations or a fenced example language. Unregistered targets are skipped without breaking the host highlight.

See the [injection guide](./docs/src/injections.mdx) for bundled host/target combinations, lazy registration, and supported query directives.

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

The generated HTML uses capture-derived classes and inline colors, so applications can render the returned string into their own markup pipeline. Treelight follows Helix's syntax-scope taxonomy but currently supports a smaller theme format: `id`, `styles`, and `fg`/`bg` color channels. See the [theme reference](./docs/src/theme-reference.mdx) for every supported option and scope.

## How It Works

Language packages export a `LanguageDefinition` containing:

- a language id, such as `javascript` or `rust`
- compiled grammar WASM
- Tree-sitter highlight and injection queries

Treelight loads those definitions into `web-tree-sitter`, runs Tree-sitter highlighting, and renders the captured ranges into themed HTML spans. When a host language's injection query names another registered language, Treelight parses that range with the injected grammar and layers its captures over the host highlights. Include injected languages in `Highlighter.create({ languages: [...] })`, or register them as lazy loaders when using `Treelight` directly.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development, language-package maintenance, and publishing instructions.
