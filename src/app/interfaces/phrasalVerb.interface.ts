export interface PhrasalVerbs {
  total: number;
  phrasalVerbs: PhrasalVerb[];
}


export interface SearchPhrasalVerbs {
  total: number;
  results: PhrasalVerb[];
}

export interface PhrasalVerb {
  _id:         string;
  phrasalVerb: string;
  user:        string;
  status:      boolean;
  createdAt:   Date;
  updatedAt:   Date;
}