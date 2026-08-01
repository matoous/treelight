((comment) @injection.content
 (#set! injection.language "comment"))

((script_element
  (raw_text) @injection.content)
 (#set! injection.language "javascript"))

((style_element
  (raw_text) @injection.content)
 (#set! injection.language "css"))

(attribute
  (attribute_name) @_attr (#eq? @_attr "pattern")
  (quoted_attribute_value
    (attribute_value) @injection.content)
  (#set! injection.language "regex"))
