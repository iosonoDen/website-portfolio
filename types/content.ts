export type PublicPath = `/${string}`;

export type ImageAsset = {
  src: PublicPath;
  alt: string;
  width: number;
  height: number;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export type SkillItem = {
  id: string;
  label: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  items: SkillItem[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary?: string;
  outcomes: string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  description: string;
  image: ImageAsset;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  email: string;
  headline: string;
  lede: string;
  photo: ImageAsset;
  social: SocialLink[];
  stats: Stat[];
};
