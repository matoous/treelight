(tag_name) @tag
(erroneous_end_tag_name) @error
(doctype) @constant
(attribute_name) @attribute
(entity) @string.special.symbol
(comment) @comment

((attribute
  (attribute_name) @attribute
  (quoted_attribute_value (attribute_value) @markup.link.url))
 (#any-of? @attribute "href" "src"))

((element
  (start_tag
    (tag_name) @tag)
  (text) @markup.link.label)
  (#eq? @tag "a"))

(attribute [(attribute_value) (quoted_attribute_value)] @string)

((element
  (start_tag
    (tag_name) @tag)
  (text) @markup.bold)
  (#any-of? @tag "strong" "b"))

((element
  (start_tag
    (tag_name) @tag)
  (text) @markup.italic)
  (#any-of? @tag "em" "i"))

((element
  (start_tag
    (tag_name) @tag)
  (text) @markup.strikethrough)
  (#any-of? @tag "s" "del"))

[
  "<"
  ">"
  "</"
  "/>"
  "<!"
] @punctuation.bracket

"=" @punctuation.delimiter

[
  "["
  "]"
] @punctuation.bracket

(interpolation) @punctuation.special

(interpolation
  (raw_text) @none)

(dynamic_directive_inner_value) @variable

(directive_name) @attribute

(":" . (directive_value) @variable.member)

("." . (directive_value) @property)

("@" . (directive_value) @function.method)

("#" . (directive_value) @variable)

(directive_attribute
  (quoted_attribute_value) @punctuation.special)

(directive_attribute
  (quoted_attribute_value
    (attribute_value) @none))

(directive_modifier) @function.method
