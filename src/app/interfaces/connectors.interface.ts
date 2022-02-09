export interface Connectors {
  connectors: Connector[];
}

export interface SearchConnectors {
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
