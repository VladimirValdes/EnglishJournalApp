export interface Adjectives {
  adjectives: Adjective[];
}

export interface SearchAdjectives {
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
