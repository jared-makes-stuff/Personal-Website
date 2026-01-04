export type HeroCta = {
  label: string;
  target: string;
};

export type HeroData = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  ctas: {
    primary: HeroCta;
    secondary: HeroCta;
  };
};

export type AboutData = {
  title: string;
  storyTitle: string;
  storyParagraphs: string[];
  workTitle: string;
  workParagraphs: string[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type ProjectsData = {
  title: string;
  intro: string;
  items: Project[];
};

export type InterestItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  linkUrl?: string;
  linkLabel?: string;
};

export type InterestsData = {
  title: string;
  intro: string;
  items: InterestItem[];
};

export type ContactData = {
  title: string;
  intro: string;
  formTitle: string;
  email: string;
  phone: string;
  location: string;
  locationUrl?: string;
};

export type SocialLinks = {
  linkedin: string;
  github: string;
  kofi?: string;
  buymeacoffee?: string;
};

export type SkillsData = {
  software: string[];
  other: string[];
};

export type TargetRole = {
  id: string;
  title: string;
  bullets: string[];
};

export type TargetsData = {
  title: string;
  items: TargetRole[];
};

export type EducationItem = {
  school: string;
  program: string;
  dates: string;
  logo?: string;
  highlights: string[];
};

export type EducationData = {
  title: string;
  items: EducationItem[];
};

export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  logo?: string;
  bullets: string[];
};

export type ExperienceData = {
  title: string;
  items: ExperienceItem[];
};

export type LicenseItem = {
  title: string;
  issuer: string;
  issued?: string;
  credentialId?: string;
  credentialUrl?: string;
};

export type LicensesData = {
  title: string;
  intro?: string;
  items: LicenseItem[];
};

export type HighlightItem = {
  id: string;
  title: string;
  bullets: string[];
};

export type HighlightsData = {
  title: string;
  items: HighlightItem[];
};


export type SiteData = {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectsData;
  interests: InterestsData;
  contact: ContactData;
  socials: SocialLinks;
  targets?: TargetsData;
  experience?: ExperienceData;
  education?: EducationData;
  licenses?: LicensesData;
  highlights?: HighlightsData;
};
