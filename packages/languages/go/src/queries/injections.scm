((comment) @injection.content
 (#set! injection.language "comment"))

; Inject Markdown into block documentation comments. Line documentation
; comments cannot be grouped reliably with the current Go grammar.
(source_file
  (comment) @injection.content . (comment)* . [
    (package_clause)
    (type_declaration)
    (function_declaration)
    (method_declaration)
    (var_declaration)
    (const_declaration)
    (var_spec)
    (const_spec)
  ]
  (#set! injection.language "markdown"))

((comment) @injection.content
 (#match? @injection.content "^//go:generate")
 (#set! injection.language "bash"))

(call_expression
  (selector_expression) @_function
  (#any-of? @_function "regexp.Match" "regexp.MatchReader" "regexp.MatchString" "regexp.Compile" "regexp.CompilePOSIX" "regexp.MustCompile" "regexp.MustCompilePOSIX")
  (argument_list
    .
    [
      (raw_string_literal (raw_string_literal_content) @injection.content)
      (interpreted_string_literal (interpreted_string_literal_content) @injection.content)
    ]
    (#set! injection.language "regex")))

((call_expression
  function: (selector_expression
    operand: (identifier) @_module
    field: (field_identifier) @_func)
  arguments: (argument_list
    . (interpreted_string_literal
        (interpreted_string_literal_content) @injection.content)))
  (#eq? @_module "fmt")
  (#any-of? @_func "Printf" "Sprintf" "Scanf" "Errorf")
  (#set! injection.language "go-format-string"))

((call_expression
  function: (selector_expression
    operand: (identifier) @_module
    field: (field_identifier) @_func)
  arguments: (argument_list
    (_)
    .
    (interpreted_string_literal
      (interpreted_string_literal_content) @injection.content)))
  (#eq? @_module "fmt")
  (#any-of? @_func "Fprintf" "Fscanf" "Sscanf")
  (#set! injection.language "go-format-string"))

((call_expression
  function: (selector_expression
    operand: (identifier)
    field: (field_identifier) @_func)
  arguments: (argument_list
    . (interpreted_string_literal
        (interpreted_string_literal_content) @injection.content)))
  (#any-of? @_func "Printf" "Fatalf" "Panicf")
  (#set! injection.language "go-format-string"))
