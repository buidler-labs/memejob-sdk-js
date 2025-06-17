# Paginated GET Action

The `getPaginated` action provides a type-safe way to handle paginated requests against the Mirror Node API. It automatically handles pagination by following the `next` links in the response until all pages are retrieved.

## Interface

```typescript
interface MirrorNodeGetPaginatedParameters<C, P, O, D, R> {
  /** Mirror API client */
  client: C;
  /** API path to paginate */
  path: P;
  /** Query options for initial page */
  options?: O;
  /** Transformation function applied to each page */
  transform?: (page: D) => R;
  /** Retry configuration for failed requests */
  retryOptions?: WithRetryParameters;
}
```

## Parameters

### 1. Client (`client`)

The [Mirror Node client](./client.md) instance that will be used to make the requests.

### 2. Path (`path`)

The API endpoint path to fetch data from. Must be a valid Mirror Node API path that supports pagination.

```typescript
type MirrorPath =
  | "/api/v1/accounts"
  | "/api/v1/tokens"
  | "/api/v1/transactions"
  | "/api/v1/balances";
// ... other valid paths
```

### 3. Options (`options`)

Optional query parameters for the initial request. Subsequent requests will use the `next` link from the response.

```typescript
interface MirrorGetOptions<P> {
  params?: {
    path?: {
      [key: string]: string;
    };
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

Optional function to transform each page of data before adding it to the results.

```typescript
type TransformFunction<ResponseData, ReturnType> = (page: ResponseData) => ReturnType;
```

### 5. Retry Options (`retryOptions`)

Optional configuration for retry behavior on each page request.

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
import { getPaginated } from "memejob-sdk-js/mirror";

const results = await getPaginated({
  client: mirrorClient,
  path: "/api/v1/tokens",
});
```

### With Query Parameters

```typescript
import { getPaginated } from "memejob-sdk-js/mirror";

const results = await getPaginated({
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

### With Path Parameters

```typescript
import { getPaginated } from "memejob-sdk-js/mirror";

const results = await getPaginated({
  client: mirrorClient,
  path: "/api/v1/tokens/{tokenId}/balances",
  options: {
    params: {
      path: {
        tokenId: "0.0.123456",
      },
      query: {
        limit: 100,
      },
    },
  },
});
```

### With Data Transformation

```typescript
import { getPaginated } from "memejob-sdk-js/mirror";

const results = await getPaginated({
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
  transform: (page) => {
    if (!page) return [];
    return page.balances?.[0].tokens.filter(
      ({ token_id }) => token_id === "0.0.789012"
    );
  },
});
```

### With Retry Configuration

```typescript
import { getPaginated } from "memejob-sdk-js/mirror";

const results = await getPaginated({
  client: mirrorClient,
  path: "/api/v1/tokens",
  retryOptions: {
    maxAttempts: 3,
    delay: 1000,
    shouldRetry: ({ count, error }) => true,
  },
});
```

## Error Handling

The action throws a `MirrorNodeError` if any page request fails. You can handle specific error types:

```typescript
import { getPaginated, MirrorNodeError } from "memejob-sdk-js/mirror";

try {
  const results = await getPaginated({
    client: mirrorClient,
    path: "/api/v1/tokens",
  });
} catch (error) {
  if (error instanceof MirrorNodeError) {
    console.error("Mirror Node error:", error.message);
  }
}
```

## Related Documentation

- [GET Action](./get.md) - For single requests
- [Mirror Node API](https://docs.hedera.com/hedera/sdks-and-apis/rest-api) - Official API documentation
