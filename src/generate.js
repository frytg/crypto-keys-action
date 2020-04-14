/*

	crypto-vector-actions

	AUTHOR		Daniel Freytag
			https://github.com/FRYTG
			https://twitter.com/FRYTG

*/

// load runtime packages
const core		= require('@actions/core')
const fileWrite		= require('./utils/fileWrite')


// set runtime fallback config
const defaultIvLength		= 16
const defaultKeyLength		= 32


// define async function
const cryptoGenerateKeyAndIv = async function() { try {
	// log start
	console.log('crypto-vector-actions', 'starting...')


	// load config
	let outputPath		= core.getInput('output-path', { required: false })
	let ivLength		= parseInt(core.getInput('iv-length', { required: false }))
	let keyLength		= parseInt(core.getInput('key-length', { required: false }))
	let key			= core.getInput('key', { required: false })


	// parse config
	ivLength		= ivLength > 0
					? ivLength
					: defaultIvLength
	keyLength		= keyLength > 0
					? keyLength
					: defaultKeyLength

	// create random keys
	let keyBuffer		= Buffer.alloc(keyLength*2)
	keyBuffer		= Buffer.from(Array.prototype.map.call(keyBuffer, () => {
					return Math.floor(Math.random() * 256) }))
	let keyString		= key && key != '' 
					? key
					: keyBuffer.toString('hex').substr(0, keyLength)

	let ivBuffer		= Buffer.alloc(ivLength*2)
	ivBuffer		= Buffer.from(Array.prototype.map.call(ivBuffer, () => {
					return Math.floor(Math.random() * 256) }))
	let ivString		= ivBuffer.toString('hex').substr(0, ivLength)
	

	// build file for output
	let file = JSON.stringify({
		key:	keyString,
		iv:	ivString
	})
	console.log('crypto-vector-actions', 'used length for iv >', ivLength)
	key && key != '' 
		? console.log('crypto-vector-actions', 'used key from workflow')
		: console.log('crypto-vector-actions', 'used length for key >', keyLength)


	// write file
	await fileWrite(outputPath, file)


	// log end
	console.log('crypto-vector-actions', 'ended.')

} catch (err) {
	console.error('crypto-vector error >', err)
	core.setFailed('crypto-vector failed >' + err)
} }


// run job
cryptoGenerateKeyAndIv()