export interface PhrasalVerbs {
  phrasalVerbs: PhrasalVerb[];
}

export interface PhrasalVerb {
  _id:         string;
  phrasalVerb: string;
  user:        string;
  status:      boolean;
  createdAt:   Date;
  updatedAt:   Date;
}