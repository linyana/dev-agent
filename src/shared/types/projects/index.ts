export * from './create';
export * from './getAll';

export type IProjectType = {
  id: string;
  name: string;
  path: string;
  description: string;
  repo: string;
  branch: string;
  githubOwner: string;
  githubRepo: string;
  githubUrl: string;
  githubDesc: string;
  githubStars: number;
  githubForks: number;
  githubLang: string;
  isPrivate: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
};
