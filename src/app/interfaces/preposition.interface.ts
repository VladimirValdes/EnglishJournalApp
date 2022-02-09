export interface Prepositions {
  prepositions: Preposition[];
}

export interface SearchPrepositions {
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
