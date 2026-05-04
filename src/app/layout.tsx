import type { Metadata } from 'next';
import { Inter, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://miguelabf-devops.com'),
  title: 'Miguel Briseño — DevOps Engineer',
  description:
    'DevOps Engineer in Guadalajara, Mexico. CI/CD, Kubernetes, Terraform, AWS, Ansible — building automated, reliable, and secure cloud infrastructure.',
  keywords: [
    'DevOps Engineer',
    'SRE',
    'Kubernetes',
    'Terraform',
    'AWS',
    'GitLab CI/CD',
    'Ansible',
    'Guadalajara',
    'Miguel Briseño',
  ],
  authors: [{ name: 'Miguel Angel Briseño Flores' }],
  openGraph: {
    title: 'Miguel Briseño — DevOps Engineer',
    description:
      'DevOps Engineer specialized in CI/CD, Kubernetes, and cloud automation.',
    url: 'https://miguelabf-devops.com',
    siteName: 'Miguel Briseño — Portfolio',
    type: 'website',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
