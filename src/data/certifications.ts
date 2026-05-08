export type Certification = {
  title: string;
  issuer: string;
  url?: string;
  year?: string;
  badge?: string;
  inProgress?: boolean;
};

export const certifications: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    url: 'https://www.credly.com/badges/1ffb676b-45b1-4df9-a4c6-14b531ee2443',
    badge: 'AWS',
  },
  {
    title: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Linux Foundation / CNCF',
    badge: 'CKA',
    inProgress: true,
  },
  {
    title: 'IELTS — C1 (Advanced)',
    issuer: 'British Council / IDP',
    badge: 'EN',
  },
  {
    title: 'Bachelor in Mechatronics Engineering',
    issuer: 'Tecnológico de Monterrey (ITESM)',
    badge: 'BSc',
  },
];
