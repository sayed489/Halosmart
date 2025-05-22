export interface NavItem {
  label: string;
  href: string;
}

export type RingColor = 'black' | 'green' | 'blue';

export interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface ForumPost {
  id: number;
  user: {
    name: string;
    avatar_url?: string;
  };
  content: string;
  created_at: string;
  likes: number;
  replies: number;
}