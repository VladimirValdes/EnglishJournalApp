export interface Adjectives {
  total: number;
  adjectives: Adjective[];
}

export interface SearchAdjectives {
  total: number;
  results: Adjective[];
}

export interface Adjective {
  _id:       string;
  adjective: string;
  user:      string;
  status:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
