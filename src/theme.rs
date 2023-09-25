use anyhow::Result;
use log::warn;
use std::{collections::HashMap, fmt::Display, path::PathBuf, str};
use toml::{map::Map, Value};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Color {
  Reset,
  Black,
  Red,
  Green,
  Yellow,
  Blue,
  Magenta,
  Cyan,
  Gray,
  LightRed,
  LightGreen,
  LightYellow,
  LightBlue,
  LightMagenta,
  LightCyan,
  LightGray,
  White,
  Rgb(u8, u8, u8),
}

impl Display for Color {
  fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
    match &self {
      &Color::Rgb(r, g, b) => write!(f, "#{:02x}{:02x}{:02x}", r, g, b),
      _ => write!(f, "#000000"),
    }
  }
}

#[derive(Debug)]
pub struct Palette {
  palette: HashMap<String, Color>,
}

impl Default for Palette {
  fn default() -> Self {
    Self {
      palette: HashMap::from([
        ("default".to_string(), Color::Reset),
        ("black".to_string(), Color::Black),
        ("red".to_string(), Color::Red),
        ("green".to_string(), Color::Green),
        ("yellow".to_string(), Color::Yellow),
        ("blue".to_string(), Color::Blue),
        ("magenta".to_string(), Color::Magenta),
        ("cyan".to_string(), Color::Cyan),
        ("gray".to_string(), Color::Gray),
        ("light-red".to_string(), Color::LightRed),
        ("light-green".to_string(), Color::LightGreen),
        ("light-yellow".to_string(), Color::LightYellow),
        ("light-blue".to_string(), Color::LightBlue),
        ("light-magenta".to_string(), Color::LightMagenta),
        ("light-cyan".to_string(), Color::LightCyan),
        ("light-gray".to_string(), Color::LightGray),
        ("white".to_string(), Color::White),
      ]),
    }
  }
}

impl Palette {
  pub fn new(palette: HashMap<String, Color>) -> Self {
    let Palette {
      palette: mut default,
    } = Palette::default();

    default.extend(palette);
    Self { palette: default }
  }

  pub fn parse_color(&self, value: Value) -> Result<Color, String> {
    let value = Self::parse_value_as_str(&value)?;

    self
      .palette
      .get(value)
      .copied()
      .ok_or("")
      .or_else(|_| Self::string_to_rgb(value))
  }

  fn parse_value_as_str(value: &Value) -> Result<&str, String> {
    value
      .as_str()
      .ok_or(format!("Theme: unrecognized value: {}", value))
  }

  pub fn string_to_rgb(s: &str) -> Result<Color, String> {
    if s.len() >= 7 {
      if let (Ok(red), Ok(green), Ok(blue)) = (
        u8::from_str_radix(&s[1..3], 16),
        u8::from_str_radix(&s[3..5], 16),
        u8::from_str_radix(&s[5..7], 16),
      ) {
        return Ok(Color::Rgb(red, green, blue));
      }
    }

    Err(format!("Theme: malformed hexcode: {}", s))
  }
}

impl TryFrom<Value> for Palette {
  type Error = String;

  fn try_from(value: Value) -> Result<Self, Self::Error> {
    let map = match value {
      Value::Table(entries) => entries,
      _ => return Ok(Self::default()),
    };

    let mut palette = HashMap::with_capacity(map.len());
    for (name, value) in map {
      let value = Self::parse_value_as_str(&value)?;
      let color = Self::string_to_rgb(value)?;
      palette.insert(name, color);
    }

    Ok(Self::new(palette))
  }
}

#[derive(Clone, Debug, Default)]
pub struct Theme {
  name: String,

  // UI styles are stored in a HashMap
  styles: HashMap<String, Color>,
}

impl Theme {
  /// Recursively load a theme, merging with any inherited parent themes.
  ///
  /// The paths that have been visited in the inheritance hierarchy are tracked
  /// to detect and avoid cycling.
  ///
  /// It is possible for one file to inherit from another file with the same name
  /// so long as the second file is in a themes directory with lower priority.
  /// However, it is not recommended that users do this as it will make tracing
  /// errors more difficult.
  fn load_theme(&self, name: &str) -> Result<Value> {
    let theme_toml =
      self.load_toml(PathBuf::new().join("themes").join(format!("{}.toml", name)))?;

    Ok(theme_toml)
  }

  // Loads the theme data as `toml::Value`
  fn load_toml(&self, path: PathBuf) -> Result<Value> {
    let data = std::fs::read_to_string(path)?;
    let value = toml::from_str(&data)?;

    Ok(value)
  }

  pub fn get(&self, name: &str) -> Option<Color> {
    std::iter::successors(Some(name), |s| Some(s.rsplit_once('.')?.0))
      .find_map(|s| self.styles.get(s).copied())
  }
}

impl From<&str> for Theme {
  fn from(name: &str) -> Self {
    let theme = Self {
      name: name.clone().into(),
      styles: HashMap::new(),
    };

    let value = theme.load_theme(name).unwrap();

    if let Value::Table(table) = value {
      let styles = build_theme_values(table);

      Self {
        styles,
        ..Default::default()
      }
    } else {
      warn!("Expected theme TOML value to be a table, found {:?}", value);
      Default::default()
    }
  }
}

fn build_theme_values(mut values: Map<String, Value>) -> HashMap<String, Color> {
  let mut styles = HashMap::new();

  // TODO: alert user of parsing failures in editor
  let palette = values
    .remove("palette")
    .map(|value| {
      Palette::try_from(value).unwrap_or_else(|err| {
        warn!("{}", err);
        Palette::default()
      })
    })
    .unwrap_or_default();

  // remove inherits from value to prevent errors
  let _ = values.remove("inherits");
  styles.reserve(values.len());
  for (name, style_value) in values {
    if let Value::Table(entries) = style_value {
      for (kind, value) in entries {
        match kind.as_str() {
          "fg" => {
            let color = palette.parse_color(value);

            styles.insert(name.clone(), color.unwrap());
          }
          _ => {}
        }
      }
    } else {
      let color = palette.parse_color(style_value);
      styles.insert(name.clone(), color.unwrap());
    }
  }

  styles
}
