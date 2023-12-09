const { Octokit } = require('@octokit/rest');

// Function to create a pull request
async function createPullRequest(owner, repo, title, head, base) {
  try {
    const octokit = new Octokit({
      auth: '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', // Replace with your GitHub personal access token
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
      auth: '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', // Replace with your GitHub personal access token
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
  const title = 'git changes added';
  const head = 'gitChanges';
  const base = 'main';

  const pullRequestNumber = await createPullRequest(owner, repo, title, head, base);
  await mergePullRequest(owner, repo, pullRequestNumber);
}

// Call the run function
run();
