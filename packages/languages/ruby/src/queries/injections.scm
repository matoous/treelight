((comment) @injection.content
 (#set! injection.language "comment"))

(heredoc_body
  (heredoc_content) @injection.content
  (heredoc_end) @_name
  (#eq? @_name "SQL")
  (#set! injection.language "sql"))

(heredoc_body
  (heredoc_content) @injection.content
  (heredoc_end) @_name
  (#any-of? @_name "GQL" "GRAPHQL")
  (#set! injection.language "graphql"))

(heredoc_body
  (heredoc_content) @injection.content
  (heredoc_end) @_name
  (#eq? @_name "ERB")
  (#set! injection.language "erb"))

; `<command>`
; %x{<command>}
(subshell
  (string_content) @injection.content
  (#set! injection.language "bash"))

(call
  method: (identifier) @_method (#any-of? @_method "system" "spawn" "exec")
  arguments: (argument_list
    (string
      (string_content) @injection.content))
  (#set! injection.language "bash"))
