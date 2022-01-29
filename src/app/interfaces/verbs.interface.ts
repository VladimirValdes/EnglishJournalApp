export interface Verbs {
  verbs: Verb[];
}

export interface SerchVerbs {
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
