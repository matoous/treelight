const theme = {
  'id': 'rose-pine',
  'styles': {
    'ui.background': {
      'bg': '#191724',
    },
    'ui.background.separator': {
      'bg': '#191724',
    },
    'ui.cursor': {
      'fg': '#e0def4',
      'bg': '#524f67',
    },
    'ui.cursor.match': {
      'fg': '#e0def4',
      'bg': '#403d52',
    },
    'ui.cursor.primary': {
      'fg': '#e0def4',
      'bg': '#6e6a86',
    },
    'ui.linenr': {
      'fg': '#6e6a86',
    },
    'ui.linenr.selected': {
      'fg': '#e0def4',
    },
    'ui.bufferline': {
      'fg': '#6e6a86',
      'bg': '#191724',
    },
    'ui.bufferline.active': {
      'fg': '#e0def4',
      'bg': '#26233a',
    },
    'ui.statusline': {
      'fg': '#908caa',
      'bg': '#1f1d2e',
    },
    'ui.statusline.inactive': {
      'fg': '#6e6a86',
      'bg': '#1f1d2e',
    },
    'ui.statusline.normal': {
      'fg': '#ebbcba',
      'bg': '#2f2834',
    },
    'ui.statusline.insert': {
      'fg': '#9ccfd8',
      'bg': '#252937',
    },
    'ui.statusline.select': {
      'fg': '#c4a7e7',
      'bg': '#2b2539',
    },
    'ui.popup': {
      'bg': '#1f1d2e',
    },
    'ui.popup.info': {
      'bg': '#1f1d2e',
    },
    'ui.window': {
      'fg': '#26233a',
      'bg': '#191724',
    },
    'ui.help': {
      'fg': '#908caa',
      'bg': '#26233a',
    },
    'ui.text': {
      'fg': '#e0def4',
    },
    'ui.text.focus': {
      'bg': '#26233a',
    },
    'ui.text.info': {
      'fg': '#908caa',
    },
    'ui.text.directory': {
      'fg': '#c4a7e7',
    },
    'ui.virtual.jump-label': {
      'fg': '#eb6f92',
    },
    'ui.virtual.ruler': {
      'bg': '#26233a',
    },
    'ui.virtual.whitespace': {
      'fg': '#524f67',
    },
    'ui.virtual.indent-guide': {
      'fg': '#6e6a86',
    },
    'ui.virtual.inlay-hint': {
      'fg': '#908caa',
    },
    'ui.menu': {
      'fg': '#908caa',
      'bg': '#1f1d2e',
    },
    'ui.menu.selected': {
      'fg': '#e0def4',
      'bg': '#26233a',
    },
    'ui.menu.scroll': {
      'fg': '#6e6a86',
      'bg': '#403d52',
    },
    'ui.selection': {
      'bg': '#26233a',
    },
    'ui.selection.primary': {
      'bg': '#403d52',
    },
    'ui.cursorline.primary': {
      'bg': '#21202e',
    },
    'ui.cursorline.secondary': {
      'bg': '#1f1d2e',
    },
    'warning': {
      'fg': '#f6c177',
    },
    'error': {
      'fg': '#eb6f92',
    },
    'info': {
      'fg': '#9ccfd8',
    },
    'hint': {
      'fg': '#c4a7e7',
    },
    'debug': {
      'fg': '#ebbcba',
    },
    'special': {
      'fg': '#ebbcba',
    },
    'attribute': {
      'fg': '#c4a7e7',
    },
    'type': {
      'fg': '#9ccfd8',
    },
    'constructor': {
      'fg': '#9ccfd8',
    },
    'constant': {
      'fg': '#9ccfd8',
    },
    'constant.builtin': {
      'fg': '#eb6f92',
    },
    'constant.builtin.boolean': {
      'fg': '#ebbcba',
    },
    'constant.character': {
      'fg': '#f6c177',
    },
    'constant.character.escape': {
      'fg': '#31748f',
    },
    'constant.numeric': {
      'fg': '#f6c177',
    },
    'string': {
      'fg': '#f6c177',
    },
    'comment': {
      'fg': '#6e6a86',
    },
    'variable': {
      'fg': '#e0def4',
    },
    'variable.builtin': {
      'fg': '#eb6f92',
    },
    'variable.parameter': {
      'fg': '#c4a7e7',
    },
    'variable.other.member': {
      'fg': '#9ccfd8',
    },
    'label': {
      'fg': '#9ccfd8',
    },
    'punctuation': {
      'fg': '#908caa',
    },
    'keyword': {
      'fg': '#31748f',
    },
    'keyword.operator': {
      'fg': '#908caa',
    },
    'operator': {
      'fg': '#908caa',
    },
    'function': {
      'fg': '#ebbcba',
    },
    'function.builtin': {
      'fg': '#eb6f92',
    },
    'tag': {
      'fg': '#9ccfd8',
    },
    'namespace': {
      'fg': '#e0def4',
    },
    'markup.heading.marker': {
      'fg': '#6e6a86',
    },
    'markup.heading': {
      'fg': '#c4a7e7',
    },
    'markup.heading.1': {
      'fg': '#c4a7e7',
    },
    'markup.heading.2': {
      'fg': '#9ccfd8',
    },
    'markup.heading.3': {
      'fg': '#ebbcba',
    },
    'markup.heading.4': {
      'fg': '#f6c177',
    },
    'markup.heading.5': {
      'fg': '#31748f',
    },
    'markup.heading.6': {
      'fg': '#9ccfd8',
    },
    'markup.list': {
      'fg': '#6e6a86',
    },
    'markup.link': {
      'fg': '#c4a7e7',
    },
    'markup.link.url': {
      'fg': '#c4a7e7',
    },
    'markup.link.label': {
      'fg': '#908caa',
    },
    'markup.link.text': {
      'fg': '#e0def4',
    },
    'markup.quote': {
      'fg': '#908caa',
    },
    'markup.raw': {
      'fg': '#908caa',
    },
    'diff': {
      'fg': '#26233a',
    },
    'diff.plus': {
      'fg': '#9ccfd8',
    },
    'diff.minus': {
      'fg': '#eb6f92',
    },
    'diff.delta': {
      'fg': '#524f67',
    },
  },
};

export default theme;
