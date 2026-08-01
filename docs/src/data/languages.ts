import type { LanguageDefinition } from '@treelight/core';

export interface LanguageOption {
  id: string;
  label: string;
  loader: () => Promise<{ default: LanguageDefinition }>;
  sample: string;
}

const goSample = `package main

import (
  "fmt"
  "regexp"
  "time"
)

type Job struct {
  ID int
  Label string
}

func main() {
  labelPattern := regexp.MustCompile(\`^[a-z]+$\`)
  job := Job{ID: 42, Label: "render"}
  fmt.Println(labelPattern.MatchString(job.Label))
  for i := 0; i < 3; i++ {
    go process(i, job)
  }
  time.Sleep(120 * time.Millisecond)
}

func process(id int, job Job) {
  fmt.Printf("worker %d -> %s #%d\\n", id, job.Label, job.ID)
}
`;

const bashSample = `#!/usr/bin/env bash
set -euo pipefail

name="\${1:-Treelight}"
echo "Hello, \${name}!"
`;

const cSample = `#include <stdio.h>

int main(void) {
  puts("Hello, Treelight!");
  return 0;
}
`;

const cppSample = `#include <iostream>
#include <vector>

int main() {
  std::vector<std::string> names = {"Tree", "light"};
  for (const auto& name : names) {
    std::cout << name << "\\n";
  }
}
`;

const cssSample = `.callout {
  display: grid;
  gap: 0.5rem;
  color: rebeccapurple;
}
`;

const dockerfileSample = `FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "dev"]
`;

const graphqlSample = `query Repository($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    name
    stargazerCount
  }
}
`;

const htmlSample = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Treelight</title>
  </head>
  <body>
    <main>
      <h1 data-theme="dark">Hello, Treelight!</h1>
      <button class="cta" disabled>Loading...</button>
    </main>
  </body>
</html>
`;

const javascriptSample = `const greet = (name = 'friend') => {
  return \`Hello, \${name}!\`;
};

async function run() {
  const message = greet('Treelight');
  await new Promise((resolve) => setTimeout(resolve, 250));
  console.log(message);
}

run();
`;

const luaSample = `local function greet(name)
  return string.format("Hello, %s!", name)
end

print(greet("Treelight"))
`;

const markdownSample = `# Treelight

Tree-sitter based syntax highlighting for JavaScript runtimes.

- Accurate parsing
- Runtime language registration
`;

const javaSample = `import java.util.List;

public class Greeter {
  private final List<String> names;

  public Greeter(List<String> names) {
    this.names = names;
  }

  public void greet() {
    for (String name : names) {
      System.out.println("Hello, " + name + "!");
    }
  }

  public static void main(String[] args) {
    new Greeter(List.of("Treelight", "Java")).greet();
  }
}
`;

const jsonSample = `{
  "title": "Treelight",
  "version": 2,
  "languages": [
    "javascript",
    "typescript",
    "json"
  ],
  "settings": {
    "prettify": true,
    "lineNumbers": false
  }
}`;

const phpSample = `<?php

class Queue {
  public function __construct(private array $items = []) {}

  public function push(string $item): void {
    $this->items[] = $item;
  }

  public function pop(): ?string {
    return array_shift($this->items);
  }
}

$queue = new Queue();
$queue->push('render');
$queue->push('paint');

echo $queue->pop();
`;

const rubySample = `class Greeter
  def initialize(name)
    @name = name
  end

  def call
    puts "Hello, #{@name}!"
  end
end

Greeter.new("Treelight").call
`;

const sqlSample = `select id, title, completed
from tasks
where completed = false
order by created_at desc;
`;

const elixirSample = `defmodule Queue do
  defstruct items: []

  def push(%__MODULE__{items: items} = queue, item) do
    %{queue | items: items ++ [item]}
  end

  def pop(%__MODULE__{items: [head | tail]} = queue) do
    {head, %{queue | items: tail}}
  end
end

queue =
  %Queue{}
  |> Queue.push("render")
  |> Queue.push("paint")

IO.inspect(queue)
`;

const yamlSample = `languages:
  - id: javascript
    enabled: true
  - id: typescript
    enabled: true
  - id: json
    enabled: false

pipeline:
  steps:
    - name: fetch
      retries: 2
    - name: highlight
      threads: 4
`;

const tomlSample = `[package]
name = "treelight"
version = "0.1.0"

[features]
browser = true
languages = ["rust", "typescript"]
`;

const pythonSample = `from dataclasses import dataclass
from typing import Iterable


@dataclass
class Job:
  id: int
  label: str


def run(queue: Iterable[Job]) -> None:
  for job in queue:
    print(f"running {job.label}#{job.id}")


if __name__ == '__main__':
  jobs = [Job(id=1, label='render'), Job(id=2, label='paint')]
  run(jobs)
`;

const rustSample = `use std::collections::HashMap;

fn tally(values: &[&str]) -> HashMap<&str, usize> {
  let mut counts = HashMap::new();
  for value in values.iter() {
    *counts.entry(value).or_insert(0) += 1;
  }
  counts
}

fn main() {
  let counts = tally(&["rust", "treelight", "rust"]);
  for (value, total) in counts {
    println!("{value}: {total}");
  }
}
`;

const typescriptSample = `type Task = {
  id: string;
  title: string;
  completed?: boolean;
};

function toggleTask(task: Task, completed: boolean = !task.completed) {
  return { ...task, completed };
}

const task: Task = { id: crypto.randomUUID(), title: 'Ship docs' };
console.log(toggleTask(task));
`;

const tsxSample = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button className="cta" onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
`;

const zigSample = `const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, Treelight!\\n", .{});
}
`;

const schemeSample = `;; Calculate factorial recursively.
(define (factorial n)
  (if (<= n 1)
      1
      (* n (factorial (- n 1)))))

(display (factorial 5))
`;

const regexSample = `^(?<name>[a-z]+)(?:-[0-9]+)?$`;

const commentSample = `TODO: verify the renderer (#123)
WARN: this path is deprecated
FIXME: handle malformed input`;

const goFormatStringSample = `worker %[2]*.[1]*[3]f: %03d%%`;

const jsdocSample = `/**
 * Format a display name.
 * @param {string} name TODO: validate this value
 * @returns {string}
 */`;

const markdownInlineSample = `Read **the [Treelight guide](https://github.com/matoous/treelight)**.`;

export const languageOptions: LanguageOption[] = [
  {
    id: 'bash',
    label: 'Bash',
    loader: () => import('@treelight/bash'),
    sample: bashSample,
  },
  {
    id: 'c',
    label: 'C',
    loader: () => import('@treelight/c'),
    sample: cSample,
  },
  {
    id: 'cpp',
    label: 'C++',
    loader: () => import('@treelight/cpp'),
    sample: cppSample,
  },
  {
    id: 'css',
    label: 'CSS',
    loader: () => import('@treelight/css'),
    sample: cssSample,
  },
  {
    id: 'comment',
    label: 'Comment annotations',
    loader: () => import('@treelight/comment'),
    sample: commentSample,
  },
  {
    id: 'dockerfile',
    label: 'Dockerfile',
    loader: () => import('@treelight/dockerfile'),
    sample: dockerfileSample,
  },
  {
    id: 'graphql',
    label: 'GraphQL',
    loader: () => import('@treelight/graphql'),
    sample: graphqlSample,
  },
  {
    id: 'go',
    label: 'Go',
    loader: () => import('@treelight/go'),
    sample: goSample,
  },
  {
    id: 'go-format-string',
    label: 'Go format strings',
    loader: () => import('@treelight/go-format-string'),
    sample: goFormatStringSample,
  },
  {
    id: 'html',
    label: 'HTML',
    loader: () => import('@treelight/html'),
    sample: htmlSample,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    loader: () => import('@treelight/javascript'),
    sample: javascriptSample,
  },
  {
    id: 'jsdoc',
    label: 'JSDoc',
    loader: () => import('@treelight/jsdoc'),
    sample: jsdocSample,
  },
  {
    id: 'lua',
    label: 'Lua',
    loader: () => import('@treelight/lua'),
    sample: luaSample,
  },
  {
    id: 'markdown',
    label: 'Markdown',
    loader: () => import('@treelight/markdown'),
    sample: markdownSample,
  },
  {
    id: 'markdown.inline',
    label: 'Markdown inline',
    loader: () => import('@treelight/markdown-inline'),
    sample: markdownInlineSample,
  },
  {
    id: 'java',
    label: 'Java',
    loader: () => import('@treelight/java'),
    sample: javaSample,
  },
  {
    id: 'json',
    label: 'JSON',
    loader: () => import('@treelight/json'),
    sample: jsonSample,
  },
  {
    id: 'php',
    label: 'PHP',
    loader: () => import('@treelight/php'),
    sample: phpSample,
  },
  {
    id: 'ruby',
    label: 'Ruby',
    loader: () => import('@treelight/ruby'),
    sample: rubySample,
  },
  {
    id: 'python',
    label: 'Python',
    loader: () => import('@treelight/python'),
    sample: pythonSample,
  },
  {
    id: 'regex',
    label: 'Regular expressions',
    loader: () => import('@treelight/regex'),
    sample: regexSample,
  },
  {
    id: 'elixir',
    label: 'Elixir',
    loader: () => import('@treelight/elixir'),
    sample: elixirSample,
  },
  {
    id: 'rust',
    label: 'Rust',
    loader: () => import('@treelight/rust'),
    sample: rustSample,
  },
  {
    id: 'scheme',
    label: 'Scheme (.scm)',
    loader: () => import('@treelight/scheme'),
    sample: schemeSample,
  },
  {
    id: 'sql',
    label: 'SQL',
    loader: () => import('@treelight/sql'),
    sample: sqlSample,
  },
  {
    id: 'toml',
    label: 'TOML',
    loader: () => import('@treelight/toml'),
    sample: tomlSample,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    loader: () => import('@treelight/typescript'),
    sample: typescriptSample,
  },
  {
    id: 'tsx',
    label: 'TSX / JSX',
    loader: () => import('@treelight/tsx'),
    sample: tsxSample,
  },
  {
    id: 'yaml',
    label: 'YAML',
    loader: () => import('@treelight/yaml'),
    sample: yamlSample,
  },
  {
    id: 'zig',
    label: 'Zig',
    loader: () => import('@treelight/zig'),
    sample: zigSample,
  },
];
