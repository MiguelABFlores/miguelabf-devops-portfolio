export type SubProject = {
  name: string;
  period: string;
  description: string;
  responsibilities: string[];
  tech: string[];
};

export type Job = {
  company: string;
  companySlug: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech: string[];
  subProjects?: SubProject[];
};

export const experience: Job[] = [
  {
    company: 'Oracle',
    companySlug: 'oracle',
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
    companySlug: 'elain',
    role: 'Software Development Lead',
    period: 'Oct 2023 — Feb 2024',
    location: 'Guadalajara, MX',
    summary:
      'Served as lead engineer responsible for project design, structuring, planning, and product delivery for a veterinary clinic business website. Worked alongside a frontend apprentice, teaching Agile methodologies, Git management, and maintaining a well-organized workflow with branches and tickets.\n\nManaged infrastructure on Google Cloud Platform (GCP), handled network management, developed pipelines for automating the development environment with GitHub Actions, and was involved in bug fixing, Docker containerization, direct client interaction, and the full deployment of the application.',
    highlights: [
      'Project Management & planning, full ownership of product delivery',
      'Teaching and Mentoring a frontend apprentice on Agile + Git',
      'Collaboration and direct Client Interaction',
      'Bug Fixing and Docker containerization',
    ],
    tech: ['React', 'Node.js', 'Docker', 'GCP', 'GitHub Actions', 'Nginx', 'HTML5', 'Git'],
  },
  {
    company: 'Grid Dynamics',
    companySlug: 'griddynamics',
    role: 'Junior DevOps Engineer',
    period: 'Dec 2022 — Jan 2024',
    location: 'Guadalajara, MX',
    summary:
      'Worked on three internal DevOps projects covering the full spectrum of CI/CD, Kubernetes cluster management, cloud migrations, monitoring, and multi-platform pipelines.',
    highlights: [],
    tech: [
      'Kubernetes (k3s)', 'Helm', 'GitLab CI/CD', 'GCP', 'DigitalOcean',
      'Docker', 'Terraform', 'Prometheus', 'Grafana', 'LitmusChaos',
    ],
    subProjects: [
      {
        name: 'DevOps Project 3',
        period: 'Jun 2023 — Aug 2023',
        description:
          'Created the CI/CD pipeline for a React web application, provisioned GitLab Runners, built a JFrog artifact repository, and planned infrastructure for AWS. A key early lesson was developing communication skills to align with developers. Raised test environments in DigitalOcean before touching production-adjacent infrastructure.',
        responsibilities: [
          'Create GitLab Runners',
          'Develop the complete pipeline for the web application',
          'Set up Kubernetes services — JFrog Repository, Jenkins Server',
          'Raise tickets to request permissions and resources',
          'Participate in scrum meetings',
          'Create project documentation',
          'Design and organize an activity agenda for the team',
          'Develop an action plan to build infrastructure on AWS',
        ],
        tech: ['GitLab CI/CD', 'Jenkins', 'Bash', 'SSH', 'JFrog', 'Terraform', 'DigitalOcean', 'AWS', 'JavaScript', 'Docker', 'OpenVPN', 'Git'],
      },
      {
        name: 'DevOps Project 2',
        period: 'Aug 2023 — Jan 2024',
        description:
          'Reused the infrastructure from Project 1 to create resources for a new Python service. Built a multi-stage Docker image, created the full CI/CD pipeline, set up a Kubernetes CronJob for scheduled execution, and pushed versioned images to the Nexus 3 repository in the local cluster.',
        responsibilities: [
          'Create multi-stage Docker image of the Python script',
          'Create the full pipeline for the repository',
          'Define a branch strategy for the project',
          'Deploy built images to the Nexus 3 repository',
          'Create a Kubernetes CronJob for the application deployment',
          'Automate the project end-to-end',
        ],
        tech: ['GitLab CI/CD', 'Kubernetes', 'Helm', 'CronJob', 'Docker', 'Scripting', 'Networking', 'Git'],
      },
      {
        name: 'DevOps Project 1 — Main',
        period: 'Jun 2023 — Dec 2023',
        description:
          'Largest and most complex project: configured a local k3s cluster, deployed Nexus 3, MongoDB Replica Set, SonarQube, Prometheus, and Grafana via Helm, and managed GitLab Runners. Migrated the full stack from GCP serverless to the local cluster. Built all CI/CD pipelines from scratch for frontend (React), backend (Python), Android (Kotlin), and iOS (xCode). Ran chaos experiments with LitmusChaos.',
        responsibilities: [
          'Create and maintain GitLab CI/CD pipelines for Frontend, Backend, Android, iOS',
          'Deploy and maintain Nexus 3, SonarQube, MongoDB, Prometheus, Grafana via Helm',
          'Create GitLab Runners deployed with Helm charts',
          'Migrate infrastructure from GCP serverless to local Kubernetes cluster',
          'Design the team branch strategy and artifact versioning system',
          'Configure networking, Ingress, and Traefik for all services',
          'Propose and implement new tools and technologies for the team',
          'Troubleshoot all services, applications, pipelines and processes',
          'Run Chaos experiments with LitmusChaos',
          'Mentor and share knowledge with colleagues across the team',
        ],
        tech: ['Kubernetes (k3s)', 'Helm', 'Traefik', 'LitmusChaos', 'GitLab CI/CD', 'GCP', 'DigitalOcean', 'Docker', 'Bash', 'Python', 'Terraform', 'Nginx', 'Prometheus', 'Grafana', 'Monitoring'],
      },
    ],
  },
  {
    company: 'Assetel',
    companySlug: 'assetel',
    role: 'Cloud Engineer Intern',
    period: 'Jan 2018 — Nov 2018',
    location: 'Guadalajara, MX',
    summary:
      'Worked alongside a team of cloud engineers in the server department. Handled primarily Windows servers and managed a Linux server for the first time. Assisted the lead engineer with troubleshooting, remote monitoring, and data center visits. Supported office departments (accounting, finance, etc.) with computer equipment and the office network.\n\nMost notable task: automated several repetitive engineer duties, including writing a script to process logs and verify the status of specific servers.',
    highlights: [
      'Assisted lead engineer with server troubleshooting and remote monitoring',
      'Visited the company data center to ensure operational order',
      'Wrote automation scripts for log processing and server health checks',
      'Supported cross-department IT (accounting, finance, office network)',
    ],
    tech: ['Windows Server', 'Linux', 'Bash', 'Networking'],
  },
];
