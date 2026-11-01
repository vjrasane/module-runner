# module-runner

[![npm version](https://img.shields.io/npm/v/module-runner.svg)](https://www.npmjs.com/package/module-runner)
[![license](https://img.shields.io/npm/l/module-runner.svg)](./LICENSE)

Typed TypeScript bindings for running Ansible modules over a JSON-RPC server.

The client provisions and drives [`ansible-jsonrpc-server`](https://pypi.org/project/ansible-jsonrpc-server/)
(fetched and installed on first use) — it owns all ansible-core execution. `ansible.builtin`
ships with typed bindings; community collections are generated into your own repo.

## Install

```sh
npm install module-runner
```

## Generate community collection bindings

```sh
npx module-runner generate <namespace.collection> [--version <v>] [--out <dir>]
```

The server installs the collection and introspects it; the emitted bindings pin the
resolved version.
