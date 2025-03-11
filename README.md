# ravenlog
The blog generator with the [Brack](https://github.com/brack-lang/brack) markup language.

## Build

```yml
name: Ravenlog Build
on:
  push:
    branches:
        - main

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        uses: brack-lang/ravenlog/actions/deploy@main
        with:
          working-directory: example
          deploy-branch: deploy-ravenlog
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Installation
You can install ravenlog using the Nix profile or Cargo.

### Nix (recommended)

```sh
nix profile install github:brack-lang/ravenlog
```

### Cargo

```sh
cargo install --git https://github.com/brack-lang/ravenlog
```

## Development

```sh
git clone https://github.com/brack-lang/ravenlog
```

Your development will require Nix enabled flakes, or the following tools.

- Nodejs v21 (frontend)
- Rust toolchain (backend)

## LICENSE
MIT or Apache-2.0
