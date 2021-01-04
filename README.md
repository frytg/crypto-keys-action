# crypto-keys-action

**Create random keys and initialization vectors for each deployment.**  
When using the [Node JS Crypto](https://nodejs.org/api/crypto.html) module with certain algorithms you may need additional parameters such as key and iv, if not already provided by your application. This Action can provide such random keys when they should only be valid within a deployment. By bundling the key in one versiopn of an application but not a long-term option, they get expired each deployment/ revision and provide encryption only for temporary deployment-specific details (e.g. cached values).  

## Usage in workflow

Add a step to your `.yml` file in `.github/workflows`.

```yaml
name: Dummy workflow

on:
  [push]

jobs:
  crypto-test-local:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Add random crypto keys
        uses: frytg/crypto-keys-action@v0.1
        with:
          output-path: ./my-folder/crypto-keys.json
          iv-length: 16
```

Available parameters:

- `output-path` (required) Filepath in the repository used for final JSON file
- `iv-length` (optional) Desired iv length
- `key-length` (optional) Desired key length
- `key` (optional) Optional key used to overwrite random generation

## Usage to encrypt/ decrypt

Use a workflow similar to this, to include the key and iv values.

```js
const crypto = require('crypto')
const tokens = require('./my-folder/crypto-keys.json')
const algorithm = 'aes-256-cbc'


const encrypt = function(text){
  let cipher = crypto.createCipheriv(algorithm, tokens.key, tokens.iv)
  let crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}


const decrypt = function(text){
  let decipher = crypto.createDecipheriv(algorithm, tokens.key, tokens.iv)
  let dec = decipher.update(text, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}
```

## Dev

To build this package, you need `ncc` locally (`npm i -g @vercel/ncc`), then run `yarn build`.

## License

This project is available under the [hippocratic-license](https://github.com/EthicalSource/hippocratic-license); see [LICENSE.md](LICENSE.md).

## Author

- Daniel Freytag - [Github](https://github.com/FRYTG) / [Twitter](https://twitter.com/FRYTG)
- Developed at [SWR audio lab](https://github.com/swrlab)
