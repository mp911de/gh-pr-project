# PR Project Assigner

Adds PR to the specified project

To use the action put this into your Workflows file:

```yaml
name: PR Project Assigner
on: [pull_request]

jobs:
  build:
    name: Add to project
    runs-on: ubuntu-latest
    steps:
      - uses: ookami-kb/gh-pr-project@v1
        with:
          githubToken: ${{ secrets.GITHUB_TOKEN }}
          projectId: MDc6UHJvamVjdDQ1NjA0NzM=
```
