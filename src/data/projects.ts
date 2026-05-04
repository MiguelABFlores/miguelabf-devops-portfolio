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
      'Python tool that hits the GitHub API to summarize pull requests for a public repo, generates a digest report, and emails it to a scrum master. Useful for async-first teams and stand-up prep.',
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
    title: 'Terraform + Ansible GitLab Runner',
    repo: 'https://github.com/MiguelABFlores/terraform-ansible-gitlab-runner',
    description:
      'Provisions a self-hosted GitLab Runner with Terraform (infrastructure) and Ansible (configuration). Practical exercise in clean separation of concerns between IaC and config management.',
    tech: ['Terraform', 'Ansible', 'GitLab', 'Linux'],
  },
  {
    title: 'Unity + Nginx + Docker',
    repo: 'https://github.com/MiguelABFlores/Unity-Nginx-Docker',
    description:
      'Containerizes a Unity WebGL build behind Nginx with brotli/gzip compression. Demonstrates how to ship a non-traditional payload through a standard container deployment pipeline.',
    tech: ['Docker', 'Nginx', 'Unity WebGL', 'Brotli/Gzip'],
  },
];
