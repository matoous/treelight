; Shared ECMAScript injections used by JavaScript, TypeScript, and TSX.

(call_expression
  function: [
    (identifier) @injection.language
    (member_expression
      property: (property_identifier) @injection.language)
  ]
  arguments: (template_string (string_fragment) @injection.content)
  (#set! injection.combined)
  (#set! injection.include-children))

((regex_pattern) @injection.content
 (#set! injection.language "regex"))

((comment) @injection.content
 (#set! injection.language "jsdoc"))
