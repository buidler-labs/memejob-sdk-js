import { afterEach, beforeAll, afterAll, expect, test } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { createMirrorConfig } from "../config";
import { LedgerId } from "@hashgraph/sdk";
import { get } from "./get";

const server = setupServer();

beforeAll(() => {
  server.listen({
    onUnhandledRequest: (request: Request) => {
      throw new Error(
        `No request handler found for ${request.method} ${request.url}`
      );
    },
  });
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Should return an array of transactions", async () => {
  const { client, baseUrl } = createMirrorConfig({
    ledgerId: LedgerId.TESTNET,
  });

  const rawData = {
    transactions: [
      { transaction_id: "transaction-1" },
      { transaction_id: "transaction-2" },
      { transaction_id: "transaction-3" },
    ],
  };

  server.use(
    http.get(`${baseUrl}/api/v1/transactions`, () =>
      HttpResponse.json(rawData, { status: 200 })
    )
  );

  const transactions = await get({
    client,
    path: "/api/v1/transactions",
  });

  expect(transactions).toEqual(rawData);
});

test("Should return a transformed response of transactions", async () => {
  const { client, baseUrl } = createMirrorConfig({
    ledgerId: LedgerId.TESTNET,
  });

  const rawData = {
    transactions: [
      { transaction_id: "transaction-1" },
      { transaction_id: "transaction-2" },
      { transaction_id: "transaction-3" },
    ],
  };

  server.use(
    http.get(`${baseUrl}/api/v1/transactions`, () =>
      HttpResponse.json(rawData, { status: 200 })
    )
  );

  const transactionsIds = await get({
    client,
    path: "/api/v1/transactions",
    transform: (page) =>
      page?.transactions?.map(({ transaction_id }) => transaction_id) ?? [],
  });

  expect(transactionsIds).toEqual(
    rawData?.transactions?.map(({ transaction_id }) => transaction_id)
  );
});

test("Should return not found error", async () => {
  const { client, baseUrl } = createMirrorConfig({
    ledgerId: LedgerId.TESTNET,
  });

  const errorData = {
    _status: {
      messages: [
        {
          message: "Not found",
        },
      ],
    },
  };

  server.use(
    http.get(`${baseUrl}/api/v1/transactions`, () =>
      HttpResponse.json(errorData, { status: 404 })
    )
  );

  try {
    const transactions = await get({
      client,
      path: "/api/v1/transactions",
    });
  } catch (e: any) {
    expect(e.message).toEqual("Not found");
  }
});
