import { BrowserOnly } from '@rspress/core/runtime';
import type { HomeLayoutProps } from '@rspress/core/theme-original';
import { HomeLayout as OriginalHomeLayout } from '@rspress/core/theme-original';

function CodeSample() {
  return (
    <section
      className="home-code-sample rp-doc"
      aria-label="Quick install example"
    >
      <div className="home-code-copy">
        <h2>Small packages, reusable highlighters.</h2>
        <p>
          Install the runtime, add one language and one theme, then create the
          highlighter once for your renderer.
        </p>
      </div>
      <div className="home-code-panel">
        <div className="home-panel-header">
          <span>install</span>
          <span>browser + static</span>
        </div>
        <pre>
          <code>{`npm i @treelight/core \\
  @treelight/javascript \\
  @treelight/theme-github-dark

const highlighter =
  await createHighlighter({
  languages: [javascript],
  themes: [githubDark],
});`}</code>
        </pre>
      </div>
    </section>
  );
}

function Explorer() {
  return (
    <section className="home-explorer-section rp-doc">
      <div className="home-explorer-heading">
        <h2>Try the runtime in place.</h2>
        <p>
          Edit the source, switch languages, and compare themes against the
          generated highlighted output.
        </p>
      </div>
      <div className="showcase" aria-label="Interactive syntax highlighting demo">
        <BrowserOnly
          fallback={<div className="demo-loading">Loading highlighter...</div>}
        >
          {async () => {
            const { default: Demo } = await import('../src/App');
            return <Demo />;
          }}
        </BrowserOnly>
      </div>
    </section>
  );
}

export function HomeLayout(props: HomeLayoutProps) {
  return (
    <OriginalHomeLayout
      {...props}
      afterHero={
        <>
          {props.afterHero}
          <CodeSample />
        </>
      }
      afterFeatures={
        <>
          {props.afterFeatures}
          <Explorer />
        </>
      }
    />
  );
}

export * from '@rspress/core/theme-original';
