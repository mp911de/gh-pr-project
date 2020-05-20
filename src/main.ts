import * as core from '@actions/core'
import {context, GitHub} from '@actions/github'

async function run(): Promise<void> {
  try {
    const GITHUB_TOKEN = core.getInput('githubToken')
    const projectId = core.getInput('projectId')
    const gitHub = new GitHub(GITHUB_TOKEN)
    const pr = context.payload.pull_request
    if (!pr) {
      core.setFailed('This is not a PR')
      return
    }

    core.info(JSON.stringify(pr))

    const mutation = `
      mutation AddProject($prId: ID!, $projectId: ID!) {
        updatePullRequest(
          input: {pullRequestId: $prId, projectIds: [$projectId]}
        ) {
          clientMutationId
        }
      }
    `

    await gitHub.graphql(mutation, {prId: pr.key, projectId})
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
