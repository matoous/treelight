import bashLanguage from '@treelight/bash';
import cLanguage from '@treelight/c';
import cppLanguage from '@treelight/cpp';
import cssLanguage from '@treelight/css';
import dockerfileLanguage from '@treelight/dockerfile';
import elixirLanguage from '@treelight/elixir';
import goLanguage from '@treelight/go';
import graphqlLanguage from '@treelight/graphql';
import htmlLanguage from '@treelight/html';
import javaLanguage from '@treelight/java';
import javascriptLanguage from '@treelight/javascript';
import jsonLanguage from '@treelight/json';
import luaLanguage from '@treelight/lua';
import markdownLanguage from '@treelight/markdown';
import phpLanguage from '@treelight/php';
import pythonLanguage from '@treelight/python';
import rubyLanguage from '@treelight/ruby';
import rustLanguage from '@treelight/rust';
import schemeLanguage from '@treelight/scheme';
import sqlLanguage from '@treelight/sql';
import tomlLanguage from '@treelight/toml';
import tsxLanguage from '@treelight/tsx';
import typescriptLanguage from '@treelight/typescript';
import yamlLanguage from '@treelight/yaml';
import zigLanguage from '@treelight/zig';
import test from 'ava';
import treelight from '../../core/dist/index.js';

const { highlight, registerLanguage } = treelight;
const resolveLanguage = (module) => module.default ?? module;

test.before(() => {
  registerLanguage('bash', resolveLanguage(bashLanguage));
  registerLanguage('c', resolveLanguage(cLanguage));
  registerLanguage('cpp', resolveLanguage(cppLanguage));
  registerLanguage('css', resolveLanguage(cssLanguage));
  registerLanguage('dockerfile', resolveLanguage(dockerfileLanguage));
  registerLanguage('go', resolveLanguage(goLanguage));
  registerLanguage('graphql', resolveLanguage(graphqlLanguage));
  registerLanguage('html', resolveLanguage(htmlLanguage));
  registerLanguage('javascript', resolveLanguage(javascriptLanguage));
  registerLanguage('java', resolveLanguage(javaLanguage));
  registerLanguage('json', resolveLanguage(jsonLanguage));
  registerLanguage('lua', resolveLanguage(luaLanguage));
  registerLanguage('markdown', resolveLanguage(markdownLanguage));
  registerLanguage('php', resolveLanguage(phpLanguage));
  registerLanguage('python', resolveLanguage(pythonLanguage));
  registerLanguage('ruby', resolveLanguage(rubyLanguage));
  registerLanguage('elixir', resolveLanguage(elixirLanguage));
  registerLanguage('rust', resolveLanguage(rustLanguage));
  registerLanguage('scheme', resolveLanguage(schemeLanguage));
  registerLanguage('sql', resolveLanguage(sqlLanguage));
  registerLanguage('toml', resolveLanguage(tomlLanguage));
  registerLanguage('tsx', resolveLanguage(tsxLanguage));
  registerLanguage('typescript', resolveLanguage(typescriptLanguage));
  registerLanguage('yaml', resolveLanguage(yamlLanguage));
  registerLanguage('zig', resolveLanguage(zigLanguage));
});

test('bash', async (t) => {
  t.snapshot(
    await highlight(
      `#!/usr/bin/env bash
set -euo pipefail

name="\${1:-Treelight}"
echo "Hello, \${name}!"`,
      'bash',
    ),
  );
});

test('c', async (t) => {
  t.snapshot(
    await highlight(
      `#include <stdio.h>

int main(void) {
  puts("Hello, Treelight!");
  return 0;
}`,
      'c',
    ),
  );
});

test('cpp', async (t) => {
  t.snapshot(
    await highlight(
      `#include <iostream>
#include <vector>

int main() {
  std::vector<std::string> names = {"Tree", "light"};
  for (const auto& name : names) {
    std::cout << name << "\\n";
  }
}`,
      'cpp',
    ),
  );
});

test('css', async (t) => {
  t.snapshot(
    await highlight(
      `.callout {
  display: grid;
  gap: 0.5rem;
  color: rebeccapurple;
}`,
      'css',
    ),
  );
});

test('dockerfile', async (t) => {
  t.snapshot(
    await highlight(
      `FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]`,
      'dockerfile',
    ),
  );
});

test('graphql', async (t) => {
  t.snapshot(
    await highlight(
      `query Repository($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    stargazerCount
  }
}`,
      'graphql',
    ),
  );
});

test('go', async (t) => {
  t.snapshot(await highlight('x := 1', 'go'));
  t.snapshot(
    await highlight(
      `
package main

func foo(s string) string {
  return "foo" + s
}

func main() {
  fmt.Println(foo("bar"))
}`,
      'go',
    ),
  );
});

test('html', async (t) => {
  t.snapshot(
    await highlight(
      `<section data-theme="dark">
  <h1>Hello, Treelight!</h1>
  <button class="cta" disabled>Loading...</button>
</section>`,
      'html',
    ),
  );
});

test('javascript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'javascript'));
});

test('java', async (t) => {
  t.snapshot(
    await highlight(
      `public record Job(int id, String name) {}

public class Runner {
  public static void main(String[] args) {
    var job = new Job(1, "render");
    System.out.println(job);
  }
}`,
      'java',
    ),
  );
});

test('json', async (t) => {
  t.snapshot(
    await highlight(
      `{
  "name": "treelight",
  "languages": ["json", "yaml", "scheme"],
  "enabled": true
}`,
      'json',
    ),
  );
});

test('lua', async (t) => {
  t.snapshot(
    await highlight(
      `local function greet(name)
  return string.format("Hello, %s!", name)
end

print(greet("Treelight"))`,
      'lua',
    ),
  );
});

test('markdown', async (t) => {
  t.snapshot(
    await highlight(
      `# Treelight

Tree-sitter based syntax highlighting for JavaScript runtimes.

- Accurate parsing
- Runtime language registration`,
      'markdown',
    ),
  );
});

test('php', async (t) => {
  t.snapshot(
    await highlight(
      `<?php

function greet(string $name): string {
  return "Hello, {$name}!";
}

echo greet('Treelight');`,
      'php',
    ),
  );
});

test('python', async (t) => {
  t.snapshot(
    await highlight(
      `def run(items: list[str]) -> None:
  for item in items:
    print(item.upper())


if __name__ == '__main__':
  run(['treelight', 'python'])`,
      'python',
    ),
  );
});

test('ruby', async (t) => {
  t.snapshot(
    await highlight(
      `class Greeter
  def initialize(name)
    @name = name
  end

  def call
    puts "Hello, #{@name}!"
  end
end

Greeter.new("Treelight").call`,
      'ruby',
    ),
  );
});

test('elixir', async (t) => {
  t.snapshot(
    await highlight(
      `defmodule Queue do
  defstruct items: []

  def push(%__MODULE__{items: items} = queue, item) do
    %{queue | items: items ++ [item]}
  end

  def pop(%__MODULE__{items: [head | tail]} = queue) do
    {head, %{queue | items: tail}}
  end
end

Queue.push(%Queue{}, "render")`,
      'elixir',
    ),
  );
});

test('rust', async (t) => {
  t.snapshot(
    await highlight(
      `fn add(left: i32, right: i32) -> i32 {
  left + right
}

fn main() {
  println!("{}", add(2, 3));
}`,
      'rust',
    ),
  );
});

test('scheme', async (t) => {
  t.snapshot(
    await highlight(
      `;; Simple Scheme example
(define (double x)
  (* x 2))

(display (double 4))`,
      'scheme',
    ),
  );
});

test('sql', async (t) => {
  t.snapshot(
    await highlight(
      `select id, title, completed
from tasks
where completed = false
order by created_at desc;`,
      'sql',
    ),
  );
});

test('toml', async (t) => {
  t.snapshot(
    await highlight(
      `[package]
name = "treelight"
version = "0.1.0"

[features]
browser = true
languages = ["rust", "typescript"]`,
      'toml',
    ),
  );
});

test('typescript', async (t) => {
  t.snapshot(await highlight('console.info("test")', 'typescript'));
});

test('tsx', async (t) => {
  t.snapshot(
    await highlight(
      `<Title message="hello">
  <Button disabled={state.loading}>Submit</Button>
</Title>`,
      'tsx',
    ),
  );
});

test('yaml', async (t) => {
  t.snapshot(
    await highlight(
      `pipeline:
  steps:
    - name: fetch
      retries: 2
    - name: render
      threads: 4`,
      'yaml',
    ),
  );
});

test('zig', async (t) => {
  t.snapshot(
    await highlight(
      `const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, Treelight!\\n", .{});
}`,
      'zig',
    ),
  );
});
