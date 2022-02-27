export interface Verbs {
  total: number;
  verbs: Verb[];
}

export interface SearchVerbs {
  total: number;
  results: Verb[];
}

export interface Verb {
  _id:            string;
  baseForm:       string;
  pastSimple:     string;
  pastParticiple: string;
  type:           string;
  nik:            string;
  user:           string;
  status:         boolean;
  createdAt:      Date;
  updatedAt:      Date;
}
