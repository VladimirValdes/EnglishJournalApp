export interface Connectors {
  total:number
  connectors: Connector[];
}

export interface SearchConnectors {
  total:number;
  results: Connector[];
}

export interface Connector {
  _id:       string;
  connector: string;
  user:      string;
  status:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
