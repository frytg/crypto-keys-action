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


// set runtime fallback config
const defaultIvLength		= 5
const defaultKeyLength		= 32


// define async function
const cryptoGenerateKeyAndIv = async function() { try {
	// log start
	console.log('crypto-vector-actions', 'starting...')


	// load config
	let outputPath		= core.getInput('output-path', { required: false })
	let ivLength		= parseInt(core.getInput('iv-length', { required: false }))
	let keyLength		= parseInt(core.getInput('key-length', { required: false }))
	let key			= core.getInput('key', { required: false }) + 'sss'


	// parse config
	ivLength		= ivLength > 0
					? ivLength
					: defaultIvLength
	keyLength		= keyLength > 0
					? keyLength
					: defaultKeyLength

	// create random keys
	let keyBuffer		= key && key != '' 
					? Buffer.from(key)
					: Buffer.from(crypto.randomBytes(12).toString('utf8'))
	let ivBuffer		= Buffer.alloc(ivLength)
	ivBuffer		= Buffer.from(Array.prototype.map.call(ivBuffer, () => {
					return Math.floor(Math.random() * 256) }))
	console.log({ivBuffer});
	

	// DEV build file for output
	let file = JSON.stringify({
		key:	keyBuffer.toString('utf8'),
		iv:	ivBuffer.toString('utf8')
	})
	console.log('crypto-vector-actions', 'used length for iv >', ivLength)
	key && key != '' 
		? console.log('crypto-vector-actions', 'used length for key >', keyLength)
		: console.log('crypto-vector-actions', 'used key from workflow')
	
	console.warn('crypto-vector-actions', {outputPath, ivLength, keyLength})


	// write file
	await fileWrite('./test.json', file)


	// log end
	console.log('crypto-vector-actions', 'ended.')

} catch (err) {
	console.error('crypto-vector error >', err)
	core.setFailed('crypto-vector failed >' + err)
} }


// run job
cryptoGenerateKeyAndIv()