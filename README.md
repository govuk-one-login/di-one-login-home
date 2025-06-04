# DI One Login Home

## Guide

### Pre-Commit check with Husky and GitLint
Pre-commit checks is configured via GitLint to ensure commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
To set up pre-commit checks, you need to install the pre-commit hooks and run the post-install script. This will ensure that your commit messages are checked against the rules defined in the `.pre-commit-config.yaml` file.
To install the pre-commit hooks, run the following command:
```shell
$ npm install
```
