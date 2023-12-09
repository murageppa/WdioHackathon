const { Octokit } = require('@octokit/rest');

// Replace 'YOUR_ACCESS_TOKEN' with your GitHub personal access token
const accessToken = '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';

// Function to checkout to a new branch
async function checkoutNewBranch(octokit, owner, repo, newBranch, baseBranch) {
  try {
    // Create a new reference for the new branch
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: baseBranch,
    });

    console.log(`Checked out to the new branch: ${newBranch}`);
  } catch (error) {
    console.error('Error checking out to the new branch:', error.message);
    throw error;
  }
}

// Function to commit local changes
async function commitChanges(octokit, owner, repo, commitMessage) {
  try {
    // Get the current commit SHA of the branch
    const branchRef = await octokit.git.getRef({
      owner,
      repo,
      ref: 'heads/main', // Replace with your base branch
    });

    // Create a new tree with the updated content
    const tree = await octokit.git.createTree({
      owner,
      repo,
      base_tree: branchRef.data.object.sha,
      tree: [{
        path: 'example.txt', // Replace with your file path
        mode: '100644',
        type: 'blob',
        content: 'Hello, World!', // Replace with your file content
      }],
    });

    // Create a new commit with the updated tree
    const commit = await octokit.git.createCommit({
      owner,
      repo,
      message: commitMessage,
      tree: tree.data.sha,
      parents: [branchRef.data.object.sha],
    });

    // Update the branch reference to the new commit
    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main', // Replace with your branch
      sha: commit.data.sha,
    });

    console.log('Committed local changes:', commitMessage);
  } catch (error) {
    console.error('Error committing local changes:', error.message);
    throw error;
  }
}

// Function to push local changes with a branch to the remote repository
async function pushChangesToRemote(octokit, owner, repo, branch) {
  try {
    // Push the changes to the remote repository
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branch}`,
      sha: `refs/heads/${branch}`,
    });

    console.log(`Pushed local changes to the remote repository for branch: ${branch}`);
  } catch (error) {
    console.error('Error pushing changes to remote repository:', error.message);
    throw error;
  }
}

// Function to create a pull request
async function createPullRequest(octokit, owner, repo, title, head, base) {
  try {
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
async function mergePullRequest(octokit, owner, repo, pullRequestNumber) {
  try {
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
  const newBranch = 'feature-branch2';
  const baseBranch = 'main';
  const commitMessage = 'added Octokit package for git create and merge PR';

  const octokit = new Octokit({
    auth: accessToken,
  });

  // Uncomment and modify the lines below based on your needs
  await checkoutNewBranch(octokit, owner, repo, newBranch, baseBranch);
  // await commitChanges(octokit, owner, repo, commitMessage);
  // await pushChangesToRemote(octokit, owner, repo, newBranch);

  // Example: Create and merge a pull request
  const title = commitMessage;
  const head = newBranch;
  const base = 'main';

//   const pullRequestNumber = await createPullRequest(octokit, owner, repo, title, head, base);
//   await mergePullRequest(octokit, owner, repo, pullRequestNumber);
}

// Call the run function
run();
