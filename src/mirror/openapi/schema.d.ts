export interface paths {
    "/api/v1/accounts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List account entities on network
         * @description Returns a list of all account entity items on the network.
         */
        get: operations["getAccounts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get account by alias, id, or evm address
         * @description Return the account transactions and balance information given an account alias, an account id, or an evm address. The information will be limited to at most 1000 token balances for the account as outlined in HIP-367.
         *     When the timestamp parameter is supplied, we will return transactions and account state for the relevant timestamp query. Balance information will be accurate to within 15 minutes of the provided timestamp query.
         *     Historical ethereum nonce information is currently not available and may not be the exact value at a provided timestamp.
         *
         */
        get: operations["getAccount"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/nfts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get nfts for an account info
         * @description Returns information for all non-fungible tokens for an account.
         *
         *     ## Ordering
         *     When considering NFTs, their order is governed by a combination of their numerical **token.Id** and **serialnumber** values, with **token.id** being the parent column.
         *     A serialnumbers value governs its order within the given token.id
         *
         *     In that regard, if a user acquired a set of NFTs in the order (2-2, 2-4 1-5, 1-1, 1-3, 3-3, 3-4), the following layouts illustrate the ordering expectations for ownership listing
         *     1. **All NFTs in ASC order**: 1-1, 1-3, 1-5, 2-2, 2-4, 3-3, 3-4
         *     2. **All NFTs in DESC order**: 3-4, 3-3, 2-4, 2-2, 1-5, 1-3, 1-1
         *     3. **NFTs above 1-1 in ASC order**: 1-3, 1-5, 2-2, 2-4, 3-3, 3-4
         *     4. **NFTs below 3-3 in ASC order**: 1-1, 1-3, 1-5, 2-2, 2-4
         *     5. **NFTs between 1-3 and 3-3 inclusive in DESC order**: 3-4, 3-3, 2-4, 2-2, 1-5, 1-3
         *
         *     Note: The default order for this API is currently DESC
         *
         *     ## Filtering
         *     When filtering there are some restrictions enforced to ensure correctness and scalability.
         *
         *     **The table below defines the restrictions and support for the NFT ownership endpoint**
         *
         *     | Query Param   | Comparison Operator | Support | Description           | Example |
         *     | ------------- | ------------------- | ------- | --------------------- | ------- |
         *     | token.id      | eq                  | Y       | Single occurrence only. | ?token.id=X |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. | ?token.id=lte:X |
         *     |               | gt(e)               | Y       | Single occurrence only. | ?token.id=gte:X |
         *     | serialnumber  | eq                  | Y       | Single occurrence only. Requires the presence of a **token.id** query | ?serialnumber=Y |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Requires the presence of an **lte** or **eq** **token.id** query | ?token.id=lte:X&serialnumber=lt:Y |
         *     |               | gt(e)               | Y       | Single occurrence only. Requires the presence of an **gte** or **eq** **token.id** query | ?token.id=gte:X&serialnumber=gt:Y |
         *     | spender.id    | eq                  | Y       | | ?spender.id=Z |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | | ?spender.id=lt:Z |
         *     |               | gt(e)               | Y       | | ?spender.id=gt:Z |
         *
         *     Note: When searching across a range for individual NFTs a **serialnumber** with an additional **token.id** query filter must be provided.
         *     Both filters must be a single occurrence of **gt(e)** or **lt(e)** which provide a lower and or upper boundary for search.
         *
         */
        get: operations["getNftsByAccountId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/rewards": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get past staking reward payouts for an account
         * @description Returns information for all past staking reward payouts for an account.
         *
         */
        get: operations["getStakingRewards"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get token relationships info for an account
         * @description Returns information for all token relationships for an account.
         *
         */
        get: operations["getTokensByAccountId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/airdrops/outstanding": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get outstanding token airdrops sent by an account
         * @description Returns outstanding token airdrops that have been sent by an account.
         *
         */
        get: operations["getOutstandingTokenAirdrops"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/airdrops/pending": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get pending token airdrops received by an account
         * @description Returns pending token airdrops that have been received by an account.
         *
         */
        get: operations["getPendingTokenAirdrops"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/allowances/crypto": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get crypto allowances for an account info
         * @description Returns information for all crypto allowances for an account.
         */
        get: operations["getCryptoAllowances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/allowances/tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get fungible token allowances for an account
         * @description Returns information for fungible token allowances for an account.
         *
         *     ## Ordering
         *     The order is governed by a combination of the spender id and the token id values, with spender id being the parent column.
         *     The token id value governs its order within the given spender id.
         *
         *     Note: The default order for this API is currently ASC
         *
         *     ## Filtering
         *     When filtering there are some restrictions enforced to ensure correctness and scalability.
         *
         *     **The table below defines the restrictions and support for the endpoint**
         *
         *     | Query Param   | Comparison Operator | Support | Description           | Example |
         *     | ------------- | ------------------- | ------- | --------------------- | ------- |
         *     | spender.id    | eq                  | Y       | Single occurrence only. | ?spender.id=X |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. | ?spender.id=lte:X |
         *     |               | gt(e)               | Y       | Single occurrence only. | ?spender.id=gte:X |
         *     | token.id      | eq                  | Y       | Single occurrence only. Requires the presence of a **spender.id** query | ?token.id=lt:Y |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Requires the presence of an **lte** or **eq** **spender.id** query | ?spender.id=lte:X&token.id=lt:Y |
         *     |               | gt(e)               | Y       | Single occurrence only. Requires the presence of an **gte** or **eq** **spender.id** query | ?spender.id=gte:X&token.id=gt:Y |
         *
         *     Both filters must be a single occurrence of **gt(e)** or **lt(e)** which provide a lower and or upper boundary for search.
         *
         */
        get: operations["getTokenAllowances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/accounts/{idOrAliasOrEvmAddress}/allowances/nfts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get non fungible token allowances for an account
         * @description Returns an account's non-fungible token allowances.
         *
         *     ## Ordering
         *     The order is governed by a combination of the account ID and the token ID values, with account ID being the parent column.
         *     The token ID value governs its order within the given account ID.
         *
         *     Note: The default order for this API is currently ascending. The account ID can be the owner or the spender ID depending upon the owner flag.
         *
         *     ## Filtering
         *     When filtering there are some restrictions enforced to ensure correctness and scalability.
         *
         *     **The table below defines the restrictions and support for the endpoint**
         *
         *     | Query Param   | Comparison Operator | Support | Description           | Example |
         *     | ------------- | ------------------- | ------- | --------------------- | ------- |
         *     | account.id    | eq                  | Y       | Single occurrence only. | ?account.id=X |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. | ?account.id=lte:X |
         *     |               | gt(e)               | Y       | Single occurrence only. | ?account.id=gte:X |
         *     | token.id      | eq                  | Y       | Single occurrence only. Requires the presence of an **account.id** parameter | ?account.id=X&token.id=eq:Y |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Requires the presence of an **lte** or **eq** **account.id** parameter | ?account.id=lte:X&token.id=lt:Y |
         *     |               | gt(e)               | Y       | Single occurrence only. Requires the presence of an **gte** or **eq** **account.id** parameter | ?account.id=gte:X&token.id=gt:Y |
         *
         *     Both filters must be a single occurrence of **gt(e)** or **lt(e)** which provide a lower and or upper boundary for search.
         *
         */
        get: operations["getNftAllowances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List account balances
         * @description Returns a list of account and token balances on the network. The latest balance information is returned when there is no timestamp query parameter, otherwise, the information is retrieved from snapshots with 15-minute granularity. This information is limited to at most 50 token balances per account as outlined in HIP-367. As such, it's not recommended for general use and we instead recommend using either `/api/v1/accounts/{id}/tokens` or `/api/v1/tokens/{id}/balances` to obtain the current token balance information and `/api/v1/accounts/{id}` to return the current account balance.
         */
        get: operations["getBalances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/blocks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List blocks
         * @description Returns a list of blocks on the network.
         */
        get: operations["getBlocks"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/blocks/{hashOrNumber}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get block by hash or number
         * @description Returns the block information by given hash or number.
         */
        get: operations["getBlock"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/call": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Invoke a smart contract
         * @description Returns a result from EVM execution such as cost-free execution of read-only smart contract queries, gas estimation, and transient simulation of read-write operations. If the `estimate` field is set to true gas estimation is executed. However, gas estimation only supports the `latest` block. When `estimate` is false, it can process calls against the `earliest` block and specific historical blocks when a hexadecimal or decimal block number is provided in the `block` field for `eth_call` operations. [Link to Supported/Unsupported Operations Table](https://github.com/hiero-ledger/hiero-mirror-node/blob/main/docs/web3/README.md#supported/unsupported-operations)
         *     The operations types which are not currently supported should return 501 error status.
         */
        post: operations["contractCall"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List contract entities on network
         * @description Returns a list of all contract entity items on the network.
         */
        get: operations["getContracts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/{contractIdOrAddress}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get contract by id
         * @description Return the contract information given an id
         */
        get: operations["getContract"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/{contractIdOrAddress}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List contract results from a contract on the network
         * @description Returns a list of all ContractResults for a contract's function executions.
         */
        get: operations["getContractResultsByContractId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/{contractIdOrAddress}/state": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * The contract state from a contract on the network
         * @description Returns a list of all contract's slots. If no timestamp is provided, returns the current state.
         */
        get: operations["getContractState"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/{contractIdOrAddress}/results/{timestamp}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the contract result from a contract on the network executed at a given timestamp
         * @description Returns a single ContractResult for a contract's function executions at a specific timestamp.
         */
        get: operations["getContractResultByIdAndTimestamp"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List contract results from all contracts on the network
         * @description Returns a list of all ContractResults for all contract's function executions.
         */
        get: operations["getContractsResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/results/{transactionIdOrHash}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the contract result from a contract on the network for a given transactionId or ethereum transaction hash
         * @description Returns a single ContractResult for a contract's function executions for a given transactionId or ethereum transaction hash.
         */
        get: operations["getContractResultByTransactionIdOrHash"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/results/{transactionIdOrHash}/actions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the contract actions from a contract on the network for a given transactionId or ethereum transaction hash
         * @description Returns a list of ContractActions for a contract's function executions for a given transactionId or ethereum transaction hash.
         */
        get: operations["getContractActions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/results/{transactionIdOrHash}/opcodes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the opcode traces for a historical transaction on the network with the given transaction ID or hash
         * @description Re-executes a transaction and returns a result containing detailed information for the execution,
         *     including all values from the {@code stack}, {@code memory} and {@code storage}
         *     and the entire trace of opcodes that were executed during the replay.
         *
         *     Note that to provide the output, the transaction needs to be re-executed on the EVM,
         *     which may take a significant amount of time to complete if stack and memory information is requested.
         *
         */
        get: operations["getContractOpcodes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/{contractIdOrAddress}/results/logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List contract logs from a contract on the network
         * @description Search the logs of a specific contract across multiple contract calls. Chained logs are not
         *     included but can be found by calling `/api/v1/contracts/{contractId}/results/{timestamp}`
         *     or `/api/v1/contracts/results/{transactionId}`. When searching by topic a timestamp parameter must be supplied
         *     and span a time range of at most seven days.
         *
         *     ## Ordering
         *     The order is governed by the combination of timestamp and index values. If the index param is omitted, the order is determined by the timestamp only.
         *
         *     Note: The default order for this API is currently DESC
         *
         *     ## Filtering
         *     When filtering there are some restrictions enforced to ensure correctness and scalability.
         *
         *     **The table below defines the restrictions and support for the endpoint**
         *
         *     | Query Param   | Comparison Operator | Support | Description           | Example |
         *     | ------------- | ------------------- | ------- | --------------------- | ------- |
         *     | index         | eq                  | Y       | Single occurrence only. Requires the presence of timestamp | ?index=X |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Requires the presence of timestamp | ?index=lte:X |
         *     |               | gt(e)               | Y       | Single occurrence only. Requires the presence of timestamp | ?index=gte:X |
         *     | timestamp     | eq                  | Y       | Single occurrence only. | ?timestamp=Y
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Optional second timestamp **gt(e)** | ?timestamp=lte:Y
         *     |               | gt(e)               | Y       | Single occurrence only. Optional second timestamp **lt(e)** | ?timestamp=gte:Y
         *
         *
         *     Both filters must be a single occurrence of **gt(e)** or **lt(e)** which provide a lower and or upper boundary for search.
         *
         */
        get: operations["getContractLogsByContractId"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/contracts/results/logs": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List contracts logs across many contracts on the network
         * @description Search the logs across many contracts with multiple contract calls. Chained logs are not
         *     included but can be found by calling `/api/v1/contracts/{contractId}/results/{timestamp}`
         *     or `/api/v1/contracts/results/{transactionId}`. When searching by topic a timestamp parameter must be supplied
         *     and span a time range of at most seven days.
         *
         *     ## Ordering
         *     The order is governed by the combination of timestamp and index values. If the index param is omitted, the order is determined by the timestamp only.
         *
         *     Note: The default order for this API is currently DESC
         *
         *     ## Filtering
         *     When filtering there are some restrictions enforced to ensure correctness and scalability.
         *
         *     **The table below defines the restrictions and support for the endpoint**
         *
         *     | Query Param   | Comparison Operator | Support | Description           | Example |
         *     | ------------- | ------------------- | ------- | --------------------- | ------- |
         *     | index         | eq                  | Y       | Single occurrence only. Requires the presence of timestamp | ?index=X |
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Requires the presence of timestamp | ?index=lte:X |
         *     |               | gt(e)               | Y       | Single occurrence only. Requires the presence of timestamp | ?index=gte:X |
         *     | timestamp     | eq                  | Y       | Single occurrence only. | ?timestamp=Y
         *     |               | ne                  | N       | | |
         *     |               | lt(e)               | Y       | Single occurrence only. Optional second timestamp **gt(e)** | ?timestamp=lte:Y
         *     |               | gt(e)               | Y       | Single occurrence only. Optional second timestamp **lt(e)** | ?timestamp=gte:Y
         *
         *
         *     Both filters must be a single occurrence of **gt(e)** or **lt(e)** which provide a lower and or upper boundary for search.
         *
         */
        get: operations["getContractsLogs"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/network/exchangerate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the network exchange rate to estimate costs
         * @description Returns the network's exchange rate, current and next.
         */
        get: operations["getNetworkExchangeRate"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/network/fees": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the network fees
         * @description Returns the estimated gas in tinybars per each transaction type. Default order is ASC. Currently only `ContractCall`, `ContractCreate` and `EthereumTransaction` transaction types are supported.
         */
        get: operations["getNetworkFees"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/network/nodes": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the network address book nodes
         * @description Returns the network's list of nodes used in consensus
         */
        get: operations["getNetworkNodes"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/network/stake": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get network stake information
         * @description Returns the network's current stake information.
         */
        get: operations["getNetworkStake"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/network/supply": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the network supply
         * @description Returns the network's released supply of hbars
         */
        get: operations["getNetworkSupply"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/schedules": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List schedules entities
         * @description Lists schedules on the network that govern the execution logic of scheduled transactions. This includes executed and non executed schedules.
         */
        get: operations["getSchedules"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/schedules/{scheduleId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get schedule by id
         * @description Returns schedule information based on the given schedule id
         */
        get: operations["getSchedule"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List transactions
         * @description Lists transactions on the network. This includes successful and unsuccessful transactions.
         */
        get: operations["getTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/transactions/{transactionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get transaction by id
         * @description Returns transaction information based on the given transaction id
         */
        get: operations["getTransaction"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/topics/{topicId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get topic by ID
         * @description Returns the topic details for the given topic ID.
         */
        get: operations["getTopic"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/topics/{topicId}/messages": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List topic messages by id
         * @description Returns the list of topic messages for the given topic id.
         */
        get: operations["getTopicMessages"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/topics/{topicId}/messages/{sequenceNumber}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get topic message by id and sequence number
         * @description Returns a single topic message for the given topic id and sequence number.
         */
        get: operations["getTopicMessageByIdAndSequenceNumber"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/topics/messages/{timestamp}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get topic message by consensusTimestamp
         * @description Returns a topic message the given the consensusTimestamp.
         */
        get: operations["getTopicMessageByTimestamp"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List tokens
         * @description Returns a list of tokens on the network.
         */
        get: operations["getTokens"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens/{tokenId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get token by id
         * @description Returns token entity information given the id
         */
        get: operations["getToken"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens/{tokenId}/balances": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List token balances
         * @description Returns a list of token balances given the id. This represents the Token supply distribution across the network
         */
        get: operations["getTokenBalances"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens/{tokenId}/nfts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List nfts
         * @description Returns a list of non-fungible tokens
         */
        get: operations["getNfts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens/{tokenId}/nfts/{serialNumber}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get nft info
         * @description Returns information for a non-fungible token
         */
        get: operations["getNft"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/v1/tokens/{tokenId}/nfts/{serialNumber}/transactions": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get an nfts transction history
         * @description Returns a list of transactions for a given non-fungible token
         */
        get: operations["getNftTransactions"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** @description Account alias in the format of 'shard.realm.alias', 'realm.alias', or 'alias'. 'alias' is the RFC4648 no-padding base32 encoded string of the account's alias. */
        AccountAlias: string;
        AccountsResponse: {
            accounts: components["schemas"]["Accounts"];
            links: components["schemas"]["Links"];
        };
        Allowance: {
            /**
             * Format: int64
             * @description The amount remaining of the original amount granted.
             * @example 75
             */
            amount?: number;
            /**
             * Format: int64
             * @description The granted amount of the spender's allowance.
             * @example 100
             */
            amount_granted?: number;
            owner?: components["schemas"]["EntityId"];
            spender?: components["schemas"]["EntityId"];
            timestamp?: components["schemas"]["TimestampRange"];
        };
        AssessedCustomFee: {
            /** Format: int64 */
            amount?: number;
            collector_account_id?: components["schemas"]["EntityId"];
            effective_payer_account_ids?: components["schemas"]["EntityId"][];
            token_id?: components["schemas"]["EntityId"];
        };
        BalancesResponse: {
            timestamp?: components["schemas"]["TimestampNullable"];
            balances?: components["schemas"]["AccountBalance"][];
            links?: components["schemas"]["Links"];
        };
        ContractResponse: components["schemas"]["Contract"] & {
            /**
             * Format: binary
             * @description The contract bytecode in hex during deployment
             * @example 0x01021a1fdc9b
             */
            bytecode?: string | null;
            /**
             * Format: binary
             * @description The contract bytecode in hex after deployment
             * @example 0x0302fa1ad39c
             */
            runtime_bytecode?: string | null;
        };
        ContractsResponse: {
            contracts?: components["schemas"]["Contracts"];
            links?: components["schemas"]["Links"];
        };
        ContractResultsResponse: {
            results?: components["schemas"]["ContractResults"];
            links?: components["schemas"]["Links"];
        };
        ContractStateResponse: {
            state?: components["schemas"]["ContractState"][];
            links?: components["schemas"]["Links"];
        };
        ContractActionsResponse: {
            actions?: components["schemas"]["ContractActions"];
            links?: components["schemas"]["Links"];
        };
        ContractLogsResponse: {
            logs?: components["schemas"]["ContractLogs"];
            links?: components["schemas"]["Links"];
        };
        CryptoAllowancesResponse: {
            allowances?: components["schemas"]["CryptoAllowances"];
            links?: components["schemas"]["Links"];
        };
        NetworkExchangeRateSetResponse: {
            current_rate?: components["schemas"]["ExchangeRate"];
            next_rate?: components["schemas"]["ExchangeRate"];
            timestamp?: components["schemas"]["Timestamp"];
        };
        NetworkFeesResponse: {
            fees?: components["schemas"]["NetworkFees"];
            timestamp?: components["schemas"]["Timestamp"];
        };
        NetworkNodesResponse: {
            nodes: components["schemas"]["NetworkNodes"];
            links: components["schemas"]["Links"];
        };
        NetworkSupplyResponse: {
            /**
             * @description The network's released supply of hbars in tinybars
             * @example 3999999999999999949
             */
            released_supply?: string;
            timestamp?: components["schemas"]["Timestamp"] & unknown;
            /**
             * @description The network's total supply of hbars in tinybars
             * @example 5000000000000000000
             */
            total_supply?: string;
        };
        NftAllowancesResponse: {
            allowances?: components["schemas"]["NftAllowances"];
            links?: components["schemas"]["Links"];
        };
        OpcodesResponse: {
            /**
             * Format: binary
             * @description The address of the transaction recipient in hex.
             *     Zero address is set for transactions without a recipient (e.g., contract create)
             *
             */
            address: string;
            contract_id: components["schemas"]["EntityId"];
            /** @description Whether the transaction failed to be completely processed. */
            failed: boolean;
            /**
             * Format: int64
             * @description The gas used in tinybars
             */
            gas: number;
            /** @description The logs produced by the opcode logger */
            opcodes: components["schemas"]["Opcode"][];
            /**
             * Format: binary
             * @description The returned data from the transaction in hex
             */
            return_value: string;
        };
        /** @description Represents a struct/opcode log entry in a trace */
        Opcode: {
            /**
             * Format: int32
             * @description The current call depth
             */
            depth: number;
            /**
             * Format: int64
             * @description The remaining gas
             */
            gas: number;
            /**
             * Format: int64
             * @description The cost for executing op
             */
            gas_cost: number;
            /** @description The EVM memory with items in hex */
            memory: string[] | null;
            /** @description The opcode to execute */
            op: string;
            /**
             * Format: int32
             * @description The program counter
             */
            pc: number;
            /**
             * Format: binary
             * @description The revert reason in hex
             */
            reason?: string | null;
            /** @description The EVM stack with items in hex */
            stack: string[] | null;
            /** @description The storage slots (keys and values in hex) of the current contract which is read from and written to */
            storage: {
                [key: string]: string;
            } | null;
        };
        SchedulesResponse: {
            schedules?: components["schemas"]["Schedules"];
            links?: components["schemas"]["Links"];
        };
        BlocksResponse: {
            blocks?: components["schemas"]["Blocks"];
            links?: components["schemas"]["Links"];
        };
        StakingRewardsResponse: {
            rewards?: components["schemas"]["StakingReward"][];
            links?: components["schemas"]["Links"];
        };
        TokenAirdropsResponse: {
            airdrops?: components["schemas"]["TokenAirdrops"];
            links?: components["schemas"]["Links"];
        };
        TokenAllowancesResponse: {
            allowances?: components["schemas"]["TokenAllowances"];
            links?: components["schemas"]["Links"];
        };
        TokenBalancesResponse: {
            timestamp?: components["schemas"]["TimestampNullable"];
            balances?: components["schemas"]["TokenDistribution"];
            links?: components["schemas"]["Links"];
        };
        TokenRelationshipResponse: {
            tokens?: components["schemas"]["TokenRelationship"][];
            links?: components["schemas"]["Links"];
        };
        TokensResponse: {
            tokens?: components["schemas"]["Tokens"];
            links?: components["schemas"]["Links"];
        };
        TopicMessagesResponse: {
            messages?: components["schemas"]["TopicMessages"];
            links?: components["schemas"]["Links"];
        };
        TransactionByIdResponse: {
            transactions?: components["schemas"]["TransactionDetails"];
        };
        TransactionsResponse: {
            transactions?: components["schemas"]["Transactions"];
            links?: components["schemas"]["Links"];
        };
        /** @example {
         *       "account": "0.0.8",
         *       "alias": "HIQQEXWKW53RKN4W6XXC4Q232SYNZ3SZANVZZSUME5B5PRGXL663UAQA",
         *       "auto_renew_period": null,
         *       "balance": {
         *         "timestamp": "0.000002345",
         *         "balance": 80,
         *         "tokens": [
         *           {
         *             "token_id": "0.0.200001",
         *             "balance": 8
         *           }
         *         ]
         *       },
         *       "created_timestamp": "1562591528.000123456",
         *       "decline_reward": false,
         *       "deleted": false,
         *       "ethereum_nonce": 10,
         *       "evm_address": "0xac384c53f03855fa1b3616052f8ba32c6c2a2fec",
         *       "expiry_timestamp": null,
         *       "key": null,
         *       "max_automatic_token_associations": 200,
         *       "memo": "entity memo",
         *       "pending_reward": 100,
         *       "receiver_sig_required": false,
         *       "staked_account_id": null,
         *       "staked_node_id": 3,
         *       "stake_period_start": "172800000.000000000"
         *     } */
        AccountInfo: {
            account: components["schemas"]["EntityId"];
            alias: components["schemas"]["Alias"];
            /** Format: int64 */
            auto_renew_period: number | null;
            balance: components["schemas"]["Balance"];
            created_timestamp: components["schemas"]["TimestampNullable"];
            /** @description Whether the account declines receiving a staking reward */
            decline_reward: boolean;
            deleted: boolean | null;
            /** Format: int64 */
            ethereum_nonce: number | null;
            evm_address: components["schemas"]["EvmAddressNullable"];
            expiry_timestamp: components["schemas"]["TimestampNullable"];
            key: components["schemas"]["Key"];
            /** Format: int32 */
            max_automatic_token_associations: number | null;
            memo: string | null;
            /**
             * Format: int64
             * @description The pending reward in tinybars the account will receive in the next reward payout. Note the value is updated
             *     at the end of each staking period and there may be delay to reflect the changes in the past staking period.
             *
             */
            pending_reward?: number;
            receiver_sig_required: boolean | null;
            staked_account_id: components["schemas"]["EntityId"] & unknown;
            /**
             * Format: int64
             * @description The id of the node to which this account is staking
             */
            staked_node_id: number | null;
            stake_period_start: components["schemas"]["TimestampNullable"] & unknown;
        };
        Accounts: components["schemas"]["AccountInfo"][];
        /** @example {
         *       "account": "0.15.10",
         *       "balance": 80,
         *       "tokens": [
         *         {
         *           "token_id": "0.0.200001",
         *           "balance": 8
         *         }
         *       ]
         *     } */
        AccountBalance: {
            account: components["schemas"]["EntityId"];
            /** Format: int64 */
            balance: number;
            tokens: components["schemas"]["TokenBalance"][];
        };
        AccountBalanceTransactions: components["schemas"]["AccountInfo"] & {
            transactions: components["schemas"]["Transactions"];
            links: components["schemas"]["Links"];
        };
        /**
         * @description RFC4648 no-padding base32 encoded account alias
         * @example HIQQEXWKW53RKN4W6XXC4Q232SYNZ3SZANVZZSUME5B5PRGXL663UAQA
         */
        Alias: string | null;
        /** @example {
         *       "timestamp": "0.000002345",
         *       "balance": 80,
         *       "tokens": [
         *         {
         *           "token_id": "0.0.200001",
         *           "balance": 8
         *         }
         *       ]
         *     } */
        Balance: {
            timestamp: components["schemas"]["TimestampNullable"];
            /** Format: int64 */
            balance: number | null;
            tokens: {
                token_id?: components["schemas"]["EntityId"];
                /** Format: int64 */
                balance?: number;
            }[];
        } | null;
        /**
         * Format: binary
         * @example 0x549358c4c2e573e02410ef7b5a5ffa5f36dd7398
         */
        Bloom: string | null;
        ChunkInfo: {
            initial_transaction_id?: components["schemas"]["TransactionId"];
            /**
             * Format: int32
             * @example 1
             */
            number?: number;
            /**
             * Format: int32
             * @example 2
             */
            total?: number;
        } | null;
        Contract: {
            admin_key?: components["schemas"]["Key"];
            auto_renew_account?: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @example 7776000
             */
            auto_renew_period?: number | null;
            contract_id?: components["schemas"]["EntityId"];
            created_timestamp?: components["schemas"]["TimestampNullable"];
            /** @example false */
            deleted?: boolean;
            evm_address?: components["schemas"]["EvmAddress"];
            expiration_timestamp?: components["schemas"]["TimestampNullable"];
            file_id?: components["schemas"]["EntityId"];
            /** Format: int32 */
            max_automatic_token_associations?: number | null;
            /** @example contract memo */
            memo?: string;
            obtainer_id?: components["schemas"]["EntityId"];
            permanent_removal?: boolean | null;
            proxy_account_id?: components["schemas"]["EntityId"];
            timestamp?: components["schemas"]["TimestampRange"];
        };
        Contracts: components["schemas"]["Contract"][];
        ContractLog: components["schemas"]["ContractResultLog"] & {
            /**
             * @description The hex encoded block (record file chain) hash
             * @example 0x553f9311833391c0a3b2f9ed64540a89f2190a511986cd94889f1c0cf7fa63e898b1c6730f14a61755d1fb4ca05fb073
             */
            block_hash?: string;
            /**
             * Format: int64
             * @description The block height calculated as the number of record files starting from zero since network start.
             * @example 10
             */
            block_number?: number;
            root_contract_id?: components["schemas"]["EntityId"] & unknown;
            timestamp?: components["schemas"]["Timestamp"];
            /**
             * @description A hex encoded transaction hash
             * @example 0x397022d1e5baeb89d0ab66e6bf602640610e6fb7e55d78638db861e2c6339aa9
             */
            transaction_hash?: string;
            /**
             * Format: int32
             * @description The position of the transaction in the block
             * @example 1
             */
            transaction_index?: number | null;
        };
        /**
         * @description A list of hex encoded topics associated with this log event
         * @example [
         *       "0xf4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad300"
         *     ]
         */
        ContractLogTopics: string[];
        ContractAction: {
            /**
             * Format: int32
             * @description The nesting depth of the call
             * @example 1
             */
            call_depth?: number;
            /**
             * @description The type of the call operation
             * @example CALL
             * @enum {string}
             */
            call_operation_type?: "CALL" | "CALLCODE" | "CREATE" | "CREATE2" | "DELEGATECALL" | "STATICCALL" | "UNKNOWN";
            /**
             * @description The type of the call
             * @example CALL
             * @enum {string}
             */
            call_type?: "NO_ACTION" | "CALL" | "CREATE" | "PRECOMPILE" | "SYSTEM";
            caller?: components["schemas"]["EntityId"];
            /**
             * @description The entity type of the caller
             * @example ACCOUNT
             * @enum {string}
             */
            caller_type?: "ACCOUNT" | "CONTRACT";
            /**
             * @description The EVM address of the caller
             * @example 0x0000000000000000000000000000000000000065
             */
            from?: string;
            /**
             * Format: int64
             * @description Gas cost in tinybars
             * @example 50000
             */
            gas?: number;
            /**
             * Format: int64
             * @description Gas used in tinybars
             * @example 50000
             */
            gas_used?: number;
            /**
             * Format: int32
             * @description The position of the action within the ordered list of actions
             * @example 0
             */
            index?: number;
            /**
             * @description The hex encoded input data
             * @example 0x123456
             */
            input?: string | null;
            recipient?: components["schemas"]["EntityId"];
            /**
             * @description The entity type of the recipient
             * @example ACCOUNT
             * @enum {string|null}
             */
            recipient_type?: "ACCOUNT" | "CONTRACT" | null;
            /**
             * @description The hex encoded result data
             * @example 0x123456
             */
            result_data?: string | null;
            /**
             * @description The type of the result data
             * @example OUTPUT
             * @enum {string}
             */
            result_data_type?: "OUTPUT" | "REVERT_REASON" | "ERROR";
            timestamp?: components["schemas"]["Timestamp"];
            to?: components["schemas"]["EvmAddressNullable"];
            /**
             * Format: int64
             * @description The value of the transaction in tinybars
             * @example 50000
             */
            value?: number;
        };
        ContractResult: {
            /**
             * @description The hex encoded access_list of the wrapped ethereum transaction
             * @example 0xabcd
             */
            access_list?: string | null;
            /**
             * @description The hex encoded evm address of contract
             * @example 0x25fe26adc577cc89172e6156c9e24f7b9751b762
             */
            address?: string;
            /**
             * Format: int64
             * @description The number of tinybars sent to the function
             * @example 10
             */
            amount?: number | null;
            /**
             * Format: int64
             * @description The total amount of gas used in the block
             * @example 2000
             */
            block_gas_used?: number | null;
            /**
             * @description The hex encoded block (record file chain) hash
             * @example 0x6ceecd8bb224da491
             */
            block_hash?: string | null;
            /**
             * Format: int64
             * @description The block height calculated as the number of record files starting from zero since network start.
             * @example 10
             */
            block_number?: number | null;
            bloom?: components["schemas"]["Bloom"] & unknown;
            /**
             * @description The hex encoded result returned by the function
             * @example 0x2b048531b38d2882e86044bc972e940ee0a01938
             */
            call_result?: string | null;
            /**
             * @description The hex encoded chain_id of the wrapped ethereum transaction
             * @example 0x0127
             */
            chain_id?: string | null;
            contract_id?: components["schemas"]["EntityId"];
            /** @description The list of smart contracts that were created by the function call. */
            created_contract_ids?: components["schemas"]["EntityId"][] | null;
            /**
             * @description The message when an error occurs during smart contract execution
             * @example Out of gas
             */
            error_message?: string | null;
            /**
             * @description The hex encoded initcode of a failed contract create transaction
             * @example 0x856739
             */
            failed_initcode?: string;
            from?: components["schemas"]["EvmAddressNullable"];
            /**
             * @description The hex encoded parameters passed to the function
             * @example 0xbb9f02dc6f0e3289f57a1f33b71c73aa8548ab8b
             */
            function_parameters?: string | null;
            /**
             * Format: int64
             * @description The units of consumed gas by the EVM to execute contract
             * @example 35000
             */
            gas_consumed?: number | null;
            /**
             * Format: int64
             * @description The maximum units of gas allowed for contract execution
             * @example 100000
             */
            gas_limit?: number;
            /**
             * @description The hex encoded gas_price of the wrapped ethereum transaction
             * @example 0x4a817c800
             */
            gas_price?: string | null;
            /**
             * Format: int64
             * @description The units of gas used to execute contract
             * @example 80000
             */
            gas_used?: number | null;
            /**
             * @description A hex encoded 32 byte hash and it is only populated for Ethereum transaction case
             * @example 0xfebbaa29c513d124a6377246ea3506ad917d740c21a88f61a1c55ba338fc2bb1
             */
            hash?: string;
            /**
             * @description The hex encoded max_fee_per_gas of the wrapped ethereum transaction
             * @example 0x5
             */
            max_fee_per_gas?: string | null;
            /**
             * @description The hex encoded max_priority_fee_per_gas of the wrapped ethereum transaction
             * @example 0x100
             */
            max_priority_fee_per_gas?: string | null;
            /**
             * Format: int64
             * @description The nonce of the wrapped ethereum transaction
             * @example 1
             */
            nonce?: number | null;
            /**
             * @description The hex encoded signature_r of the wrapped ethereum transaction
             * @example 0xd693b532a80fed6392b428604171fb32fdbf953728a3a7ecc7d4062b1652c043
             */
            r?: string | null;
            /**
             * @description The result of the transaction
             * @example SUCCESS
             */
            result?: string;
            /**
             * @description The hex encoded signature_s of the wrapped ethereum transaction
             * @example 0x24e9c602ac800b983b035700a14b23f78a253ab762deab5dc27e3555a750b355
             */
            s?: string | null;
            /**
             * @description The status of the transaction, 0x1 for a SUCCESS transaction and 0x0 for all else
             * @example 1
             */
            status?: string;
            timestamp?: components["schemas"]["Timestamp"];
            to?: components["schemas"]["EvmAddressNullable"];
            /**
             * Format: int64
             * @description The position of the transaction in the block
             * @example 1
             */
            transaction_index?: number | null;
            /**
             * @description The type of the wrapped ethereum transaction, 0 (Pre-Eip1559) or 2 (Post-Eip1559)
             * @example 2
             */
            type?: number | null;
            /**
             * @description The recovery_id of the wrapped ethereum transaction
             * @example 1
             */
            v?: number | null;
        };
        ContractResultDetails: components["schemas"]["ContractResult"] & {
            /**
             * @description The hex encoded access_list of the wrapped ethereum transaction
             * @example 0xabcd
             */
            access_list?: string | null;
            /**
             * @description The hex encoded evm address of contract
             * @example 0x25fe26adc577cc89172e6156c9e24f7b9751b762
             */
            address?: string;
            /**
             * Format: int64
             * @description The total amount of gas used in the block
             * @example 2000
             */
            block_gas_used?: number | null;
            /**
             * @description The hex encoded block (record file chain) hash
             * @example 0x6ceecd8bb224da491
             */
            block_hash?: string | null;
            /**
             * Format: int64
             * @description The block height calculated as the number of record files starting from zero since network start.
             * @example 10
             */
            block_number?: number | null;
            /**
             * @description The hex encoded chain_id of the wrapped ethereum transaction
             * @example 0x0127
             */
            chain_id?: string | null;
            /**
             * @description The hex encoded initcode of a failed contract create transaction
             * @example 0x856739
             */
            failed_initcode?: string;
            /**
             * @description The hex encoded gas_price of the wrapped ethereum transaction
             * @example 0x4a817c800
             */
            gas_price?: string | null;
            /**
             * @description The hex encoded transaction hash
             * @example 0x3531396130303866616264653464
             */
            hash?: string;
            logs?: components["schemas"]["ContractResultLogs"];
            /**
             * @description The hex encoded max_fee_per_gas of the wrapped ethereum transaction
             * @example 0x5
             */
            max_fee_per_gas?: string | null;
            /**
             * @description The hex encoded max_priority_fee_per_gas of the wrapped ethereum transaction
             * @example 0x100
             */
            max_priority_fee_per_gas?: string | null;
            /**
             * Format: int64
             * @description The nonce of the wrapped ethereum transaction
             * @example 1
             */
            nonce?: number | null;
            /**
             * @description The hex encoded signature_r of the wrapped ethereum transaction
             * @example 0xd693b532a80fed6392b428604171fb32fdbf953728a3a7ecc7d4062b1652c043
             */
            r?: string | null;
            /**
             * @description The hex encoded signature_s of the wrapped ethereum transaction
             * @example 0x24e9c602ac800b983b035700a14b23f78a253ab762deab5dc27e3555a750b355
             */
            s?: string | null;
            state_changes?: components["schemas"]["ContractResultStateChanges"];
            /**
             * Format: int64
             * @description The position of the transaction in the block
             * @example 1
             */
            transaction_index?: number | null;
            /**
             * @description The type of the wrapped ethereum transaction, 0 (Pre-Eip1559) or 2 (Post-Eip1559)
             * @example 2
             */
            type?: number | null;
            /**
             * @description The recovery_id of the wrapped ethereum transaction
             * @example 1
             */
            v?: number | null;
        };
        ContractResultLog: {
            /**
             * @description The hex encoded EVM address of the contract
             * @example 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
             */
            address?: string;
            bloom?: components["schemas"]["Bloom"] & unknown;
            contract_id?: components["schemas"]["EntityId"];
            /**
             * @description The hex encoded data of the contract log
             * @example 0x00000000000000000000000000000000000000000000000000000000000000fa
             */
            data?: string | null;
            /**
             * @description The index of the contract log in the chain of logs for an execution
             * @example 0
             */
            index?: number;
            topics?: components["schemas"]["ContractLogTopics"];
        };
        ContractResultLogs: components["schemas"]["ContractResultLog"][];
        ContractState: {
            address: components["schemas"]["EvmAddress"];
            contract_id: components["schemas"]["EntityId"];
            timestamp: components["schemas"]["Timestamp"];
            /**
             * Format: binary
             * @description The hex encoded storage slot.
             * @example 0x00000000000000000000000000000000000000000000000000000000000000fa
             */
            slot: string;
            /**
             * Format: binary
             * @description The hex encoded value to the slot. `0x` implies no value written.
             * @example 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925
             */
            value: string;
        };
        ContractResultStateChange: {
            address?: components["schemas"]["EvmAddress"];
            contract_id?: components["schemas"]["EntityId"];
            /**
             * Format: binary
             * @description The hex encoded storage slot changed.
             * @example 0x00000000000000000000000000000000000000000000000000000000000000fa
             */
            slot?: string;
            /**
             * Format: binary
             * @description The hex encoded value read from the storage slot.
             * @example 0x97c1fc0a6ed5551bc831571325e9bdb365d06803100dc20648640ba24ce69750
             */
            value_read?: string;
            /**
             * Format: binary
             * @description The hex encoded value written to the slot. `null` implies no value written.
             * @example 0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925
             */
            value_written?: string | null;
        };
        ContractResultStateChanges: components["schemas"]["ContractResultStateChange"][];
        ContractResults: components["schemas"]["ContractResult"][];
        ContractActions: components["schemas"]["ContractAction"][];
        ContractLogs: components["schemas"]["ContractLog"][];
        CustomFees: {
            created_timestamp?: components["schemas"]["Timestamp"];
            fixed_fees?: components["schemas"]["FixedFee"][];
            fractional_fees?: components["schemas"]["FractionalFee"][];
            royalty_fees?: components["schemas"]["RoyaltyFee"][];
        };
        CryptoAllowance: components["schemas"]["Allowance"] & {
            /**
             * Format: int64
             * @description The amount remaining of the original amount granted in tinybars.
             */
            amount?: number;
            /**
             * Format: int64
             * @description The granted amount of the spender's allowance in tinybars.
             */
            amount_granted?: number;
        };
        CryptoAllowances: components["schemas"]["CryptoAllowance"][];
        /**
         * @description Network entity ID in the format of `shard.realm.num`
         * @example 0.0.2
         */
        EntityId: string | null;
        EntityIdQuery: string;
        Error: {
            _status?: {
                messages?: {
                    /**
                     * Format: binary
                     * @description Error message in hexadecimal
                     * @example 0x3000
                     */
                    data?: string | null;
                    /**
                     * @description Detailed error message
                     * @example Generic detailed error message
                     */
                    detail?: string | null;
                    /**
                     * @description Error message
                     * @example Generic error message
                     */
                    message?: string;
                }[];
            };
        };
        ContractCallRequest: {
            /**
             * @description Hexadecimal block number or the string "latest", "pending", "earliest". Defaults to "latest".
             * @example latest
             */
            block?: string | null;
            /**
             * Format: binary
             * @description Hexadecimal method signature and encoded parameters. Up to 24656 bytes as at most 49152 hexidecimal digits plus optional leading 0x.
             * @example 0x47f1aae7
             */
            data?: string | null;
            /**
             * @description Whether gas estimation is called. Defaults to false.
             * @example true
             */
            estimate?: boolean | null;
            /**
             * Format: binary
             * @description The 20-byte hexadecimal EVM address the transaction is sent from.
             * @example 00000000000000000000000000000000000004e2
             */
            from?: string | null;
            /**
             * Format: int64
             * @description Gas provided for the transaction execution. Defaults to 15000000.
             * @example 15000000
             */
            gas?: number | null;
            /**
             * Format: int64
             * @description Gas price used for each paid gas.
             * @example 100000000
             */
            gasPrice?: number | null;
            /**
             * Format: binary
             * @description The 20-byte hexadecimal EVM address the transaction is directed to.
             * @example 0xd9d0c5c0ff85758bdf05a7636f8036d4d065f5b6
             */
            to: string;
            /**
             * Format: int64
             * @description Value sent with this transaction. Defaults to 0.
             * @example 0
             */
            value?: number | null;
        };
        ContractCallResponse: {
            /**
             * Format: binary
             * @description Result in hexadecimal from executed contract call.
             * @example 0x0000000000006d8d
             */
            result?: string;
        };
        /** @description A hex encoded hedera transaction hash. */
        HederaHash: string;
        /** @description A hex encoded ethereum transaction hash. */
        EthereumHash: string;
        /**
         * Format: int64
         * @description A positive number.
         */
        PositiveNumber: number;
        /**
         * Format: binary
         * @description A network entity encoded as an EVM address in hex.
         * @example 0000000000000000000000000000000000001f41
         */
        EvmAddress: string;
        /**
         * Format: binary
         * @description A network entity encoded as an EVM address in hex.
         * @example 0x0000000000000000000000000000000000001f41
         */
        EvmAddressWithShardRealm: string;
        /**
         * Format: binary
         * @description A network entity encoded as an EVM address in hex.
         * @example 0x0000000000000000000000000000000000001f41
         */
        EvmAddressNullable: string | null;
        ExchangeRate: {
            /**
             * Format: int32
             * @example 596987
             */
            cent_equivalent?: number;
            /**
             * Format: int64
             * @example 1649689200
             */
            expiration_time?: number;
            /**
             * Format: int32
             * @example 30000
             */
            hbar_equivalent?: number;
        };
        FixedFee: {
            /** @example false */
            all_collectors_are_exempt?: boolean;
            /**
             * Format: int64
             * @example 100
             */
            amount?: number;
            collector_account_id?: components["schemas"]["EntityId"];
            denominating_token_id?: components["schemas"]["EntityId"];
        };
        CustomFeeLimit: {
            account_id?: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @example 100
             */
            amount?: number;
            denominating_token_id?: components["schemas"]["EntityId"];
        };
        FractionalFee: {
            /** @example false */
            all_collectors_are_exempt?: boolean;
            amount?: {
                /**
                 * Format: int64
                 * @example 12
                 */
                numerator?: number;
                /**
                 * Format: int64
                 * @example 29
                 */
                denominator?: number;
            };
            collector_account_id?: components["schemas"]["EntityId"];
            denominating_token_id?: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @example 120
             */
            maximum?: number | null;
            /**
             * Format: int64
             * @example 30
             */
            minimum?: number;
            /** @example true */
            net_of_transfers?: boolean;
        };
        RoyaltyFee: {
            /** @example false */
            all_collectors_are_exempt?: boolean;
            amount?: {
                /**
                 * Format: int64
                 * @example 15
                 */
                numerator?: number;
                /**
                 * Format: int64
                 * @example 37
                 */
                denominator?: number;
            };
            collector_account_id?: components["schemas"]["EntityId"];
            fallback_fee?: {
                /**
                 * Format: int64
                 * @example 100
                 */
                amount?: number;
                denominating_token_id?: components["schemas"]["EntityId"];
            };
        };
        /** @description The public key which controls access to various network entities. */
        Key: {
            /**
             * @example ProtobufEncoded
             * @enum {string}
             */
            _type?: "ECDSA_SECP256K1" | "ED25519" | "ProtobufEncoded";
            /** @example 15706b229b3ba33d4a5a41ff54ce1cfe0a3d308672a33ff382f81583e02bd743 */
            key?: string;
        } | null;
        Links: {
            /** @example null */
            next?: string | null;
        };
        /** @example {
         *       "admin_key": {
         *         "_type": "ED25519",
         *         "key": "15706b229b3ba33d4a5a41ff54ce1cfe0a3d308672a33ff382f81583e02bd743"
         *       },
         *       "decline_reward": false,
         *       "description": "address book 1",
         *       "file_id": "0.0.102",
         *       "max_stake": 50000,
         *       "memo": "0.0.4",
         *       "min_stake": 1000,
         *       "node_account_id": "0.0.4",
         *       "node_cert_hash": "0x01d173753810c0aae794ba72d5443c292e9ff962b01046220dd99f5816422696e0569c977e2f169e1e5688afc8f4aa16",
         *       "node_id": 1,
         *       "public_key": "0x4a5ad514f0957fa170a676210c9bdbddf3bc9519702cf915fa6767a40463b96f",
         *       "reward_rate_start": 1000000,
         *       "service_endpoints": [
         *         {
         *           "ip_address_v4": "128.0.0.6",
         *           "port": 50216
         *         }
         *       ],
         *       "stake": 20000,
         *       "stake_not_rewarded": 19900,
         *       "stake_rewarded": 100,
         *       "staking_period": {
         *         "from": "1655164800.000000000",
         *         "to": "1655251200.000000000"
         *       },
         *       "timestamp": {
         *         "from": "187654.000123457",
         *         "to": null
         *       }
         *     } */
        NetworkNode: {
            admin_key: components["schemas"]["Key"];
            /** @description Whether the node wants to receive staking rewards or not. */
            decline_reward: boolean | null;
            /** @description a memo associated with the address book */
            description: string | null;
            file_id: components["schemas"]["EntityId"];
            grpc_proxy_endpoint: components["schemas"]["ServiceEndpoint"];
            /**
             * Format: int64
             * @description The maximum stake (rewarded or not rewarded) this node can have as consensus weight
             */
            max_stake: number | null;
            /** @description memo */
            memo: string | null;
            /**
             * Format: int64
             * @description The minimum stake (rewarded or not rewarded) this node must reach before having non-zero consensus weight
             *
             */
            min_stake: number | null;
            node_account_id: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @description An identifier for the node
             */
            node_id: number;
            /** @description hex encoded hash of the node's TLS certificate */
            node_cert_hash: string | null;
            /** @description hex encoded X509 RSA public key used to verify stream file signature */
            public_key: string | null;
            /**
             * Format: int64
             * @description The total tinybars earned by this node per whole hbar in the last staking period
             */
            reward_rate_start: number | null;
            service_endpoints: components["schemas"]["ServiceEndpoints"];
            /**
             * Format: int64
             * @description The node consensus weight at the beginning of the staking period
             */
            stake: number | null;
            /**
             * Format: int64
             * @description The sum (balance + stakedToMe) for all accounts staked to this node with declineReward=true at the
             *     beginning of the staking period
             *
             */
            stake_not_rewarded: number | null;
            /**
             * Format: int64
             * @description The sum (balance + staked) for all accounts staked to the node that are not declining rewards at the
             *     beginning of the staking period
             *
             */
            stake_rewarded: number | null;
            staking_period: components["schemas"]["TimestampRangeNullable"] & unknown;
            timestamp: components["schemas"]["TimestampRange"];
        };
        NetworkNodes: components["schemas"]["NetworkNode"][];
        NetworkFee: {
            /**
             * Format: int64
             * @description gas cost in tinybars
             */
            gas?: number;
            /** @description type of the transaction */
            transaction_type?: string;
        };
        NetworkFees: components["schemas"]["NetworkFee"][];
        /** @example {
         *       "max_stake_rewarded": 10,
         *       "max_staking_reward_rate_per_hbar": 17808,
         *       "max_total_reward": 20,
         *       "node_reward_fee_fraction": 1,
         *       "reserved_staking_rewards": 30,
         *       "reward_balance_threshold": 40,
         *       "stake_total": 35000000000000000,
         *       "staking_period": {
         *         "from": "1655164800.000000000",
         *         "to": "1655251200.000000000"
         *       },
         *       "staking_period_duration": 1440,
         *       "staking_periods_stored": 365,
         *       "staking_reward_fee_fraction": 1,
         *       "staking_reward_rate": 100000000000,
         *       "staking_start_threshold": 25000000000000000,
         *       "unreserved_staking_reward_balance": 50
         *     } */
        NetworkStakeResponse: {
            /**
             * Format: int64
             * @description The maximum amount of tinybar that can be staked for reward while still achieving
             *     the maximum per-hbar reward rate
             *
             */
            max_stake_rewarded: number;
            /**
             * Format: int64
             * @description The maximum reward rate, in tinybars per whole hbar, that any account can receive in a day
             */
            max_staking_reward_rate_per_hbar: number;
            /**
             * Format: int64
             * @description The total tinybars to be paid as staking rewards in the ending period,
             *     after applying the settings for the 0.0.800 balance threshold and the maximum stake rewarded
             *
             */
            max_total_reward: number;
            /**
             * Format: float
             * @description The fraction between zero and one of the network and service fees paid to the node reward account 0.0.801
             */
            node_reward_fee_fraction: number;
            /**
             * Format: int64
             * @description The amount of the staking reward funds of account 0.0.800 reserved to pay pending
             *     rewards that have been earned but not collected
             *
             */
            reserved_staking_rewards: number;
            /**
             * Format: int64
             * @description The unreserved tinybar balance of account 0.0.800 required to achieve the
             *     maximum per-hbar reward rate
             *
             */
            reward_balance_threshold: number;
            /**
             * Format: int64
             * @description The total amount staked to the network in tinybars the start of the current staking period
             */
            stake_total: number;
            staking_period: components["schemas"]["TimestampRange"] & unknown;
            /**
             * Format: int64
             * @description The number of minutes in a staking period
             */
            staking_period_duration: number;
            /**
             * Format: int64
             * @description The number of staking periods for which the reward is stored for each node
             */
            staking_periods_stored: number;
            /**
             * Format: float
             * @description The fraction between zero and one of the network and service fees paid to the staking reward account 0.0.800
             */
            staking_reward_fee_fraction: number;
            /**
             * Format: int64
             * @description The total number of tinybars to be distributed as staking rewards each period
             */
            staking_reward_rate: number;
            /**
             * Format: int64
             * @description The minimum balance of staking reward account 0.0.800 required to active rewards
             */
            staking_start_threshold: number;
            /**
             * Format: int64
             * @description The unreserved balance of account 0.0.800 at the close of the just-ending period;
             *     this value is used to compute the HIP-782 balance ratio
             *
             */
            unreserved_staking_reward_balance: number;
        };
        /** @example {
         *       "account_id": "0.1.2",
         *       "created_timestamp": "1234567890.000000001",
         *       "delegating_spender": "0.0.400",
         *       "deleted": false,
         *       "metadata": "VGhpcyBpcyBhIHRlc3QgTkZU",
         *       "modified_timestamp": "1610682445.003266001",
         *       "serial_number": 124,
         *       "spender_id": "0.0.500",
         *       "token_id": "0.0.222"
         *     } */
        Nft: {
            account_id?: components["schemas"]["EntityId"];
            created_timestamp?: components["schemas"]["TimestampNullable"];
            delegating_spender?: components["schemas"]["EntityId"];
            /** @description whether the nft or the token it belongs to has been deleted */
            deleted?: boolean;
            /**
             * Format: byte
             * @description Arbitrary binary data associated with this NFT encoded in base64.
             */
            metadata?: string;
            modified_timestamp?: components["schemas"]["TimestampNullable"];
            /**
             * Format: int64
             * @example 1
             */
            serial_number?: number;
            spender?: components["schemas"]["EntityId"];
            token_id?: components["schemas"]["EntityId"];
        };
        Nfts: {
            nfts?: components["schemas"]["Nft"][];
            links?: components["schemas"]["Links"];
        };
        /** @example {
         *       "approved_for_all": false,
         *       "owner": "0.0.11",
         *       "payer_account_id": "0.0.10",
         *       "spender": "0.0.15",
         *       "timestamp": {
         *         "from": "1651560386.060890949",
         *         "to": "1651560386.661997287"
         *       },
         *       "token_id": "0.0.99"
         *     } */
        NftAllowance: {
            /**
             * @description A boolean value indicating if the spender has the allowance to spend all NFTs owned by the given owner
             * @example true
             */
            approved_for_all: boolean;
            owner: components["schemas"]["EntityId"];
            spender: components["schemas"]["EntityId"];
            timestamp: components["schemas"]["TimestampRange"];
            token_id: components["schemas"]["EntityId"];
        };
        NftAllowances: components["schemas"]["NftAllowance"][];
        /** @example {
         *       "consensus_timestamp": "1618591023.997420021",
         *       "is_approval": false,
         *       "nonce": 0,
         *       "receiver_account_id": "0.0.11",
         *       "sender_account_id": "0.0.10",
         *       "transaction_id": "0.0.19789-1618591023-997420021",
         *       "type": "CRYPTOTRANSFER"
         *     } */
        NftTransactionTransfer: {
            consensus_timestamp: components["schemas"]["Timestamp"];
            is_approval: boolean;
            nonce: number;
            receiver_account_id: components["schemas"]["EntityId"];
            sender_account_id: components["schemas"]["EntityId"];
            transaction_id: string;
            type: components["schemas"]["TransactionTypes"];
        };
        /** @example {
         *       "count": 3,
         *       "gas_used": 300000,
         *       "hapi_version": "0.11.0",
         *       "hash": "0x3c08bbbee74d287b1dcd3f0ca6d1d2cb92c90883c4acf9747de9f3f3162ad25b999fc7e86699f60f2a3fb3ed9a646c6b",
         *       "logs_bloom": "0x00000020002000001000000000000000000000000000000000000000000010000000000004000000000000000000000000108000000000000000000080000000000004000000000000000000000000880000000000000000000101000000000000000000000000000000000000008000000000000400000080000000000001000000000000000000000000000000000000000000002000000000100000100000200000040000100000001000000000000000000000000000000001001000004000000000000000000001000000000000000000100000000000100000000000000000000000000000000000000000000000080000100800000000000000120080",
         *       "name": "2022-05-03T06_46_26.060890949Z.rcd",
         *       "number": 77,
         *       "previous_hash": "0xf7d6481f659c866c35391ee230c374f163642ebf13a5e604e04a95a9ca48a298dc2dfa10f51bcbaab8ae23bc6d662a0b",
         *       "size": 8192,
         *       "timestamp": {
         *         "from": "1651560386.060890949",
         *         "to": "1651560386.661997287"
         *       }
         *     } */
        Block: {
            count?: number;
            /** Format: int64 */
            gas_used?: number | null;
            hapi_version?: string | null;
            hash?: string;
            /** @description A hex encoded 256-byte array with 0x prefix */
            logs_bloom?: string | null;
            name?: string;
            number?: number;
            previous_hash?: string;
            size?: number | null;
            timestamp?: components["schemas"]["TimestampRange"];
        };
        Blocks: components["schemas"]["Block"][];
        /** @description Custom fees assessed for each message submitted to the topic */
        ConsensusCustomFees: {
            created_timestamp?: components["schemas"]["Timestamp"];
            fixed_fees?: components["schemas"]["FixedCustomFee"][];
        };
        FixedCustomFee: {
            /**
             * Format: int64
             * @example 100
             */
            amount?: number;
            collector_account_id?: components["schemas"]["EntityId"];
            denominating_token_id?: components["schemas"]["EntityId"];
        };
        NftTransactionHistory: {
            transactions: components["schemas"]["NftTransactionTransfer"][];
            links: components["schemas"]["Links"];
        };
        Schedule: {
            admin_key?: components["schemas"]["Key"];
            consensus_timestamp?: components["schemas"]["Timestamp"];
            creator_account_id?: components["schemas"]["EntityId"];
            /** @example false */
            deleted?: boolean;
            executed_timestamp?: components["schemas"]["TimestampNullable"];
            expiration_time?: components["schemas"]["TimestampNullable"];
            /** @example created on 02/10/2021 */
            memo?: string;
            payer_account_id?: components["schemas"]["EntityId"];
            schedule_id?: components["schemas"]["EntityId"];
            signatures?: components["schemas"]["ScheduleSignature"][];
            /**
             * Format: byte
             * @example Kd6tvu8=
             */
            transaction_body?: string;
            wait_for_expiry?: boolean;
        };
        Schedules: components["schemas"]["Schedule"][];
        ScheduleSignature: {
            consensus_timestamp?: components["schemas"]["Timestamp"];
            /**
             * Format: byte
             * @example AAEBAwuqAwzB
             */
            public_key_prefix?: string;
            /**
             * Format: byte
             * @example 3q2+7wABAQMLqgMMwQ==
             */
            signature?: string;
            /**
             * @example ED25519
             * @enum {string}
             */
            type?: "CONTRACT" | "ED25519" | "RSA_3072" | "ECDSA_384" | "ECDSA_SECP256K1" | "UNKNOWN";
        };
        /** @example {
         *       "domain_name": "www.example.com",
         *       "ip_address_v4": "127.0.0.1",
         *       "port": 50211
         *     } */
        ServiceEndpoint: {
            domain_name: string;
            ip_address_v4: string;
            /** Format: int32 */
            port: number;
        };
        ServiceEndpoints: components["schemas"]["ServiceEndpoint"][];
        /** @example {
         *       "account_id": "0.0.1000",
         *       "amount": 10,
         *       "timestamp": "1234567890.000000001"
         *     } */
        StakingReward: {
            account_id: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @description The number of tinybars awarded
             * @example 10
             */
            amount: number;
            timestamp: components["schemas"]["Timestamp"];
        };
        /**
         * @description A staking reward transfer
         * @example {
         *       "account_id": "0.0.1000",
         *       "amount": 10
         *     }
         */
        StakingRewardTransfer: {
            account: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @description The number of tinybars awarded
             * @example 10
             */
            amount: number;
        };
        StakingRewardTransfers: components["schemas"]["StakingRewardTransfer"][];
        /**
         * @description A Unix timestamp in seconds.nanoseconds format
         * @example 1586567700.453054000
         */
        Timestamp: string;
        /**
         * @description A Unix timestamp in seconds.nanoseconds format
         * @example 1586567700.453054000
         */
        TimestampNullable: string | null;
        /** @description A timestamp range an entity is valid for */
        TimestampRange: {
            from?: components["schemas"]["Timestamp"] & unknown;
            to?: components["schemas"]["TimestampNullable"] & unknown;
        };
        /** @description A timestamp range an entity is valid for */
        TimestampRangeNullable: {
            from?: components["schemas"]["Timestamp"] & unknown;
            to?: components["schemas"]["TimestampNullable"] & unknown;
        } | null;
        /** @example {
         *       "admin_key": null,
         *       "decimals": 3,
         *       "metadata": "VGhpcyBpcyBhIHRlc3QgTkZU",
         *       "name": "First Mover",
         *       "symbol": "FIRSTMOVERLPDJH",
         *       "token_id": "0.0.1",
         *       "type": "FUNGIBLE_COMMON"
         *     } */
        Token: {
            admin_key: components["schemas"]["Key"];
            /** Format: int64 */
            decimals: number;
            /**
             * Format: byte
             * @description Arbitrary binary data associated with this token class encoded in base64.
             */
            metadata?: string;
            name: string;
            symbol: string;
            token_id: components["schemas"]["EntityId"];
            type: string;
        };
        /** @example {
         *       "amount": 10,
         *       "receiver_id": "0.0.15",
         *       "sender_id": "0.0.10",
         *       "serial_number": null,
         *       "timestamp": {
         *         "from": "1651560386.060890949",
         *         "to": "1651560386.661997287"
         *       },
         *       "token_id": "0.0.99"
         *     } */
        TokenAirdrop: {
            /** Format: int64 */
            amount: number;
            receiver_id: components["schemas"]["EntityId"];
            sender_id: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @example 1
             */
            serial_number?: number | null;
            timestamp: components["schemas"]["TimestampRange"];
            token_id: components["schemas"]["EntityId"];
        };
        TokenAirdrops: components["schemas"]["TokenAirdrop"][];
        TokenAllowance: components["schemas"]["Allowance"] & {
            token_id?: components["schemas"]["EntityId"];
        };
        TokenAllowances: components["schemas"]["TokenAllowance"][];
        /** @example {
         *       "token_id": "0.0.200001",
         *       "balance": 8
         *     } */
        TokenBalance: {
            token_id: components["schemas"]["EntityId"];
            /** Format: int64 */
            balance: number;
        };
        /** @example [
         *       {
         *         "account": "0.15.2",
         *         "balance": 1000,
         *         "decimals": 3
         *       }
         *     ] */
        TokenDistribution: {
            account: components["schemas"]["EntityId"];
            /** Format: int64 */
            balance: number;
            /** Format: int64 */
            decimals: number;
        }[];
        TokenInfo: {
            admin_key?: components["schemas"]["Key"];
            auto_renew_account?: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @example null
             */
            auto_renew_period?: number | null;
            created_timestamp?: components["schemas"]["Timestamp"];
            /** @example 1000 */
            decimals?: string;
            /** @example true */
            deleted?: boolean | null;
            /**
             * Format: int64
             * @example 1234567890100000
             */
            expiry_timestamp?: number | null;
            fee_schedule_key?: components["schemas"]["Key"];
            /** @example false */
            freeze_default?: boolean;
            freeze_key?: components["schemas"]["Key"];
            /** @example 1000000 */
            initial_supply?: string;
            kyc_key?: components["schemas"]["Key"];
            /** @example 9223372036854775807 */
            max_supply?: string;
            /**
             * Format: byte
             * @description Arbitrary binary data associated with this token class encoded in base64.
             */
            metadata?: string;
            metadata_key?: components["schemas"]["Key"] & unknown;
            modified_timestamp?: components["schemas"]["Timestamp"];
            /** @example Token name */
            name?: string;
            /** @example token memo */
            memo?: string;
            pause_key?: components["schemas"]["Key"];
            /**
             * @example UNPAUSED
             * @enum {string}
             */
            pause_status?: "NOT_APPLICABLE" | "PAUSED" | "UNPAUSED";
            supply_key?: components["schemas"]["Key"];
            /**
             * @example INFINITE
             * @enum {string}
             */
            supply_type?: "FINITE" | "INFINITE";
            /** @example ORIGINALRDKSE */
            symbol?: string;
            token_id?: components["schemas"]["EntityId"];
            /** @example 1000000 */
            total_supply?: string;
            treasury_account_id?: components["schemas"]["EntityId"];
            /**
             * @example FUNGIBLE_COMMON
             * @enum {string}
             */
            type?: "FUNGIBLE_COMMON" | "NON_FUNGIBLE_UNIQUE";
            wipe_key?: components["schemas"]["Key"];
            custom_fees?: components["schemas"]["CustomFees"];
        };
        /** @example {
         *       "automatic_association": true,
         *       "balance": 5,
         *       "created_timestamp": "123456789.000000001",
         *       "decimals": 3,
         *       "freeze_status": "UNFROZEN",
         *       "kyc_status": "GRANTED",
         *       "token_id": "0.0.27335"
         *     } */
        TokenRelationship: {
            /**
             * @description Specifies if the relationship is implicitly/explicitly associated.
             * @example true
             */
            automatic_association: boolean;
            /**
             * Format: int64
             * @description For FUNGIBLE_COMMON, the balance that the account holds in the smallest denomination. For NON_FUNGIBLE_UNIQUE, the number of NFTs held by the account.
             * @example 5
             */
            balance: number;
            created_timestamp: components["schemas"]["Timestamp"];
            /** Format: int64 */
            decimals: number;
            /**
             * @description The Freeze status of the account.
             * @example UNFROZEN
             * @enum {string}
             */
            freeze_status: "NOT_APPLICABLE" | "FROZEN" | "UNFROZEN";
            /**
             * @description The KYC status of the account.
             * @example GRANTED
             * @enum {string}
             */
            kyc_status: "NOT_APPLICABLE" | "GRANTED" | "REVOKED";
            token_id: components["schemas"]["EntityId"];
        };
        LogTopicQueryParam: string[];
        /** @enum {string} */
        TransactionTypes: "ATOMICBATCH" | "CONSENSUSCREATETOPIC" | "CONSENSUSDELETETOPIC" | "CONSENSUSSUBMITMESSAGE" | "CONSENSUSUPDATETOPIC" | "CONTRACTCALL" | "CONTRACTCREATEINSTANCE" | "CONTRACTDELETEINSTANCE" | "CONTRACTUPDATEINSTANCE" | "CRYPTOADDLIVEHASH" | "CRYPTOAPPROVEALLOWANCE" | "CRYPTOCREATEACCOUNT" | "CRYPTODELETE" | "CRYPTODELETEALLOWANCE" | "CRYPTODELETELIVEHASH" | "CRYPTOTRANSFER" | "CRYPTOUPDATEACCOUNT" | "ETHEREUMTRANSACTION" | "FILEAPPEND" | "FILECREATE" | "FILEDELETE" | "FILEUPDATE" | "FREEZE" | "NODE" | "NODECREATE" | "NODEDELETE" | "NODESTAKEUPDATE" | "NODEUPDATE" | "SCHEDULECREATE" | "SCHEDULEDELETE" | "SCHEDULESIGN" | "SYSTEMDELETE" | "SYSTEMUNDELETE" | "TOKENAIRDROP" | "TOKENASSOCIATE" | "TOKENBURN" | "TOKENCANCELAIRDROP" | "TOKENCLAIMAIRDROP" | "TOKENCREATION" | "TOKENDELETION" | "TOKENDISSOCIATE" | "TOKENFEESCHEDULEUPDATE" | "TOKENFREEZE" | "TOKENGRANTKYC" | "TOKENMINT" | "TOKENPAUSE" | "TOKENREJECT" | "TOKENREVOKEKYC" | "TOKENUNFREEZE" | "TOKENUNPAUSE" | "TOKENUPDATE" | "TOKENUPDATENFTS" | "TOKENWIPE" | "UNCHECKEDSUBMIT" | "UNKNOWN" | "UTILPRNG";
        Tokens: components["schemas"]["Token"][];
        Topic: {
            admin_key: components["schemas"]["Key"];
            auto_renew_account: components["schemas"]["EntityId"];
            /**
             * Format: int64
             * @description The amount of time to attempt to extend the topic's lifetime after expiration.
             * @example 7776000
             */
            auto_renew_period: number | null;
            created_timestamp: components["schemas"]["TimestampNullable"];
            custom_fees: components["schemas"]["ConsensusCustomFees"];
            /**
             * @description Whether the topic is deleted or not.
             * @example false
             */
            deleted: boolean | null;
            /** @description Keys permitted to submit messages to the topic without paying custom fees */
            fee_exempt_key_list: components["schemas"]["Key"][];
            fee_schedule_key: components["schemas"]["Key"];
            /**
             * @description The memo associated with the topic.
             * @example topic memo
             */
            memo: string;
            submit_key: components["schemas"]["Key"];
            timestamp: components["schemas"]["TimestampRange"];
            topic_id: components["schemas"]["EntityId"];
        };
        /** @example {
         *       "chunk_info": {
         *         "initial_transaction_id": "0.0.10-1234567890-000000321",
         *         "nonce": 3,
         *         "number": 1,
         *         "total": 2,
         *         "scheduled": true
         *       },
         *       "consensus_timestamp": "1234567890.000000001",
         *       "message": "bWVzc2FnZQ==",
         *       "payer_account_id": "0.0.10",
         *       "running_hash": "cnVubmluZ19oYXNo",
         *       "running_hash_version": 2,
         *       "sequence_number": 1,
         *       "topic_id": "0.0.7"
         *     } */
        TopicMessage: {
            chunk_info?: components["schemas"]["ChunkInfo"];
            consensus_timestamp: components["schemas"]["Timestamp"];
            message: string;
            payer_account_id: components["schemas"]["EntityId"];
            /** Format: byte */
            running_hash: string;
            /** Format: int32 */
            running_hash_version: number;
            /** Format: int64 */
            sequence_number: number;
            topic_id: components["schemas"]["EntityId"];
        };
        TopicMessages: components["schemas"]["TopicMessage"][];
        /** @example {
         *       "batch_key": "0xae8bebf1c9fa0f309356e48057f6047af7cde63037d0509d16ddc3b20e085158bfdf14d15345c1b18b199b72fed4dead",
         *       "bytes": null,
         *       "charged_tx_fee": 7,
         *       "consensus_timestamp": "1234567890.000000007",
         *       "entity_id": "0.0.2281979",
         *       "max_custom_fees": [
         *         {
         *           "account_id": "0.0.8",
         *           "amount": 1000,
         *           "denominating_token_id": "0.0.2000"
         *         },
         *         {
         *           "account_id": "0.0.8",
         *           "amount": 1500,
         *           "denominating_token_id": null
         *         }
         *       ],
         *       "max_fee": 33,
         *       "memo_base64": null,
         *       "name": "CRYPTOTRANSFER",
         *       "nft_transfers": [
         *         {
         *           "is_approval": true,
         *           "receiver_account_id": "0.0.121",
         *           "sender_account_id": "0.0.122",
         *           "serial_number": 1,
         *           "token_id": "0.0.123"
         *         },
         *         {
         *           "is_approval": true,
         *           "receiver_account_id": "0.0.321",
         *           "sender_account_id": "0.0.422",
         *           "serial_number": 2,
         *           "token_id": "0.0.123"
         *         }
         *       ],
         *       "node": "0.0.3",
         *       "nonce": 0,
         *       "parent_consensus_timestamp": "1234567890.000000007",
         *       "result": "SUCCESS",
         *       "scheduled": false,
         *       "staking_reward_transfers": [
         *         {
         *           "account": 3,
         *           "amount": 150
         *         },
         *         {
         *           "account": 9,
         *           "amount": 200
         *         }
         *       ],
         *       "transaction_hash": "vigzKe2J7fv4ktHBbNTSzQmKq7Lzdq1/lJMmHT+a2KgvdhAuadlvS4eKeqKjIRmW",
         *       "transaction_id": "0.0.8-1234567890-000000006",
         *       "token_transfers": [
         *         {
         *           "token_id": "0.0.90000",
         *           "account": "0.0.9",
         *           "amount": 1200,
         *           "is_approval": false
         *         },
         *         {
         *           "token_id": "0.0.90000",
         *           "account": "0.0.8",
         *           "amount": -1200,
         *           "is_approval": false
         *         }
         *       ],
         *       "transfers": [
         *         {
         *           "account": "0.0.3",
         *           "amount": 2,
         *           "is_approval": false
         *         },
         *         {
         *           "account": "0.0.8",
         *           "amount": -3,
         *           "is_approval": false
         *         },
         *         {
         *           "account": "0.0.98",
         *           "amount": 1,
         *           "is_approval": false
         *         },
         *         {
         *           "account": "0.0.800",
         *           "amount": 150,
         *           "is_approval": false
         *         },
         *         {
         *           "account": "0.0.800",
         *           "amount": 200,
         *           "is_approval": false
         *         }
         *       ],
         *       "valid_duration_seconds": 11,
         *       "valid_start_timestamp": "1234567890.000000006"
         *     } */
        Transaction: {
            batch_key?: components["schemas"]["Key"];
            /** Format: byte */
            bytes?: string | null;
            /** Format: int64 */
            charged_tx_fee?: number;
            consensus_timestamp?: components["schemas"]["Timestamp"];
            entity_id?: components["schemas"]["EntityId"];
            max_custom_fees?: components["schemas"]["CustomFeeLimit"][];
            max_fee?: string;
            /** Format: byte */
            memo_base64?: string | null;
            name?: components["schemas"]["TransactionTypes"];
            nft_transfers?: {
                is_approval: boolean;
                receiver_account_id: components["schemas"]["EntityId"];
                sender_account_id: components["schemas"]["EntityId"];
                /**
                 * Format: int64
                 * @example 1
                 */
                serial_number: number;
                token_id: components["schemas"]["EntityId"];
            }[];
            node?: components["schemas"]["EntityId"];
            nonce?: number;
            parent_consensus_timestamp?: components["schemas"]["TimestampNullable"];
            result?: string;
            scheduled?: boolean;
            staking_reward_transfers?: components["schemas"]["StakingRewardTransfers"];
            token_transfers?: {
                token_id: components["schemas"]["EntityId"];
                account: components["schemas"]["EntityId"];
                /** Format: int64 */
                amount: number;
                is_approval?: boolean;
            }[];
            /** Format: byte */
            transaction_hash?: string;
            transaction_id?: string;
            transfers?: {
                account: components["schemas"]["EntityId"];
                /** Format: int64 */
                amount: number;
                is_approval?: boolean;
            }[];
            valid_duration_seconds?: string;
            valid_start_timestamp?: components["schemas"]["Timestamp"];
        };
        /** @example {
         *       "assessed_custom_fees": [
         *         {
         *           "amount": 100,
         *           "collector_account_id": "0.0.10",
         *           "effective_payer_account_ids": [
         *             "0.0.8",
         *             "0.0.72"
         *           ],
         *           "token_id": "0.0.90001"
         *         }
         *       ],
         *       "bytes": null,
         *       "charged_tx_fee": 7,
         *       "consensus_timestamp": "1234567890.000000007",
         *       "entity_id": "0.0.2281979",
         *       "max_fee": 33,
         *       "memo_base64": null,
         *       "name": "CRYPTOTRANSFER",
         *       "nft_transfers": [
         *         {
         *           "is_approval": true,
         *           "receiver_account_id": "0.0.121",
         *           "sender_account_id": "0.0.122",
         *           "serial_number": 1,
         *           "token_id": "0.0.123"
         *         },
         *         {
         *           "is_approval": true,
         *           "receiver_account_id": "0.0.321",
         *           "sender_account_id": "0.0.422",
         *           "serial_number": 2,
         *           "token_id": "0.0.123"
         *         }
         *       ],
         *       "node": "0.0.3",
         *       "nonce": 0,
         *       "parent_consensus_timestamp": "1234567890.000000007",
         *       "result": "SUCCESS",
         *       "scheduled": false,
         *       "staking_reward_transfers": [
         *         {
         *           "account": 3,
         *           "amount": 200
         *         },
         *         {
         *           "account": 9,
         *           "amount": 300
         *         }
         *       ],
         *       "transaction_hash": "vigzKe2J7fv4ktHBbNTSzQmKq7Lzdq1/lJMmHT+a2KgvdhAuadlvS4eKeqKjIRmW",
         *       "transaction_id": "0.0.8-1234567890-000000006",
         *       "token_transfers": [
         *         {
         *           "token_id": "0.0.90000",
         *           "account": "0.0.9",
         *           "amount": 1200,
         *           "is_approval": true
         *         },
         *         {
         *           "token_id": "0.0.90000",
         *           "account": "0.0.8",
         *           "amount": -1200,
         *           "is_approval": true
         *         }
         *       ],
         *       "transfers": [
         *         {
         *           "account": "0.0.3",
         *           "amount": 2,
         *           "is_approval": true
         *         },
         *         {
         *           "account": "0.0.8",
         *           "amount": -3,
         *           "is_approval": true
         *         },
         *         {
         *           "account": "0.0.98",
         *           "amount": 1,
         *           "is_approval": true
         *         },
         *         {
         *           "account": "0.0.800",
         *           "amount": 200,
         *           "is_approval": false
         *         },
         *         {
         *           "account": "0.0.800",
         *           "amount": 300,
         *           "is_approval": false
         *         }
         *       ],
         *       "valid_duration_seconds": 11,
         *       "valid_start_timestamp": "1234567890.000000006"
         *     } */
        TransactionDetail: components["schemas"]["Transaction"] & {
            assessed_custom_fees?: components["schemas"]["AssessedCustomFee"][];
        };
        TransactionDetails: components["schemas"]["TransactionDetail"][];
        TransactionId: {
            account_id?: components["schemas"]["EntityId"];
            /**
             * Format: int32
             * @example 0
             */
            nonce?: number | null;
            /** @example false */
            scheduled?: boolean | null;
            transaction_valid_start?: components["schemas"]["Timestamp"];
        };
        /** @description A transaction id in string format. */
        TransactionIdStr: string;
        Transactions: components["schemas"]["Transaction"][];
    };
    responses: {
        /** @description Not Found */
        NotFoundError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Topic Not Found */
        TopicNotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Transaction Not Found */
        TransactionNotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Invalid parameter */
        InvalidParameterError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Service Unavailable */
        ServiceUnavailableError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: {
        /** @description Account alias or account id or evm address */
        accountIdOrAliasOrEvmAddressPathParam: string;
        /** @description Account id or account alias with no shard realm or evm address with no shard realm */
        accountIdOrAliasOrEvmAddressQueryParam: string;
        /** @description The optional balance value to compare against */
        accountBalanceQueryParam: string;
        /** @description The ID of the account to return information for */
        accountIdQueryParam: components["schemas"]["EntityIdQuery"];
        /**
         * @description The account's public key to compare against
         * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
         */
        accountPublicKeyQueryParam: string;
        /**
         * @description Whether to include balance information or not. If included, token balances are limited to at most 50 per account as outlined in HIP-367. If multiple values are provided the last value will be the only value used.
         * @example true
         */
        balanceQueryParam: boolean;
        /** @description The ID of the smart contract */
        contractIdQueryParam: string;
        /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
        contractIdOrAddressPathParam: string;
        /** @description Accepts both eth and hedera hash format or block number */
        hashOrNumberPathParam: string;
        /** @description Entity id */
        entityIdPathParam: components["schemas"]["EntityId"];
        /** @description The ID of the file entity */
        fileIdQueryParam: components["schemas"]["EntityIdQuery"];
        /** @description Schedule id */
        scheduleIdPathParam: components["schemas"]["EntityId"];
        /** @description Token id */
        tokenIdPathParam: components["schemas"]["EntityId"];
        /** @description Topic id */
        topicIdPathParam: components["schemas"]["EntityId"];
        /** @description Account ID or EVM address executing the contract */
        fromQueryParam: string;
        /** @description Contract log index */
        logIndexQueryParam: string;
        /**
         * @description The maximum number of items to return
         * @example 2
         */
        limitQueryParam: number;
        /** @description The block's number */
        blockNumberQueryParam: string;
        /** @description The ID of the node */
        nodeIdQueryParam: string;
        /**
         * @description Filter the query result by the nonce of the transaction. A zero nonce represents user submitted transactions while a non-zero nonce is generated by main nodes. The filter honors the last value. If not specified, all transactions with specified payer account ID and valid start timestamp match. If multiple values are provided the last value will be the only value used.
         * @example 0
         */
        nonceQueryParam: number;
        /**
         * @description Filter the query result by the nonce of the transaction. A zero nonce represents user submitted transactions while a non-zero nonce is generated by main nodes. The filter honors the last value. Default is 0 when not specified.
         * @example 1
         */
        nonceQueryParamWithDefault: number;
        /**
         * @description The order in which items are listed
         * @example desc
         */
        orderQueryParam: "asc" | "desc";
        /**
         * @description The order in which items are listed
         * @example asc
         */
        orderQueryParamDesc: "asc" | "desc";
        /**
         * @description When the owner value is true or omitted, the accountId path parameter will specify the ID of the owner, and the API will retrieve the allowances that the owner has granted to different spenders. Conversely, when the owner value is false, the accountId path parameter will indicate the ID of the spender who has an allowance, and the API will instead provide the allowances granted to the spender by different owners of those tokens.
         * @example true
         */
        ownerQueryParam: boolean;
        /**
         * @description The public key to compare against
         * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
         */
        publicKeyQueryParam: string;
        /** @description The ID of the receiver to return information for */
        receiverIdQueryParam: components["schemas"]["EntityIdQuery"];
        /** @description Filter transactions by the scheduled flag. If true, return information for the scheduled transaction. If false, return information for the non-scheduled transaction. If not present, return information for all transactions matching transactionId. If multiple values are provided the last value will be the only value used. */
        scheduledQueryParam: boolean;
        /** @description Filter transactions by the scheduled flag. If true, return information for the scheduled transaction. If false, return information for the non-scheduled transaction. */
        scheduledQueryParamWithDefault: boolean;
        /** @description The ID of the schedule to return information for */
        scheduleIdQueryParam: components["schemas"]["EntityIdQuery"];
        /** @description The ID of the sender to return information for */
        senderIdQueryParam: components["schemas"]["EntityIdQuery"];
        /**
         * @description The nft serial number
         * @example 1
         */
        serialNumberPathParam: number;
        /** @description The nft serial number (64 bit type). Requires a tokenId value also be populated. */
        serialNumberQueryParam: string;
        /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
        timestampQueryParam: string[];
        /**
         * @description The Unix timestamp in seconds.nanoseconds format, the timestamp at which the associated transaction reached consensus. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time.
         * @example 1234567890.0000007
         */
        timestampPathParam: string;
        /** @description The consensus timestamp of the contract state as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
        stateTimestampQueryParam: string[];
        /** @description The Unix timestamp in seconds.nanoseconds format. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
        tokenInfoTimestampQueryParam: string;
        /** @description The first topic associated with a contract log. Requires a timestamp range also be populated. */
        logTopic0QueryParam: components["schemas"]["LogTopicQueryParam"];
        /** @description The second topic associated with a contract log. Requires a timestamp range also be populated. */
        logTopic1QueryParam: components["schemas"]["LogTopicQueryParam"];
        /** @description The third topic associated with a contract log. Requires a timestamp range also be populated. */
        logTopic2QueryParam: components["schemas"]["LogTopicQueryParam"];
        /** @description The fourth topic associated with a contract log. Requires a timestamp range also be populated. */
        logTopic3QueryParam: components["schemas"]["LogTopicQueryParam"];
        /** @description The ID of the spender to return information for */
        spenderIdQueryParam: components["schemas"]["EntityIdQuery"];
        /**
         * @description If provided and set to true, memory information will be included in the response
         * @example false
         */
        memory: boolean;
        /**
         * @description If provided and set to false, stack information will not be included in the response
         * @example true
         */
        stack: boolean;
        /**
         * @description If provided and set to true, storage information will be included in the response
         * @example false
         */
        storage: boolean;
        /**
         * @description If provided and set to false transactions will not be included in the response
         * @example true
         */
        transactionsQueryParam: boolean;
        /** @example cryptotransfer */
        transactionTypeQueryParam: components["schemas"]["TransactionTypes"];
        /**
         * @description Transaction id
         * @example 0.0.10-1234567890-000000000
         */
        transactionIdPathParam: string;
        /** @description The ID of the token to return information for */
        tokenIdQueryParam: components["schemas"]["EntityIdQuery"];
        /** @description Partial or full token name. Not allowed to be used with token.id or account.id parameter. Pagination is not supported with the use of this parameter and results are ordered by token.id with respect to the order parameter. */
        tokenNameQueryParam: string;
        /** @example [
         *       "ALL",
         *       "FUNGIBLE_COMMON",
         *       "NON_FUNGIBLE_UNIQUE"
         *     ] */
        tokenTypeQueryParam: string[];
        /** @description The index of a contract action */
        contractActionsIndexQueryParam: string;
        /** @description The block's number */
        contractsBlockNumberQueryParam: string;
        /** @description The slot's number */
        slotQueryParam: string;
        /** @description The block's hash. If multiple values are provided the last value will be the only value used. */
        blockHashQueryParam: string;
        /**
         * @description The transaction index in the block
         * @example 1
         */
        transactionIndexQueryParam: number;
        /**
         * @description Whether to include child transactions or not
         * @example true
         */
        internalQueryParam: boolean;
        /** @description A hex encoded 32-byte ethereum transaction hash or 48-byte hedera transaction hash. */
        transactionHashQueryParam: string;
        /** @description Transaction Id or a 32 byte hash with optional 0x prefix */
        transactionIdOrEthHashPathParam: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getAccounts: {
        parameters: {
            query?: {
                /** @description The optional balance value to compare against */
                "account.balance"?: components["parameters"]["accountBalanceQueryParam"];
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The account's public key to compare against
                 * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
                 */
                "account.publickey"?: components["parameters"]["accountPublicKeyQueryParam"];
                /**
                 * @description Whether to include balance information or not. If included, token balances are limited to at most 50 per account as outlined in HIP-367. If multiple values are provided the last value will be the only value used.
                 * @example true
                 */
                balance?: components["parameters"]["balanceQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getAccount: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /** @example cryptotransfer */
                transactiontype?: components["parameters"]["transactionTypeQueryParam"];
                /**
                 * @description If provided and set to false transactions will not be included in the response
                 * @example true
                 */
                transactions?: components["parameters"]["transactionsQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AccountBalanceTransactions"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getNftsByAccountId: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The nft serial number (64 bit type). Requires a tokenId value also be populated. */
                serialnumber?: components["parameters"]["serialNumberQueryParam"];
                /** @description The ID of the spender to return information for */
                "spender.id"?: components["parameters"]["spenderIdQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Nfts"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getStakingRewards: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["StakingRewardsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTokensByAccountId: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenRelationshipResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getOutstandingTokenAirdrops: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the receiver to return information for */
                "receiver.id"?: components["parameters"]["receiverIdQueryParam"];
                /** @description The nft serial number (64 bit type). Requires a tokenId value also be populated. */
                serialnumber?: components["parameters"]["serialNumberQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenAirdropsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getPendingTokenAirdrops: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the sender to return information for */
                "sender.id"?: components["parameters"]["senderIdQueryParam"];
                /** @description The nft serial number (64 bit type). Requires a tokenId value also be populated. */
                serialnumber?: components["parameters"]["serialNumberQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenAirdropsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getCryptoAllowances: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The ID of the spender to return information for */
                "spender.id"?: components["parameters"]["spenderIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CryptoAllowancesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTokenAllowances: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the spender to return information for */
                "spender.id"?: components["parameters"]["spenderIdQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenAllowancesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getNftAllowances: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
                /**
                 * @description When the owner value is true or omitted, the accountId path parameter will specify the ID of the owner, and the API will retrieve the allowances that the owner has granted to different spenders. Conversely, when the owner value is false, the accountId path parameter will indicate the ID of the spender who has an allowance, and the API will instead provide the allowances granted to the spender by different owners of those tokens.
                 * @example true
                 */
                owner?: components["parameters"]["ownerQueryParam"];
            };
            header?: never;
            path: {
                /** @description Account alias or account id or evm address */
                idOrAliasOrEvmAddress: components["parameters"]["accountIdOrAliasOrEvmAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NftAllowancesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getBalances: {
        parameters: {
            query?: {
                /** @description Account id or account alias with no shard realm or evm address with no shard realm */
                "account.id"?: components["parameters"]["accountIdOrAliasOrEvmAddressQueryParam"];
                /** @description The optional balance value to compare against */
                "account.balance"?: components["parameters"]["accountBalanceQueryParam"];
                /**
                 * @description The account's public key to compare against
                 * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
                 */
                "account.publickey"?: components["parameters"]["accountPublicKeyQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BalancesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getBlocks: {
        parameters: {
            query?: {
                /** @description The block's number */
                "block.number"?: components["parameters"]["blockNumberQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BlocksResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getBlock: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Accepts both eth and hedera hash format or block number */
                hashOrNumber: components["parameters"]["hashOrNumberPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Block"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    contractCall: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["ContractCallRequest"];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractCallResponse"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Not found error */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Unsupported media type error */
            415: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Too many requests */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Generic error */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Not implemented error */
            501: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getContracts: {
        parameters: {
            query?: {
                /** @description The ID of the smart contract */
                "contract.id"?: components["parameters"]["contractIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getContract: {
        parameters: {
            query?: {
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
                contractIdOrAddress: components["parameters"]["contractIdOrAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractResultsByContractId: {
        parameters: {
            query?: {
                /** @description The block's hash. If multiple values are provided the last value will be the only value used. */
                "block.hash"?: components["parameters"]["blockHashQueryParam"];
                /** @description The block's number */
                "block.number"?: components["parameters"]["contractsBlockNumberQueryParam"];
                /** @description Account ID or EVM address executing the contract */
                from?: components["parameters"]["fromQueryParam"];
                /**
                 * @description Whether to include child transactions or not
                 * @example true
                 */
                internal?: components["parameters"]["internalQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /**
                 * @description The transaction index in the block
                 * @example 1
                 */
                "transaction.index"?: components["parameters"]["transactionIndexQueryParam"];
            };
            header?: never;
            path: {
                /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
                contractIdOrAddress: components["parameters"]["contractIdOrAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractState: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The slot's number */
                slot?: components["parameters"]["slotQueryParam"];
                /** @description The consensus timestamp of the contract state as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["stateTimestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
                contractIdOrAddress: components["parameters"]["contractIdOrAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractStateResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractResultByIdAndTimestamp: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
                contractIdOrAddress: components["parameters"]["contractIdOrAddressPathParam"];
                /**
                 * @description The Unix timestamp in seconds.nanoseconds format, the timestamp at which the associated transaction reached consensus. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time.
                 * @example 1234567890.0000007
                 */
                timestamp: components["parameters"]["timestampPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultDetails"];
                };
            };
            /** @description Partial Content */
            206: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultDetails"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractsResults: {
        parameters: {
            query?: {
                /** @description Account ID or EVM address executing the contract */
                from?: components["parameters"]["fromQueryParam"];
                /** @description The block's hash. If multiple values are provided the last value will be the only value used. */
                "block.hash"?: components["parameters"]["blockHashQueryParam"];
                /** @description The block's number */
                "block.number"?: components["parameters"]["contractsBlockNumberQueryParam"];
                /**
                 * @description Whether to include child transactions or not
                 * @example true
                 */
                internal?: components["parameters"]["internalQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /**
                 * @description The transaction index in the block
                 * @example 1
                 */
                "transaction.index"?: components["parameters"]["transactionIndexQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getContractResultByTransactionIdOrHash: {
        parameters: {
            query?: {
                /**
                 * @description Filter the query result by the nonce of the transaction. A zero nonce represents user submitted transactions while a non-zero nonce is generated by main nodes. The filter honors the last value. Default is 0 when not specified.
                 * @example 1
                 */
                nonce?: components["parameters"]["nonceQueryParamWithDefault"];
            };
            header?: never;
            path: {
                /** @description Transaction Id or a 32 byte hash with optional 0x prefix */
                transactionIdOrHash: components["parameters"]["transactionIdOrEthHashPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultDetails"];
                };
            };
            /** @description Partial Content */
            206: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractResultDetails"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractActions: {
        parameters: {
            query?: {
                /** @description The index of a contract action */
                index?: components["parameters"]["contractActionsIndexQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
            };
            header?: never;
            path: {
                /** @description Transaction Id or a 32 byte hash with optional 0x prefix */
                transactionIdOrHash: components["parameters"]["transactionIdOrEthHashPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractActionsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractOpcodes: {
        parameters: {
            query?: {
                /**
                 * @description If provided and set to false, stack information will not be included in the response
                 * @example true
                 */
                stack?: components["parameters"]["stack"];
                /**
                 * @description If provided and set to true, memory information will be included in the response
                 * @example false
                 */
                memory?: components["parameters"]["memory"];
                /**
                 * @description If provided and set to true, storage information will be included in the response
                 * @example false
                 */
                storage?: components["parameters"]["storage"];
            };
            header?: never;
            path: {
                /** @description Transaction Id or a 32 byte hash with optional 0x prefix */
                transactionIdOrHash: components["parameters"]["transactionIdOrEthHashPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OpcodesResponse"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Transaction or record file not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Too many requests */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getContractLogsByContractId: {
        parameters: {
            query?: {
                /** @description Contract log index */
                index?: components["parameters"]["logIndexQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /** @description The first topic associated with a contract log. Requires a timestamp range also be populated. */
                topic0?: components["parameters"]["logTopic0QueryParam"];
                /** @description The second topic associated with a contract log. Requires a timestamp range also be populated. */
                topic1?: components["parameters"]["logTopic1QueryParam"];
                /** @description The third topic associated with a contract log. Requires a timestamp range also be populated. */
                topic2?: components["parameters"]["logTopic2QueryParam"];
                /** @description The fourth topic associated with a contract log. Requires a timestamp range also be populated. */
                topic3?: components["parameters"]["logTopic3QueryParam"];
            };
            header?: never;
            path: {
                /** @description The ID or hex encoded EVM address (with or without 0x prefix) associated with this contract. */
                contractIdOrAddress: components["parameters"]["contractIdOrAddressPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractLogsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getContractsLogs: {
        parameters: {
            query?: {
                /** @description Contract log index */
                index?: components["parameters"]["logIndexQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /** @description The first topic associated with a contract log. Requires a timestamp range also be populated. */
                topic0?: components["parameters"]["logTopic0QueryParam"];
                /** @description The second topic associated with a contract log. Requires a timestamp range also be populated. */
                topic1?: components["parameters"]["logTopic1QueryParam"];
                /** @description The third topic associated with a contract log. Requires a timestamp range also be populated. */
                topic2?: components["parameters"]["logTopic2QueryParam"];
                /** @description The fourth topic associated with a contract log. Requires a timestamp range also be populated. */
                topic3?: components["parameters"]["logTopic3QueryParam"];
                /** @description A hex encoded 32-byte ethereum transaction hash or 48-byte hedera transaction hash. */
                "transaction.hash"?: components["parameters"]["transactionHashQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ContractLogsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getNetworkExchangeRate: {
        parameters: {
            query?: {
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkExchangeRateSetResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
            500: components["responses"]["ServiceUnavailableError"];
        };
    };
    getNetworkFees: {
        parameters: {
            query?: {
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkFeesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
            500: components["responses"]["ServiceUnavailableError"];
        };
    };
    getNetworkNodes: {
        parameters: {
            query?: {
                /** @description The ID of the file entity */
                "file.id"?: components["parameters"]["fileIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /** @description The ID of the node */
                "node.id"?: components["parameters"]["nodeIdQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkNodesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getNetworkStake: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkStakeResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
            500: components["responses"]["ServiceUnavailableError"];
        };
    };
    getNetworkSupply: {
        parameters: {
            query?: {
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NetworkSupplyResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getSchedules: {
        parameters: {
            query?: {
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @description The ID of the schedule to return information for */
                "schedule.id"?: components["parameters"]["scheduleIdQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SchedulesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getSchedule: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Schedule id */
                scheduleId: components["parameters"]["scheduleIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Schedule"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTransactions: {
        parameters: {
            query?: {
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
                /** @example cryptotransfer */
                transactiontype?: components["parameters"]["transactionTypeQueryParam"];
                /** @description The transaction success type. */
                result?: "success" | "fail";
                /** @description The transaction account balance modification type. */
                type?: "credit" | "debit";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionsResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getTransaction: {
        parameters: {
            query?: {
                /**
                 * @description Filter the query result by the nonce of the transaction. A zero nonce represents user submitted transactions while a non-zero nonce is generated by main nodes. The filter honors the last value. If not specified, all transactions with specified payer account ID and valid start timestamp match. If multiple values are provided the last value will be the only value used.
                 * @example 0
                 */
                nonce?: components["parameters"]["nonceQueryParam"];
                /** @description Filter transactions by the scheduled flag. If true, return information for the scheduled transaction. If false, return information for the non-scheduled transaction. If not present, return information for all transactions matching transactionId. If multiple values are provided the last value will be the only value used. */
                scheduled?: components["parameters"]["scheduledQueryParam"];
            };
            header?: never;
            path: {
                /**
                 * @description Transaction id
                 * @example 0.0.10-1234567890-000000000
                 */
                transactionId: components["parameters"]["transactionIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TransactionByIdResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTopic: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Topic id */
                topicId: components["parameters"]["topicIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Topic"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTopicMessages: {
        parameters: {
            query?: {
                /** @example base64 */
                encoding?: string;
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /** @example 2 */
                sequencenumber?: number;
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description Topic id */
                topicId: components["parameters"]["topicIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopicMessagesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["TopicNotFound"];
        };
    };
    getTopicMessageByIdAndSequenceNumber: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Topic id */
                topicId: components["parameters"]["topicIdPathParam"];
                /**
                 * @description Topic message sequence number
                 * @example 2
                 */
                sequenceNumber: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopicMessage"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTopicMessageByTimestamp: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The Unix timestamp in seconds.nanoseconds format, the timestamp at which the associated transaction reached consensus. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time.
                 * @example 1234567890.0000007
                 */
                timestamp: components["parameters"]["timestampPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TopicMessage"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTokens: {
        parameters: {
            query?: {
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /** @description Partial or full token name. Not allowed to be used with token.id or account.id parameter. Pagination is not supported with the use of this parameter and results are ordered by token.id with respect to the order parameter. */
                name?: components["parameters"]["tokenNameQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example desc
                 */
                order?: components["parameters"]["orderQueryParam"];
                /**
                 * @description The public key to compare against
                 * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
                 */
                publickey?: components["parameters"]["publicKeyQueryParam"];
                /** @description The ID of the token to return information for */
                "token.id"?: components["parameters"]["tokenIdQueryParam"];
                /** @example [
                 *       "ALL",
                 *       "FUNGIBLE_COMMON",
                 *       "NON_FUNGIBLE_UNIQUE"
                 *     ] */
                type?: components["parameters"]["tokenTypeQueryParam"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokensResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getToken: {
        parameters: {
            query?: {
                /** @description The Unix timestamp in seconds.nanoseconds format. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["tokenInfoTimestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description Token id */
                tokenId: components["parameters"]["tokenIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenInfo"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getTokenBalances: {
        parameters: {
            query?: {
                /** @description The optional balance value to compare against */
                "account.balance"?: components["parameters"]["accountBalanceQueryParam"];
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The account's public key to compare against
                 * @example 3c3d546321ff6f63d701d2ec5c277095874e19f4a235bee1e6bb19258bf362be
                 */
                "account.publickey"?: components["parameters"]["accountPublicKeyQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description Token id */
                tokenId: components["parameters"]["tokenIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenBalancesResponse"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getNfts: {
        parameters: {
            query?: {
                /** @description The ID of the account to return information for */
                "account.id"?: components["parameters"]["accountIdQueryParam"];
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The nft serial number (64 bit type). Requires a tokenId value also be populated. */
                serialnumber?: components["parameters"]["serialNumberQueryParam"];
            };
            header?: never;
            path: {
                /** @description Token id */
                tokenId: components["parameters"]["tokenIdPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Nfts"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
    getNft: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Token id */
                tokenId: components["parameters"]["tokenIdPathParam"];
                /**
                 * @description The nft serial number
                 * @example 1
                 */
                serialNumber: components["parameters"]["serialNumberPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Nft"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
            404: components["responses"]["NotFoundError"];
        };
    };
    getNftTransactions: {
        parameters: {
            query?: {
                /**
                 * @description The maximum number of items to return
                 * @example 2
                 */
                limit?: components["parameters"]["limitQueryParam"];
                /**
                 * @description The order in which items are listed
                 * @example asc
                 */
                order?: components["parameters"]["orderQueryParamDesc"];
                /** @description The consensus timestamp as a Unix timestamp in seconds.nanoseconds format with an optional comparison operator. See [unixtimestamp.com](https://www.unixtimestamp.com/) for a simple way to convert a date to the 'seconds' part of the Unix time. */
                timestamp?: components["parameters"]["timestampQueryParam"];
            };
            header?: never;
            path: {
                /** @description Token id */
                tokenId: components["parameters"]["tokenIdPathParam"];
                /**
                 * @description The nft serial number
                 * @example 1
                 */
                serialNumber: components["parameters"]["serialNumberPathParam"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NftTransactionHistory"];
                };
            };
            /** @description Partial Content */
            206: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["NftTransactionHistory"];
                };
            };
            400: components["responses"]["InvalidParameterError"];
        };
    };
}
