; upstream: https://github.com/tree-sitter/tree-sitter-regex/blob/b2ac15e27fce703d2f37a79ccd94a5c0cbe9720b/queries/highlights.scm

[
  "("
  ")"
  "(?"
  "(?:"
  "(?<"
  "(?P<"
  "(?P="
  ">"
  "["
  "]"
  "[:"
  ":]"
  "{"
  "}"
] @punctuation.bracket

[
  "*"
  "+"
  "|"
  "="
  "!"
  "?"
] @operator

[
  (identity_escape)
  (control_letter_escape)
  (character_class_escape)
  (control_escape)
  (start_assertion)
  (end_assertion)
  (boundary_assertion)
  (non_boundary_assertion)
] @constant.character.escape

(group_name) @label

(count_quantifier
  [
    (decimal_digits) @constant.numeric
    "," @punctuation.delimiter
  ])

(inline_flags_group
  "-"? @operator
  ":"? @punctuation.delimiter)
(flags) @constant.character

(character_class
  [
    "^" @operator
    (class_range "-" @operator)
  ])

[
  (class_character)
  (posix_class_name)
] @constant.character
