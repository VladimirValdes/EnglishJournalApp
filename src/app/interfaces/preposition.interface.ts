export interface Prepositions {
  total: number;
  prepositions: Preposition[];
}

export interface SearchPrepositions {
  total: number;
  results: Preposition[];
}

export interface Preposition {
  _id:         string;
  preposition: string;
  user:        string;
  status:      boolean;
  createdAt:   Date;
  updatedAt:   Date;
}
