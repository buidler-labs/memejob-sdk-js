export type PinataInitOptions = {
  apiUrl: string;
  gatewayUrl: string;
  jwt: string;
};

export type PinataAddOptions = {
  pinataMetadata?: {
    name?: string;
    keyvalues?: Record<string, string>;
    [key: string]: unknown;
  };
  pinataOptions?: {
    cidVersion?: number;
    groupId?: string;
    [key: string]: unknown;
  };
  [key: string]: Record<string, unknown> | string | number | undefined;
};

export type PinataPinOptions = {
  pinataMetadata?: PinataAddOptions["pinataMetadata"];
  pinataOptions?: {
    hostNodes?: string[];
    groupId?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};
