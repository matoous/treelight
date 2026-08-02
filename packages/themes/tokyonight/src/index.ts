const theme = {
  'id': 'tokyonight',
  'styles': {
    'attribute': {
      'fg': '#7dcfff',
    },
    'comment': {
      'fg': '#565f89',
    },
    'comment.block.documentation': {
      'fg': '#e0af68',
    },
    'comment.line.documentation': {
      'fg': '#e0af68',
    },
    'constant': {
      'fg': '#ff9e64',
    },
    'constant.builtin': {
      'fg': '#2ac3de',
    },
    'constant.character': {
      'fg': '#9ece6a',
    },
    'constant.character.escape': {
      'fg': '#bb9af7',
    },
    'constructor': {
      'fg': '#2ac3de',
    },
    'function': {
      'fg': '#7aa2f7',
    },
    'function.builtin': {
      'fg': '#2ac3de',
    },
    'function.macro': {
      'fg': '#7dcfff',
    },
    'function.special': {
      'fg': '#7dcfff',
    },
    'keyword': {
      'fg': '#9d7cd8',
    },
    'keyword.control': {
      'fg': '#bb9af7',
    },
    'keyword.control.import': {
      'fg': '#7dcfff',
    },
    'keyword.control.return': {
      'fg': '#9d7cd8',
    },
    'keyword.directive': {
      'fg': '#7dcfff',
    },
    'keyword.function': {
      'fg': '#bb9af7',
    },
    'keyword.operator': {
      'fg': '#bb9af7',
    },
    'label': {
      'fg': '#7aa2f7',
    },
    'namespace': {
      'fg': '#7dcfff',
    },
    'operator': {
      'fg': '#89ddff',
    },
    'punctuation': {
      'fg': '#89ddff',
    },
    'special': {
      'fg': '#2ac3de',
    },
    'string': {
      'fg': '#9ece6a',
    },
    'string.regexp': {
      'fg': '#b4f9f8',
    },
    'string.special': {
      'fg': '#2ac3de',
    },
    'tag': {
      'fg': '#bb9af7',
    },
    'type': {
      'fg': '#2ac3de',
    },
    'type.builtin': {
      'fg': '#2ac3de',
    },
    'type.enum.variant': {
      'fg': '#ff9e64',
    },
    'variable': {
      'fg': '#c0caf5',
    },
    'variable.builtin': {
      'fg': '#f7768e',
    },
    'variable.other.member': {
      'fg': '#73daca',
    },
    'variable.parameter': {
      'fg': '#e0af68',
    },
    'markup.heading': {
      'fg': '#7aa2f7',
    },
    'markup.heading.completion': {
      'fg': '#c0caf5',
      'bg': '#16161e',
    },
    'markup.heading.hover': {
      'bg': '#343a55',
    },
    'markup.bold': {
      'modifiers': ['bold'] as const,
    },
    'markup.italic': {
      'modifiers': ['italic'] as const,
    },
    'markup.strikethrough': {
      'modifiers': ['strikethrough'] as const,
    },
    'markup.link': {
      'fg': '#7aa2f7',
    },
    'markup.link.url': {
      'underline': { 'style': 'line' as const },
    },
    'markup.link.label': {
      'fg': '#1abc9c',
    },
    'markup.link.text': {
      'fg': '#1abc9c',
    },
    'markup.list': {
      'fg': '#ff9e64',
    },
    'markup.normal.completion': {
      'fg': '#565f89',
    },
    'markup.normal.hover': {
      'fg': '#a9b1d6',
    },
    'markup.raw': {
      'fg': '#1abc9c',
    },
    'markup.raw.inline': {
      'fg': '#7aa2f7',
      'bg': '#414868',
    },
    'diff.delta': {
      'fg': '#6183bb',
    },
    'diff.delta.moved': {
      'fg': '#7aa2f7',
    },
    'diff.minus': {
      'fg': '#914c54',
    },
    'diff.plus': {
      'fg': '#449dab',
    },
    'error': {
      'fg': '#db4b4b',
    },
    'warning': {
      'fg': '#e0af68',
    },
    'info': {
      'fg': '#0db9d7',
    },
    'hint': {
      'fg': '#1abc9c',
    },
    'ui.background': {
      'fg': '#c0caf5',
      'bg': '#1a1b26',
    },
    'ui.cursor': {
      'fg': '#1a1b26',
    },
    'ui.cursor.primary': {
      'fg': '#1a1b26',
      'bg': '#c0caf5',
    },
    'ui.cursor.primary.normal': {
      'fg': '#1a1b26',
      'bg': '#7aa2f7',
    },
    'ui.cursor.primary.insert': {
      'fg': '#1a1b26',
      'bg': '#9ece6a',
    },
    'ui.cursor.primary.select': {
      'fg': '#1a1b26',
      'bg': '#bb9af7',
    },
    'ui.cursor.match': {
      'fg': '#ff9e64',
    },
    'ui.cursorline.primary': {
      'bg': '#16161e',
    },
    'ui.help': {
      'fg': '#c0caf5',
      'bg': '#16161e',
    },
    'ui.linenr': {
      'fg': '#3b4261',
    },
    'ui.linenr.selected': {
      'fg': '#737aa2',
    },
    'ui.menu': {
      'fg': '#c0caf5',
      'bg': '#16161e',
    },
    'ui.menu.selected': {
      'bg': '#343a55',
    },
    'ui.popup': {
      'fg': '#27a1b9',
      'bg': '#16161e',
    },
    'ui.selection': {
      'bg': '#283457',
    },
    'ui.selection.primary': {
      'bg': '#283457',
    },
    'ui.statusline': {
      'fg': '#a9b1d6',
      'bg': '#16161e',
    },
    'ui.statusline.inactive': {
      'fg': '#3b4261',
      'bg': '#16161e',
    },
    'ui.statusline.normal': {
      'fg': '#1a1b26',
      'bg': '#7aa2f7',
    },
    'ui.statusline.insert': {
      'fg': '#1a1b26',
      'bg': '#9ece6a',
    },
    'ui.statusline.select': {
      'fg': '#1a1b26',
      'bg': '#bb9af7',
    },
    'ui.text': {
      'fg': '#c0caf5',
    },
    'ui.text.focus': {
      'bg': '#292e42',
    },
    'ui.text.inactive': {
      'fg': '#565f89',
    },
    'ui.text.info': {
      'fg': '#c0caf5',
      'bg': '#16161e',
    },
    'ui.text.directory': {
      'fg': '#7dcfff',
    },
    'ui.virtual.ruler': {
      'bg': '#3b4261',
    },
    'ui.virtual.whitespace': {
      'fg': '#3b4261',
    },
    'ui.virtual.inlay-hint': {
      'fg': '#1abc9c',
      'bg': '#1a2b32',
    },
    'ui.virtual.jump-label': {
      'fg': '#ff9e64',
    },
    'ui.window': {
      'fg': '#15161e',
    },
  },
};

export default theme;
