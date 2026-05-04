export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
};

export const experience: Job[] = [
  {
    company: 'Oracle',
    role: 'Site Reliability Developer',
    period: 'Jan 2024 — Present',
    location: 'Guadalajara, MX',
    summary:
      'Maintaining and improving the reliability and security of internal application servers, building Ansible playbooks for the team inventory, designing recovery plans, and contributing to one of the applications in Perl and Apex.',
    highlights: [
      'Building and maintaining GitLab CI/CD pipelines for internal services',
      'Hardening servers and patching vulnerabilities',
      'Authoring Ansible playbooks for fleet management',
      'Creating recovery plans and maintenance scripts',
    ],
    tech: ['GitLab', 'Ansible', 'Bash', 'Python', 'WebLogic', 'OCI', 'Apex', 'Perl'],
  },
  {
    company: 'Servicios Veterinarios Eläin',
    role: 'Software Development Lead',
    period: 'Oct 2023 — Feb 2024',
    location: 'Guadalajara, MX',
    summary:
      'Led the design, planning and delivery of a business website for a veterinary clinic. Mentored a frontend apprentice on Agile, Git, and team workflow, while owning GCP infrastructure, GitHub Actions pipelines, Docker containerization, and the full deployment.',
    highlights: [
      'Owned project planning, delivery, and direct client interaction',
      'Built CI/CD with GitHub Actions for the React/Node app',
      'Managed GCP infrastructure and Nginx-based deployment',
      'Mentored a frontend apprentice on Agile + Git',
    ],
    tech: ['React', 'Node.js', 'Docker', 'GCP', 'GitHub Actions', 'Nginx'],
  },
  {
    company: 'Grid Dynamics',
    role: 'Junior DevOps Engineer',
    period: 'Dec 2022 — Jan 2024',
    location: 'Guadalajara, MX',
    summary:
      'Built CI/CD pipelines from scratch for Frontend (React), Backend (Python), Android (Kotlin) and iOS (xCode); deployed and maintained Nexus 3, SonarQube, MongoDB, Prometheus and Grafana on a self-hosted k3s cluster; designed branching, versioning, and chaos experiments.',
    highlights: [
      'Migrated services from GCP serverless to a local k3s cluster',
      'Deployed Nexus, SonarQube, MongoDB, Prometheus, Grafana via Helm',
      'Designed branch strategy, artifact versioning, and chaos tests with LitmusChaos',
      'Stood up GitLab Runners and JFrog repositories for internal projects',
    ],
    tech: [
      'Kubernetes',
      'Helm',
      'GitLab CI/CD',
      'Terraform',
      'GCP',
      'DigitalOcean',
      'AWS',
      'Docker',
      'Prometheus',
      'Grafana',
      'LitmusChaos',
    ],
  },
  {
    company: 'Assetel',
    role: 'Cloud Engineer Intern',
    period: 'Jan 2018 — Nov 2018',
    location: 'Guadalajara, MX',
    summary:
      'Worked alongside the cloud engineering team supporting Windows and Linux servers, remote monitoring, and visiting the data center. Automated repetitive tasks for engineers — including a log-processing script to verify server health.',
    highlights: [
      'Assisted lead engineer with troubleshooting and remote monitoring',
      'Wrote scripts to automate log analysis and server health checks',
      'Supported office IT across departments',
    ],
    tech: ['Windows Server', 'Linux', 'Bash', 'Networking'],
  },
];
