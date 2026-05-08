export type Project = {
  title: string;
  repo: string;
  liveUrl?: string;
  description: string;
  highlight?: string;
  tech: string[];
  featured?: boolean;
  emoji?: string;
};

export const projects: Project[] = [
  {
    title: 'Self-Hosted DevOps Platform on Kubernetes',
    repo: 'https://github.com/MiguelABFlores/homelab-gitops',
    liveUrl: 'https://miguelabf-devops.com',
    description:
      'Production-grade, GitOps-managed Kubernetes platform on a 5-node cluster (1 control plane + 4 workers) bootstrapped with kubeadm on Proxmox VE — Intel i5-13500H, 32 GB RAM. The entire cluster state is declared in Git and reconciled by ArgoCD App-of-Apps: drift is detected and self-healed in ~30 seconds, zero manual kubectl apply after initial bootstrap.\n\nStack: Cilium CNI + eBPF networking · MetalLB bare-metal LoadBalancer · Traefik v3 ingress with Gateway API · Longhorn distributed block storage with 3-way replication · Harbor self-hosted registry with Trivy vulnerability scanning · multi-arch image builds (linux/amd64 + linux/arm64) · kube-prometheus-stack (Prometheus + Grafana + Alertmanager) · Cloudflare Tunnel for zero-trust public exposure — no open inbound firewall ports.',
    highlight:
      'The portfolio you\'re reading is deployed on this very cluster — built with a multi-stage Docker image (Node.js → static export → Nginx), pushed to a self-hosted Harbor registry, deployed by ArgoCD from a Git commit, and served publicly through a Cloudflare Tunnel with zero open inbound firewall ports. The site describes the infrastructure it runs on.',
    tech: ['Kubernetes', 'ArgoCD', 'GitOps', 'Helm', 'Cilium', 'MetalLB', 'Traefik', 'Longhorn', 'Harbor', 'Prometheus', 'Grafana', 'Proxmox VE', 'Docker', 'Cloudflare', 'Linux'],
    featured: true,
    emoji: '⚓',
  },
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
