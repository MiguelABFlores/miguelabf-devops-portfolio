export type Project = {
  title: string;
  repo: string;
  description: string;
  tech: string[];
  featured?: boolean;
  emoji?: string;
};

export const projects: Project[] = [
  {
    title: 'Eläin — Vet Services Website',
    repo: 'https://github.com/MiguelABFlores/vet-services-website',
    description:
      'Production website for a veterinary clinic in Guadalajara. Designed, planned, and led delivery end-to-end — frontend in React, containerized with Docker, deployed on GCP behind Nginx with a fully automated GitHub Actions pipeline. Mentored a frontend apprentice through the project.',
    tech: ['React', 'Node.js', 'Docker', 'GCP', 'GitHub Actions', 'Nginx'],
    featured: true,
    emoji: '🐾',
  },
  {
    title: 'Demo Metroidvania',
    repo: 'https://github.com/MiguelABFlores/demo-metroidvania',
    description:
      'A 2D Metroidvania demo built in the Unity engine with C#. Personal project showing the creative side outside of infrastructure — game mechanics, level design, and a CI/CD-style build flow for Unity.',
    tech: ['Unity', 'C#', '2D Game Dev'],
    featured: true,
    emoji: '🎮',
  },
  {
    title: 'Repository Emailer',
    repo: 'https://github.com/MiguelABFlores/repository-emailer',
    description:
      'Built a Python emailer from scratch that connects to the GitHub API, pulls pull request data from any public repo, and generates a digest report — then sends it automatically via email to a scrum master. A hands-on exercise in Python scripting, API integration, and automation.',
    tech: ['Python', 'GitHub API', 'SMTP'],
  },
  {
    title: 'AWS Projects',
    repo: 'https://github.com/MiguelABFlores/aws-projects',
    description:
      'A compilation of small AWS infrastructure exercises written in Terraform — VPCs, EC2, IAM, networking. Built while preparing for AWS Cloud Practitioner certification.',
    tech: ['AWS', 'Terraform', 'IaC'],
  },
  {
    title: 'Snow Boarder Game',
    repo: 'https://github.com/MiguelABFlores/Snow-Boarder-Game',
    description:
      'A fun 2D snow boarding game built with Unity and C#. A personal project that shows the creative side — physics-based movement, level design, and game feel.',
    tech: ['Unity', 'C#', '2D Game Dev'],
    emoji: '🏂',
  },
];
