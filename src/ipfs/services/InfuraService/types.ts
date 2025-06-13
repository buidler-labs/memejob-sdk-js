export type InfuraInitOptions = {
  host?: string;
  port?: number;
  protocol?: "https" | "http";
  projectKey: string;
  projectSecret: string;
};

export type InfuraAddOptions = {
  quiet?: boolean;
  quieter?: boolean;
  silent?: boolean;
  progress?: boolean;
  trickle?: boolean;
  onlyHash?: boolean;
  wrapWithDirectory?: boolean;
  pin?: boolean;
  rawLeaves?: boolean; // Experimental
  nocopy?: boolean; // Experimental
  fscache?: boolean; // Experimental
  cidVersion?: number; // Experimental
  hash?: string; // Experimental
};

export type InfuraPinOptions = {
  recursive: boolean;
  progress: boolean;
};
