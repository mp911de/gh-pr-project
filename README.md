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

`projectId` is ID of this project from GraphQL API. The simplest way to find it is using [GraphQL API Explorer](https://developer.github.com/v4/explorer/). E.g. you can get a list of the projects within some repository using the following query (just replace repository name and owner name with your values):

```graphql
query { 
  repository(name: "gh-pr-project", owner:"ookami-kb") {
    name
    projects(first: 100) {
      nodes {
        id
        name
      }
    }
  }
}
```

And you will get response that looks like this:

```json
{
  "data": {
    "repository": {
      "name": "gh-pr-project",
      "projects": {
        "nodes": [
          {
            "id": "MDc6UHJvamVjdDQ1NjA0NzI=",
            "name": "Test"
          },
          {
            "id": "MDc6UHJvamVjdDQ1NjA0NzM=",
            "name": "Test kanban"
          }
        ]
      }
    }
  }
}
```
