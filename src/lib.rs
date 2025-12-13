use std::path::PathBuf;

use lazy_static::lazy_static;
use napi_derive::napi;
use once_cell::sync::Lazy;
use regex::Regex;
use tree_sitter_highlight::{HighlightConfiguration, Highlighter, HtmlRenderer};

use crate::theme::{load_theme, Color};

pub mod theme;

macro_rules! generate_configs {
    ($(($name:ident, $lang:literal, $language:expr)),*) => {
        lazy_static! {
          $(
              static ref $name: HighlightConfiguration = {
                let highlights = read_query($lang, "highlights.scm");
                let injections = read_query($lang, "injections.scm");
                let locals = read_query($lang, "locals.scm");

                let mut config = HighlightConfiguration::new(
                  $language,
                  $lang,
                  &highlights,
                  &injections,
                  &locals,
                )
                .unwrap();

                let capture_names = config
                  .query
                  .capture_names()
                  .into_iter()
                  .map(|c| c.to_string())
                  .collect::<Vec<String>>();

                config.configure(&capture_names);

                config
              };
          )*
        }
    };
}

generate_configs! {
  (GO_CONFIG, "go", tree_sitter_go::LANGUAGE.into()),
  (C_CONFIG, "c", tree_sitter_c::LANGUAGE.into()),
  (JS_CONFIG, "javascript", tree_sitter_javascript::LANGUAGE.into()),
  (TS_CONFIG, "typescript", tree_sitter_typescript::LANGUAGE_TYPESCRIPT.into()),
  (JSX_CONFIG, "jsx", tree_sitter_javascript::LANGUAGE.into()),
  (TSX_CONFIG, "tsx", tree_sitter_typescript::LANGUAGE_TSX.into()),
  (PYTHON_CONFIG, "python", tree_sitter_python::LANGUAGE.into()),
  (RUBY_CONFIG, "ruby", tree_sitter_ruby::LANGUAGE.into())
}

#[allow(dead_code)]
fn load_language<'a>(language: String) -> Option<&'a HighlightConfiguration> {
  match language.as_str() {
    "go" => Some(&*GO_CONFIG),
    "c" => Some(&*C_CONFIG),
    "js" => Some(&*JS_CONFIG),
    "ts" => Some(&*TS_CONFIG),
    "jsx" => Some(&*JSX_CONFIG),
    "tsx" => Some(&*TSX_CONFIG),
    "py" => Some(&*PYTHON_CONFIG),
    "rb" => Some(&*RUBY_CONFIG),
    _ => None,
  }
}

pub fn read_query(language: &str, filename: &str) -> String {
  static INHERITS_REGEX: Lazy<Regex> =
    Lazy::new(|| Regex::new(r";+\s*inherits\s*:?\s*([a-z_,()-]+)\s*").unwrap());

  let query =
    std::fs::read_to_string(PathBuf::new().join("queries").join(language).join(filename))
      .unwrap_or_default();

  // replaces all "; inherits <language>(,<language>)*" with the queries of the given language(s)
  INHERITS_REGEX
    .replace_all(&query, |captures: &regex::Captures| {
      captures[1]
        .split(',')
        .map(|language| format!("\n{}\n", read_query(language, filename)))
        .collect::<String>()
    })
    .to_string()
}



#[napi(object)]
#[derive(Debug)]
pub struct Options {
  #[napi(ts_type = "\"default\" | \"github-light\" | \"github-dark\"")]
  pub theme: Option<String>,
}

#[napi]
fn highlight(
  code: String,
  #[napi(ts_arg_type = "\"js\" | \"jsx\" | \"ts\"| \"tsx\" | \"go\" | \"c\" | \"py\" | \"rb\"")]
  language: String,
  options: Option<Options>,
) -> String {
  let theme_valid = options
    .and_then(|opt| opt.theme)
    .unwrap_or("default".into());
  let theme = load_theme(theme_valid.as_str());

  let config = load_language(language);
  if config.is_none() {
    return format!(
      "<pre class=\"treelight\" style=\"background-color: {}; color: {}\"><code>{}</code></pre>",
      theme.get("ui.background").unwrap_or(Color::White),
      theme.get("ui.foreground").unwrap_or(Color::Black),
      code
    );
  }

  let config = config.unwrap();

  let mut highlighter = Highlighter::new();
  let highlights = highlighter
    .highlight(config, code.as_bytes(), None, |_| None)
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
    .render(highlights, code.as_bytes(), &|highlight, out| {
      out.extend_from_slice(html_attrs[highlight.0].as_bytes())
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
