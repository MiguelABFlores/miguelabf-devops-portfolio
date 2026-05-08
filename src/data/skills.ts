export type SkillGroup = {
  title: string;
  items: string[];
  accent: 'cyan' | 'magenta';
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'CI/CD & GitOps',
    accent: 'cyan',
    items: ['GitLab CI/CD', 'GitHub Actions', 'Jenkins', 'ArgoCD', 'GitOps'],
  },
  {
    title: 'Containers & Orchestration',
    accent: 'magenta',
    items: ['Docker', 'Docker Compose', 'Containerd', 'Kubernetes', 'Helm', 'kubeadm', 'Proxmox VE'],
  },
  {
    title: 'Networking & Ingress',
    accent: 'cyan',
    items: ['Traefik', 'Cilium', 'MetalLB', 'Nginx', 'Cloudflare'],
  },
  {
    title: 'Storage & Registry',
    accent: 'magenta',
    items: ['Longhorn', 'Harbor', 'Trivy'],
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
    title: 'Monitoring & Observability',
    accent: 'cyan',
    items: ['Prometheus', 'Grafana', 'Alertmanager', 'node-exporter', 'LitmusChaos'],
  },
  {
    title: 'Languages & Scripting',
    accent: 'magenta',
    items: ['Python', 'Bash', 'JavaScript', 'Perl', 'C#'],
  },
  {
    title: 'Other',
    accent: 'cyan',
    items: ['Git', 'GitLab', 'MongoDB', 'Linux', 'WebLogic', 'Apex'],
  },
];
