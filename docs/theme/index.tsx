import { BrowserOnly } from '@rspress/core/runtime';
import type {
  HomeLayoutProps,
  LayoutProps,
} from '@rspress/core/theme-original';
import {
  Link,
  HomeLayout as OriginalHomeLayout,
  Layout as OriginalLayout,
} from '@rspress/core/theme-original';
import '@treelight/plugin-rspress/copy';

const navMark = (
  <img
    src="/favicon.svg"
    alt=""
    aria-hidden="true"
    className="treelight-nav-mark"
    width={28}
    height={28}
  />
);

function NavWordmark() {
  return (
    <div className="rp-nav__title">
      <Link
        href="/"
        className="rp-nav__title__link treelight-nav-brand"
        aria-label="Treelight"
      >
        {navMark}
        <span className="treelight-wordmark" aria-hidden="true">
          <span className="treelight-wordmark__tree">Tree</span>
          <span className="treelight-wordmark__light">light</span>
        </span>
      </Link>
    </div>
  );
}

export function Layout(props: LayoutProps) {
  return (
    <OriginalLayout {...props} navTitle={props.navTitle ?? <NavWordmark />} />
  );
}

function Explorer() {
  return (
    <section className="home-explorer-section rp-doc">
      <section
        className="showcase"
        aria-label="Interactive syntax highlighting demo"
      >
        <BrowserOnly
          fallback={<div className="demo-loading">Loading highlighter...</div>}
        >
          {async () => {
            const { default: Demo } = await import('../src/App');
            return <Demo />;
          }}
        </BrowserOnly>
      </section>
    </section>
  );
}

export function HomeLayout(props: HomeLayoutProps) {
  return (
    <OriginalHomeLayout
      {...props}
      afterHero={
        <>
          {props.afterFeatures}
          <Explorer />
        </>
      }
    />
  );
}

export * from '@rspress/core/theme-original';
