export type SkillGroup = {
  title: string;
  items: string[];
  accent: 'cyan' | 'magenta';
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'CI/CD',
    accent: 'cyan',
    items: ['GitLab CI/CD', 'GitHub Actions', 'Jenkins'],
  },
  {
    title: 'Containers & Orchestration',
    accent: 'magenta',
    items: ['Docker', 'Docker Compose', 'Containerd', 'Kubernetes (k8s, k3s)', 'Helm'],
  },
  {
    title: 'Cloud Platforms',
    accent: 'cyan',
    items: ['AWS', 'GCP', 'DigitalOcean', 'Oracle Cloud Infrastructure'],
  },
  {
    title: 'IaC & Configuration',
    accent: 'magenta',
    items: ['Terraform', 'Ansible'],
  },
  {
    title: 'Monitoring & Logging',
    accent: 'cyan',
    items: ['Prometheus', 'Grafana', 'LitmusChaos'],
  },
  {
    title: 'Languages & Scripting',
    accent: 'magenta',
    items: ['Python', 'Bash', 'JavaScript', 'Perl', 'C#'],
  },
  {
    title: 'Other',
    accent: 'cyan',
    items: ['Git', 'GitLab', 'MongoDB', 'Nginx', 'WebLogic', 'Apex'],
  },
];
