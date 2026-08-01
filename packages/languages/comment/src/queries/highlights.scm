(tag
 (name) @ui.text
 (user)? @constant)

((tag (name) @hint)
 (#any-of? @hint "HINT" "MARK" "PASSED" "STUB" "MOCK" "TIP"))

((tag (name) @info)
 (#any-of? @info "INFO" "NOTE" "TODO" "TO-DO" "PERF" "OPTIMIZE" "PERFORMANCE" "QUESTION" "ASK" "REVIEW" "PR" "CR"))

((tag (name) @warning)
 (#any-of? @warning "HACK" "WARN" "WARNING" "TEST" "TEMP"))

((tag (name) @error)
 (#any-of? @error "BUG" "FIXME" "ISSUE" "XXX" "FIX" "SAFETY" "FIXIT" "FAILED" "DEBUG" "INVARIANT" "COMPLIANCE" "PANIC" "SECURITY"))

("text" @constant.numeric
 (#match? @constant.numeric "^#[0-9]+$"))

("text" @tag
 (#match? @tag "^[@][a-zA-Z0-9_-]+$"))

(uri) @markup.link.url
