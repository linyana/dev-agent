import { prisma } from '@api/utils';
import { ICreateProjectRequestType } from '@shared';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';

class ProjectService {
  async getProjects() {
    return prisma.projects.findMany({ orderBy: { updatedAt: 'desc' } });
  }

  private parseGithubRemote(remoteUrl: string) {
    // Handle SSH: git@github.com:owner/repo.git
    // Handle HTTPS: https://github.com/owner/repo.git
    const sshMatch = remoteUrl.match(/github\.com[:/]([^/]+)\/([^/.]+)/);
    if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };
    return null;
  }

  async createProject(ctx: { body: ICreateProjectRequestType }) {
    const { name, path, description } = ctx.body;

    const git = simpleGit(path);

    // Read git info
    let repo = '';
    let branch = '';
    let githubOwner = '';
    let githubRepo = '';
    let githubUrl = '';
    let githubDesc = '';
    let githubStars = 0;
    let githubForks = 0;
    let githubLang = '';
    let isPrivate = false;

    try {
      branch = (await git.branch()).current;
    } catch {
      // not a git repo, that's ok
    }

    try {
      const remotes = await git.getRemotes(true);
      const origin = remotes.find((r) => r.name === 'origin');
      if (origin) {
        repo = origin.refs.fetch || origin.refs.push || '';
      }
    } catch {
      // no remotes
    }

    if (!repo) {
      throw new Error('No GitHub remote found. Please ensure this is a git repository with a GitHub remote.');
    }

    const parsed = this.parseGithubRemote(repo);
    if (!parsed) {
      throw new Error('Remote URL is not a GitHub repository. Only GitHub projects are supported.');
    }

    githubOwner = parsed.owner;
    githubRepo = parsed.repo;

    // Fetch GitHub repo info
    try {
      const octokit = new Octokit();
      const { data } = await octokit.repos.get({
        owner: githubOwner,
        repo: githubRepo,
      });

      githubUrl = data.html_url;
      githubDesc = data.description || '';
      githubStars = data.stargazers_count;
      githubForks = data.forks_count;
      githubLang = data.language || '';
      isPrivate = data.private;
    } catch {
      throw new Error(`Failed to fetch GitHub info for ${githubOwner}/${githubRepo}. Please check the repository exists and is accessible.`);
    }

    return prisma.projects.create({
      data: {
        name,
        path,
        description: description || '',
        repo,
        branch,
        githubOwner,
        githubRepo,
        githubUrl,
        githubDesc,
        githubStars,
        githubForks,
        githubLang,
        isPrivate,
      },
    });
  }
}

export const projectService = new ProjectService();
