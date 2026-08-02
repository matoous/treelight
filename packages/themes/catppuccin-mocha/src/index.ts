const theme = {
  'id': 'catppuccin-mocha',
  'styles': {
    'attribute': {
      'fg': '#f9e2af',
    },
    'type': {
      'fg': '#f9e2af',
    },
    'type.builtin': {
      'fg': '#cba6f7',
    },
    'type.enum.variant': {
      'fg': '#94e2d5',
    },
    'constructor': {
      'fg': '#74c7ec',
    },
    'constant': {
      'fg': '#fab387',
    },
    'constant.character': {
      'fg': '#94e2d5',
    },
    'constant.character.escape': {
      'fg': '#f5c2e7',
    },
    'string': {
      'fg': '#a6e3a1',
    },
    'string.regexp': {
      'fg': '#f5c2e7',
    },
    'string.special': {
      'fg': '#89b4fa',
    },
    'string.special.symbol': {
      'fg': '#f38ba8',
    },
    'comment': {
      'fg': '#9399b2',
    },
    'variable': {
      'fg': '#cdd6f4',
    },
    'variable.parameter': {
      'fg': '#eba0ac',
    },
    'variable.builtin': {
      'fg': '#f38ba8',
    },
    'variable.other.member': {
      'fg': '#89b4fa',
    },
    'label': {
      'fg': '#74c7ec',
    },
    'punctuation': {
      'fg': '#9399b2',
    },
    'punctuation.special': {
      'fg': '#89dceb',
    },
    'keyword': {
      'fg': '#cba6f7',
    },
    'keyword.control.conditional': {
      'fg': '#cba6f7',
    },
    'operator': {
      'fg': '#89dceb',
    },
    'function': {
      'fg': '#89b4fa',
    },
    'function.macro': {
      'fg': '#f5e0dc',
    },
    'tag': {
      'fg': '#89b4fa',
    },
    'namespace': {
      'fg': '#f9e2af',
    },
    'special': {
      'fg': '#89b4fa',
    },
    'markup.heading.1': {
      'fg': '#f38ba8',
    },
    'markup.heading.2': {
      'fg': '#fab387',
    },
    'markup.heading.3': {
      'fg': '#f9e2af',
    },
    'markup.heading.4': {
      'fg': '#a6e3a1',
    },
    'markup.heading.5': {
      'fg': '#74c7ec',
    },
    'markup.heading.6': {
      'fg': '#b4befe',
    },
    'markup.list': {
      'fg': '#94e2d5',
    },
    'markup.list.unchecked': {
      'fg': '#9399b2',
    },
    'markup.list.checked': {
      'fg': '#a6e3a1',
    },
    'markup.bold': {
      'fg': '#f38ba8',
      'modifiers': ['bold'] as const,
    },
    'markup.italic': {
      'fg': '#f38ba8',
      'modifiers': ['italic'] as const,
    },
    'markup.strikethrough': {
      'modifiers': ['strikethrough'] as const,
    },
    'markup.link.url': {
      'fg': '#89b4fa',
      'modifiers': ['italic', 'underline'] as const,
    },
    'markup.link.text': {
      'fg': '#b4befe',
    },
    'markup.link.label': {
      'fg': '#74c7ec',
    },
    'markup.raw': {
      'fg': '#a6e3a1',
    },
    'markup.quote': {
      'fg': '#f5c2e7',
    },
    'diff.plus': {
      'fg': '#a6e3a1',
    },
    'diff.minus': {
      'fg': '#f38ba8',
    },
    'diff.delta': {
      'fg': '#89b4fa',
    },
    'ui.background': {
      'fg': '#cdd6f4',
      'bg': '#1e1e2e',
    },
    'ui.linenr': {
      'fg': '#45475a',
    },
    'ui.linenr.selected': {
      'fg': '#b4befe',
    },
    'ui.statusline': {
      'fg': '#bac2de',
      'bg': '#181825',
    },
    'ui.statusline.inactive': {
      'fg': '#585b70',
      'bg': '#181825',
    },
    'ui.statusline.normal': {
      'fg': '#1e1e2e',
      'bg': '#f5e0dc',
    },
    'ui.statusline.insert': {
      'fg': '#1e1e2e',
      'bg': '#a6e3a1',
    },
    'ui.statusline.select': {
      'fg': '#1e1e2e',
      'bg': '#b4befe',
    },
    'ui.popup': {
      'fg': '#cdd6f4',
      'bg': '#313244',
    },
    'ui.window': {
      'fg': '#11111b',
    },
    'ui.help': {
      'fg': '#9399b2',
      'bg': '#313244',
    },
    'ui.bufferline': {
      'fg': '#a6adc8',
      'bg': '#181825',
    },
    'ui.bufferline.active': {
      'fg': '#cba6f7',
      'bg': '#1e1e2e',
    },
    'ui.bufferline.background': {
      'bg': '#11111b',
    },
    'ui.text': {
      'fg': '#cdd6f4',
    },
    'ui.text.focus': {
      'fg': '#cdd6f4',
      'bg': '#313244',
    },
    'ui.text.inactive': {
      'fg': '#7f849c',
    },
    'ui.text.directory': {
      'fg': '#89b4fa',
    },
    'ui.virtual': {
      'fg': '#6c7086',
    },
    'ui.virtual.ruler': {
      'bg': '#313244',
    },
    'ui.virtual.indent-guide': {
      'fg': '#313244',
    },
    'ui.virtual.inlay-hint': {
      'fg': '#45475a',
      'bg': '#181825',
    },
    'ui.virtual.jump-label': {
      'fg': '#f5e0dc',
    },
    'ui.selection': {
      'bg': '#45475a',
    },
    'ui.cursor': {
      'fg': '#1e1e2e',
      'bg': '#b5a6a8',
    },
    'ui.cursor.primary': {
      'fg': '#1e1e2e',
      'bg': '#f5e0dc',
    },
    'ui.cursor.match': {
      'fg': '#fab387',
    },
    'ui.cursor.primary.normal': {
      'fg': '#1e1e2e',
      'bg': '#f5e0dc',
    },
    'ui.cursor.primary.insert': {
      'fg': '#1e1e2e',
      'bg': '#a6e3a1',
    },
    'ui.cursor.primary.select': {
      'fg': '#1e1e2e',
      'bg': '#b4befe',
    },
    'ui.cursor.normal': {
      'fg': '#1e1e2e',
      'bg': '#b5a6a8',
    },
    'ui.cursor.insert': {
      'fg': '#1e1e2e',
      'bg': '#7ea87f',
    },
    'ui.cursor.select': {
      'fg': '#1e1e2e',
      'bg': '#878ec0',
    },
    'ui.cursorline.primary': {
      'bg': '#2a2b3c',
    },
    'ui.highlight': {
      'bg': '#45475a',
    },
    'ui.menu': {
      'fg': '#9399b2',
      'bg': '#313244',
    },
    'ui.menu.selected': {
      'fg': '#cdd6f4',
      'bg': '#45475a',
    },
    'error': {
      'fg': '#f38ba8',
    },
    'warning': {
      'fg': '#f9e2af',
    },
    'info': {
      'fg': '#89dceb',
    },
    'hint': {
      'fg': '#94e2d5',
    },
  },
};

export default theme;
