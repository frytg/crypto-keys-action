/*

	crypto-vector-actions

	AUTHOR		Daniel Freytag
			https://github.com/FRYTG
			https://twitter.com/FRYTG

*/

// load runtime packages
const crypto		= require('crypto')
const fileWrite		= require('./utils/fileWrite')
const core		= require('@actions/core')


// set runtime config
const IV_LENGTH		= 16


const cryptoGenerateKeyAndIv = async function() {
	// log start
	console.log('crypto-vector-actions', 'starting...')
	console.log('crypto-vector-actions', process.argv)
	const outputPath	= core.getInput('output-path', { required: true })
	const ivLength		= core.getInput('iv-length', { required: false })
	const keyLength		= core.getInput('key-length', { required: false })



	// create random keys
	const key		= crypto.randomBytes(12).toString('utf8')
	const iv		= crypto.randomBytes(IV_LENGTH).toString('utf8')


	// DEV Log output for debugging
	console.log('crypto-vector-actions', {key, iv, outputPath, ivLength, keyLength})


	// write file
	await fileWrite('./test.json', JSON.stringify(key,iv))


	// log end
	console.log('crypto-vector-actions', 'ended.')
}

cryptoGenerateKeyAndIv()