const theme = {
  'id': 'kanagawa',
  'styles': {
    'ui.selection': {
      'bg': '#2D4F67',
    },
    'ui.selection.primary': {
      'bg': '#2D4F67',
    },
    'ui.background': {
      'fg': '#DCD7BA',
      'bg': '#1F1F28',
    },
    'ui.linenr': {
      'fg': '#54546D',
    },
    'ui.linenr.selected': {
      'fg': '#FF9E3B',
    },
    'ui.gutter': {
      'fg': '#54546D',
      'bg': '#2A2A37',
    },
    'ui.virtual': {
      'fg': '#54546D',
    },
    'ui.virtual.ruler': {
      'bg': '#2A2A37',
    },
    'ui.virtual.inlay-hint': {
      'fg': '#54546D',
    },
    'ui.virtual.jump-label': {
      'fg': '#FF5D62',
    },
    'ui.statusline': {
      'fg': '#C8C093',
      'bg': '#16161D',
    },
    'ui.statusline.inactive': {
      'fg': '#727169',
      'bg': '#16161D',
    },
    'ui.statusline.normal': {
      'fg': '#16161D',
      'bg': '#7E9CD8',
    },
    'ui.statusline.insert': {
      'fg': '#16161D',
      'bg': '#76946A',
    },
    'ui.statusline.select': {
      'fg': '#16161D',
      'bg': '#957FB8',
    },
    'ui.bufferline': {
      'fg': '#727169',
      'bg': '#16161D',
    },
    'ui.bufferline.active': {
      'fg': '#C8C093',
      'bg': '#16161D',
    },
    'ui.bufferline.background': {
      'bg': '#16161D',
    },
    'ui.popup': {
      'fg': '#DCD7BA',
      'bg': '#16161D',
    },
    'ui.window': {
      'fg': '#16161D',
    },
    'ui.help': {
      'fg': '#DCD7BA',
      'bg': '#16161D',
    },
    'ui.text': {
      'fg': '#DCD7BA',
    },
    'ui.text.inactive': {
      'fg': '#727169',
    },
    'ui.text.focus': {
      'fg': '#DCD7BA',
      'bg': '#2D4F67',
    },
    'ui.cursor': {
      'fg': '#223249',
      'bg': '#7AA89F',
    },
    'ui.cursor.primary': {
      'fg': '#223249',
      'bg': '#DCD7BA',
    },
    'ui.cursor.match': {
      'fg': '#E46876',
    },
    'ui.highlight': {
      'fg': '#DCD7BA',
      'bg': '#2D4F67',
    },
    'ui.menu': {
      'fg': '#DCD7BA',
      'bg': '#223249',
    },
    'ui.menu.selected': {
      'fg': '#DCD7BA',
      'bg': '#2D4F67',
    },
    'ui.menu.scroll': {
      'fg': '#C8C093',
      'bg': '#223249',
    },
    'ui.cursorline.primary': {
      'bg': '#363646',
    },
    'ui.cursorcolumn.primary': {
      'bg': '#363646',
    },
    'ui.debug.breakpoint': {
      'fg': '#7FB4CA',
    },
    'ui.debug.active': {
      'fg': '#43242B',
    },
    'error': {
      'fg': '#E82424',
    },
    'warning': {
      'fg': '#FF9E3B',
    },
    'info': {
      'fg': '#658594',
    },
    'hint': {
      'fg': '#6A9589',
    },
    'diff.plus': {
      'fg': '#76946A',
    },
    'diff.minus': {
      'fg': '#C34043',
    },
    'diff.delta': {
      'fg': '#DCA561',
    },
    'attribute': {
      'fg': '#E46876',
    },
    'type': {
      'fg': '#7AA89F',
    },
    'type.builtin': {
      'fg': '#7FB4CA',
    },
    'constructor': {
      'fg': '#7FB4CA',
    },
    'constant': {
      'fg': '#FFA066',
    },
    'constant.numeric': {
      'fg': '#D27E99',
    },
    'constant.character.escape': {
      'fg': '#C0A36E',
    },
    'string': {
      'fg': '#98BB6C',
    },
    'string.regexp': {
      'fg': '#C0A36E',
    },
    'string.special.url': {
      'fg': '#7FB4CA',
    },
    'string.special.symbol': {
      'fg': '#957FB8',
    },
    'comment': {
      'fg': '#727169',
    },
    'variable': {
      'fg': '#DCD7BA',
    },
    'variable.builtin': {
      'fg': '#E46876',
    },
    'variable.parameter': {
      'fg': '#B8B4D0',
    },
    'variable.other.member': {
      'fg': '#E6C384',
    },
    'label': {
      'fg': '#7FB4CA',
    },
    'punctuation': {
      'fg': '#9CABCA',
    },
    'keyword': {
      'fg': '#957FB8',
    },
    'keyword.control.return': {
      'fg': '#FF5D62',
    },
    'keyword.control.exception': {
      'fg': '#FF5D62',
    },
    'keyword.directive': {
      'fg': '#E46876',
    },
    'operator': {
      'fg': '#C0A36E',
    },
    'function': {
      'fg': '#7E9CD8',
    },
    'function.builtin': {
      'fg': '#7FB4CA',
    },
    'function.macro': {
      'fg': '#E46876',
    },
    'tag': {
      'fg': '#7AA89F',
    },
    'namespace': {
      'fg': '#FFA066',
    },
    'special': {
      'fg': '#FF5D62',
    },
    'markup.heading': {
      'fg': '#9CABCA',
    },
    'markup.heading.marker': {
      'fg': '#9CABCA',
    },
    'markup.heading.1': {
      'fg': '#E6C384',
    },
    'markup.heading.2': {
      'fg': '#7E9CD8',
    },
    'markup.heading.3': {
      'fg': '#7AA89F',
    },
    'markup.list': {
      'fg': '#D27E99',
    },
    'markup.link.text': {
      'fg': '#7FB4CA',
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
    'markup.link.url': {
      'fg': '#A3D4D5',
    },
    'markup.link.label': {
      'fg': '#FFA066',
    },
    'markup.quote': {
      'fg': '#B8B4D0',
    },
    'markup.raw': {
      'fg': '#98BB6C',
    },
  },
};

export default theme;
