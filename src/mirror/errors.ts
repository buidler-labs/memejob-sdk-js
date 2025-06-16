/**
 * An Error that parses messages from a mirror node API error response.
 */
export class MirrorNodeError extends Error {
  /**
   * Initializes a MirrorNodeError with messages extracted from the API's _status field.
   *
   * @param error - The mirror node API error response.
   */
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
