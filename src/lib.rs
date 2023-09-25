use std::path::PathBuf;

use lazy_static::lazy_static;
use napi::bindgen_prelude::*;
use napi_derive::napi;
use tree_sitter_highlight::{HighlightConfiguration, Highlighter, HtmlRenderer};

use crate::theme::{Color, Theme};

pub mod theme;

lazy_static! {
  static ref THEME_DEFAULT: Theme = Theme::from("default");
  static ref THEME_GITHUB_DARK: Theme = Theme::from("github_dark");
  static ref THEME_GITHUB_LIGHT: Theme = Theme::from("github_light");
}

#[napi(string_enum)]
#[allow(non_camel_case_types)]
pub enum Language {
  c,
  go,
  js,
  jsx,
  ts,
  tsx,
}

lazy_static! {
  static ref JS_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let mut config = HighlightConfiguration::new(
      tree_sitter_javascript::language(),
      tree_sitter_javascript::HIGHLIGHT_QUERY,
      tree_sitter_javascript::INJECTION_QUERY,
      tree_sitter_javascript::LOCALS_QUERY,
    )
    .unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
  static ref JSX_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let mut highlights = tree_sitter_javascript::JSX_HIGHLIGHT_QUERY.to_owned();
    highlights.push_str(tree_sitter_javascript::HIGHLIGHT_QUERY);

    let mut config = HighlightConfiguration::new(
      tree_sitter_javascript::language(),
      &highlights,
      tree_sitter_javascript::INJECTION_QUERY,
      tree_sitter_javascript::LOCALS_QUERY,
    )
    .unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
  static ref TS_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let mut highlights = tree_sitter_typescript::HIGHLIGHT_QUERY.to_owned();
    highlights.push_str(tree_sitter_javascript::HIGHLIGHT_QUERY);

    let mut locals = tree_sitter_typescript::LOCALS_QUERY.to_owned();
    locals.push_str(tree_sitter_javascript::LOCALS_QUERY);

    let mut config = HighlightConfiguration::new(
      tree_sitter_typescript::language_typescript(),
      &highlights,
      tree_sitter_javascript::INJECTION_QUERY,
      &locals,
    )
    .unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
  static ref TSX_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let mut highlights = tree_sitter_javascript::JSX_HIGHLIGHT_QUERY.to_owned();
    highlights.push_str(tree_sitter_typescript::HIGHLIGHT_QUERY);
    highlights.push_str(tree_sitter_javascript::HIGHLIGHT_QUERY);

    let mut locals = tree_sitter_typescript::LOCALS_QUERY.to_owned();
    locals.push_str(tree_sitter_javascript::LOCALS_QUERY);

    let mut config = HighlightConfiguration::new(
      tree_sitter_typescript::language_tsx(),
      &highlights,
      tree_sitter_javascript::INJECTION_QUERY,
      &locals,
    )
    .unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
  static ref GO_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let highlights = load_file("go", "highlights.scm");
    let injections = load_file("go", "injections.scm");

    let mut config =
      HighlightConfiguration::new(tree_sitter_go::language(), &highlights, &injections, "")
        .unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
  static ref C_CONFIG: (HighlightConfiguration, Vec<String>) = {
    let highlights = load_file("c", "highlights.scm");
    let injections = load_file("c", "injections.scm");

    let mut config =
      HighlightConfiguration::new(tree_sitter_c::language(), &highlights, &injections, "").unwrap();

    let html_attrs = build_config_with_regex(&mut config);
    (config, html_attrs)
  };
}

fn load_file(language: &str, filename: &str) -> String {
  let path = &PathBuf::new().join("queries").join(language).join(filename);
  std::fs::read_to_string(path).unwrap()
}

fn add_highlight_names(config: &HighlightConfiguration, highlight_names: &mut Vec<String>) {
  for name in config.query.capture_names() {
    if !highlight_names.contains(name) {
      highlight_names.push(name.clone());
    }
  }
}

fn build_config_with_regex(config: &mut HighlightConfiguration) -> Vec<String> {
  let mut highlight_names = Vec::new();
  add_highlight_names(config, &mut highlight_names);

  config.configure(&highlight_names);

  let html_attrs: Vec<String> = highlight_names
    .iter()
    .map(|s| format!("class=\"{}\"", s.replace('.', "-")))
    .collect();

  html_attrs
}

fn load_language<'a>(language: Language) -> (&'a HighlightConfiguration, &'a Vec<String>) {
  let (config, html_attrs) = match language {
    Language::c => &*C_CONFIG,
    Language::go => &*GO_CONFIG,
    Language::js => &*JS_CONFIG,
    Language::jsx => &*JSX_CONFIG,
    Language::ts => &*TS_CONFIG,
    Language::tsx => &*TSX_CONFIG,
  };

  (&config, &html_attrs)
}

#[napi(object)]
#[derive(Debug)]
pub struct Options {
  #[napi(ts_type = "\"default\" | \"github-light\" | \"github-dark\"")]
  pub theme: Option<String>,
}

fn load_theme<'a>(theme: &str) -> &'a theme::Theme {
  match theme {
    "github-dark" => &*THEME_GITHUB_DARK,
    "github-light" => &*THEME_GITHUB_LIGHT,
    "default" => &*THEME_DEFAULT,
    _ => &*THEME_DEFAULT,
  }
}

#[napi]
fn highlight(code: String, language: Language, options: Option<Options>) -> String {
  let theme_valid = options
    .and_then(|opt| opt.theme)
    .unwrap_or("default".into());
  let theme = load_theme(theme_valid.as_str());

  let (config, _) = load_language(language);
  let mut highlighter = Highlighter::new();
  let highlights = highlighter
    .highlight(&config, code.as_bytes(), None, |_| None)
    .unwrap();

  let capn = config.query.capture_names();

  let html_attrs: Vec<String> = capn
    .iter()
    .map(|s| match theme.get(s) {
      Some(color) => format!(
        "class=\"{}\" style=\"color: {}\"",
        s.replace('.', "-"),
        color,
      ),
      None => format!("class=\"{}\"", s.replace('.', "-"),),
    })
    .collect();

  let mut renderer = HtmlRenderer::new();
  renderer
    .render(highlights, code.as_bytes(), &|highlight| {
      html_attrs[highlight.0].as_bytes()
    })
    .unwrap();
  let html = unsafe { String::from_utf8_unchecked(renderer.html) };

  format!(
    "<pre class=\"treelight {}\" style=\"background-color: {}\"><code>{}</code></pre>",
    theme_valid,
    theme.get("ui.background").unwrap_or(Color::White),
    html
  )
}
