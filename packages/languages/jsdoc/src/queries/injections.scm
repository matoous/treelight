((document) @injection.content
 (#set! injection.include-children)
 (#set! injection.language "comment"))

((code_block
   (code_block_language) @injection.language
   (code_block_line) @injection.content)
 (#set! injection.combined))
