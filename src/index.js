/*

	crypto-vector-actions

	AUTHOR		Daniel Freytag
			https://github.com/FRYTG
			https://twitter.com/FRYTG

*/

// return buffer based on provided iv and key data
module.exports = {
	bufferFrom: function(data) {
		return {
			iv: Buffer.from(data.iv, 'utf8'),
			key: Buffer.from(data.key, 'utf8')
		}
	}
}
}
