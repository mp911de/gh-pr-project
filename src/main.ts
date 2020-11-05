import * as core from '@actions/core'
import {context, GitHub} from '@actions/github'

async function run(): Promise<void> {
  try {
    const GITHUB_TOKEN = core.getInput('githubToken')
    const projectId = core.getInput('projectId')
    const gitHub = new GitHub(GITHUB_TOKEN)
    const pr = context.payload.pull_request
    const issue = context.payload.issue
    if (pr) {
      const mutation = `
        mutation AddProject($prId: ID!, $projectId: ID!) {
         updatePullRequest(
           input: {pullRequestId: $prId, projectIds: [$projectId]}
         ) {
           clientMutationId
         }
        }
    `

     await gitHub.graphql(mutation, {prId: pr.node_id, projectId})
    }
    
    if (issue) {
      const mutation = `
        mutation AddProject($id: ID!, $projectId: ID!) {
         updateIssue(
           input: {id: $id, projectIds: [$projectId]}
         ) {
           clientMutationId
         }
        }
    `

     await gitHub.graphql(mutation, {id: issue.node_id, projectId})
    }


  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
