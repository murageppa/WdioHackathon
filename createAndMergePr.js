const { Octokit } = require('@octokit/rest');

// Replace 'YOUR_ACCESS_TOKEN' with your GitHub personal access token
const accessToken = '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';

// Function to create a pull request
async function createPullRequest(owner, repo, title, head, base) {
  try {
    const octokit = new Octokit({
      auth: accessToken,
    });

    const response = await octokit.pulls.create({
      owner,
      repo,
      title,
      head,
      base,
    });

    console.log(`Pull request created: ${response.data.html_url}`);
    return response.data.number;
  } catch (error) {
    console.error('Error creating pull request:', error.message);
    throw error;
  }
}

// Function to merge a pull request
async function mergePullRequest(owner, repo, pullRequestNumber) {
  try {
    const octokit = new Octokit({
      auth: accessToken,
    });

    await octokit.pulls.merge({
      owner,
      repo,
      pull_number: pullRequestNumber,
    });

    console.log(`Pull request ${pullRequestNumber} merged successfully.`);
  } catch (error) {
    console.error('Error merging pull request:', error.message);
    throw error;
  }
}

// Example usage
async function run() {
  const owner = 'murageppa';
  const repo = 'WdioHackathon';
  const title = 'git changes added and raising PR';
  const head = 'feature-branch';
  const base = 'main';

  try {
    const pullRequestNumber = await createPullRequest(owner, repo, title, head, base);
    await mergePullRequest(owner, repo, pullRequestNumber);
  } catch (error) {
    console.error('Error during execution:', error.message);
  }
}

// Call the run function
run();
