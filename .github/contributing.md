# Island.js Contributing Guide

Hi! We're really excited that you are interested in contributing to Island.js. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Pull Request Guidelines](#pull-request-guidelines)

## Pull Request Guidelines

- Checkout a topic branch from the relevant branch, e.g. `master`, and merge back against that branch.

- If adding a new feature:

  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:

  - Provide a detailed description of the bug in the PR. Live demo preferred.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Commit messages must follow the [commit message convention](./commit-convention.md) so that changelogs can be automatically generated.

## Development Setup

You will need [pnpm](https://pnpm.io)

After cloning the repo, run:

```sh
# install the dependencies of the project
$ pnpm install
```

### Setup Island.js Dev Environment

You can run following command to build the island cli:

```sh
$ pnpm run dev
```

And then you can execute:

```sh
$ pnpm run docs:dev
```

Visit http://localhost:5173 and try modifying the source code. You'll get live update.
