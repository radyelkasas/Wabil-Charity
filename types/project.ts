export interface Donor {
  id: string;
  name: string;
  amount: number;
  date: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  content: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  image: string;
  charityName: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  endDate: string;
  description: string;
  location: string;
  beneficiaries: number;
  updates: ProjectUpdate[];
  gallery: string[];
  donors: Donor[];
}
