const { execSync } = require('child_process');

// Checkout new branch
const newBranch = 'feature-branch';
const baseBranch = 'main';
// checkoutNewBranch(newBranch, baseBranch);

const commitMessage = 'added octokit package for git create and merge PR';
commitChanges(commitMessage);

const branchToPush = newBranch;
// pushChangesToRemote(branchToPush);


// Function to checkout to a new branch
function checkoutNewBranch(newBranch, baseBranch) {
  try {
    // Fetch the latest changes from the remote repository
    execSync('git fetch');

    // Create and checkout a new branch
    execSync(`git checkout -b ${newBranch} ${baseBranch}`);
    console.log(`Checked out to the new branch: ${newBranch}`);
  } catch (error) {
    console.error('Error checking out to the new branch:', error.message);
  }
}

// Function to commit local changes
function commitChanges(commitMessage) {
  try {
    // Add all changes to the staging area
    execSync('git add .');

    // Commit the changes
    execSync(`git commit -m "${commitMessage}"`);
    console.log('Committed local changes:', commitMessage);
  } catch (error) {
    console.error('Error committing local changes:', error.message);
  }
}


// Function to push local changes with a branch to the remote repository
function pushChangesToRemote(branch) {
  try {
    // Push the changes to the remote repository
    execSync(`git push origin ${branch}`);
    console.log(`Pushed local changes to the remote repository for branch: ${branch}`);
  } catch (error) {
    console.error('Error pushing changes to remote repository:', error.message);
  }
}