export class MirrorNodeError extends Error {
  constructor(error: {
    _status?: {
      messages?: {
        data?: string | null;
        detail?: string | null;
        message?: string;
      }[];
    };
  }) {
    super(error._status?.messages?.map(({ message }) => message).join(","));
  }
}
