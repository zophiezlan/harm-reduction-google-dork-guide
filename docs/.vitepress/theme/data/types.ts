export interface Dork {
  title: string;
  category: string;
  query: string;
  explanation: string;
}

export interface DorkPack {
  id: string;
  title: string;
  description: string;
  dorks: Dork[];
}

export interface DorkWithPack extends Dork {
  packId: string;
  packTitle: string;
}
