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
  "time"
)

type Job struct {
  ID int
  Label string
}

func main() {
  job := Job{ID: 42, Label: "render"}
  for i := 0; i < 3; i++ {
    go process(i, job)
  }
  time.Sleep(120 * time.Millisecond)
}

func process(id int, job Job) {
  fmt.Printf("worker %d -> %s #%d\\n", id, job.Label, job.ID)
}
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

export const languageOptions: LanguageOption[] = [
  {
    id: 'go',
    label: 'Go',
    loader: () => import('@treelight/go'),
    sample: goSample,
  },
  {
    id: 'javascript',
    label: 'JavaScript',
    loader: () => import('@treelight/javascript'),
    sample: javascriptSample,
  },
  {
    id: 'php',
    label: 'PHP',
    loader: () => import('@treelight/php'),
    sample: phpSample,
  },
  {
    id: 'python',
    label: 'Python',
    loader: () => import('@treelight/python'),
    sample: pythonSample,
  },
  {
    id: 'rust',
    label: 'Rust',
    loader: () => import('@treelight/rust'),
    sample: rustSample,
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
];
