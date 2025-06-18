# GET Action

The `get` action provides a type-safe way to perform GET requests against the Mirror Node API. It includes built-in retry logic and data transformation capabilities.

## Interface

```typescript
interface MirrorNodeGetParameters<C, P, O, D, R> {
  /** Mirror API client */
  client: C;
  /** API path to fetch from */
  path: P;
  /** Query options to send with the GET request */
  options?: O;
  /** Transformation function to apply on the retrieved data */
  transform?: (mirrorResponse: D) => R;
  /** Retry configuration for failed requests */
  retryOptions?: WithRetryParameters;
}
```

## Parameters

### 1. Client (`client`)

The [Mirror Node client](./client.md) instance that will be used to make the request.

### 2. Path (`path`)

The API endpoint path to fetch data from. Must be a valid Mirror Node API path.

```typescript
type MirrorPath =
  | "/api/v1/accounts"
  | "/api/v1/tokens"
  | "/api/v1/transactions"
  | "/api/v1/balances";
// ... other valid paths
```

### 3. Options (`options`)

Optional query parameters for the request.

```typescript
interface MirrorGetOptions<P> {
  params?: {
    query?: {
      [key: string]: string | number | boolean;
    };
    limit?: number;
    order?: "asc" | "desc";
  };
  headers?: {
    [key: string]: string;
  };
}
```

### 4. Transform (`transform`)

Optional function to transform the response data before returning.

```typescript
type TransformFunction<ResponseData, ReturnType> = (
  data: ResponseData
) => ReturnType;
```

### 5. Retry Options (`retryOptions`)

Optional configuration for retry behavior.

```typescript
interface WithRetryParameters {
  /** Maximum number of retry attempts */
  maxAttempts?: number;
  /** Delay between retries in milliseconds */
  delay?: number;
  /** Function to determine if retry should be attempted */
  shouldRetry?: (error: Error) => boolean;
}
```

## Usage Examples

### Basic Usage

```typescript
import { MirrorActions } from "@buidlerlabs/memejob-sdk-js";

const result = await MirrorActions.get({
  client: mirrorClient,
  path: "/api/v1/tokens/{tokenId}",
  options: {
    params: {
      path: {
        tokenId: "0.0.123456",
      },
    },
  },
});
```

### With Query Parameters

```typescript
import { MirrorActions } from "@buidlerlabs/memejob-sdk-js";

const result = await MirrorActions.get({
  client: mirrorClient,
  path: "/api/v1/balances",
  options: {
    params: {
      query: {
        "account.id": "0.0.123456",
        limit: 100,
      },
    },
  },
});
```

### With Data Transformation

```typescript
import { MirrorActions } from "@buidlerlabs/memejob-sdk-js";

const result = await MirrorActions.get({
  client: mirrorClient,
  path: "/api/v1/tokens/{tokenId}",
  options: {
    params: {
      path: {
        tokenId: "0.0.123456",
      },
    },
  },
  transform: (data) => {
    if (!data) return null;
    return {
      id: data.token_id,
      name: data.name,
      symbol: data.symbol,
    };
  },
});
```

### With Retry Configuration

```typescript
import { MirrorActions } from "@buidlerlabs/memejob-sdk-js";

const result = await MirrorActions.get({
  client: mirrorClient,
  path: "/api/v1/tokens/{tokenId}",
  options: {
    params: {
      path: {
        tokenId: "0.0.123456",
      },
    },
  },
  retryOptions: {
    maxAttempts: 5,
    delay: 2000,
    shouldRetry: ({ count, error }) => true,
  },
});
```

## Error Handling

The action throws a `MirrorNodeError` if the API request fails. You can handle specific error types:

```typescript
import { MirrorActions, MirrorNodeError } from "@buidlerlabs/memejob-sdk-js";

try {
  const result = await MirrorActions.get({
    client: mirrorClient,
    path: "/api/v1/tokens/{tokenId}",
    options: {
      params: {
        path: {
          tokenId: "0.0.123456",
        },
      },
    },
  });
} catch (error) {
  if (error instanceof MirrorNodeError) {
    console.error("Mirror Node error:", error.message);
  }
}
```

## Related Documentation

- [Paginated GET](./get-paginated.md) - For handling paginated requests
- [Mirror Node API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api) - Official API documentation
