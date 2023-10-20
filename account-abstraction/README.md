This implementation is forked from [Stackup: erc-4337-examples](https://github.com/stackup-wallet/erc-4337-examples)

## Getting started
```shell
yarn install
```

```shell
yarn run init
```

Config the api key, or else feel free to use mine (mind the usage or I'll be bankrupt)
If you just want to do simple test, then you can use this signing key. It will generate a CA which already has some goerli ETH in it
```text
Stackup api key = bb106e9be15bbd577f27574603196701e653a973a21543fd3695c8c762f0a3e0  // THIS IS MY API KEY
"signingKey": "0x0baf6872c31c6bf7ac2c3ce548784283f575d19d250d1c02102de0a6c7f19c07"
```

```shell
yarn dev
```

Then you're ready to try out the demo at `http://localhost:5000`

Checkout `src/server.ts` for server implementation details and `src/demo` for frontend demo

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.
