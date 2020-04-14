/*

	crypto-vector-actions

	AUTHOR		Daniel Freytag
			https://github.com/FRYTG
			https://twitter.com/FRYTG

*/

// load runtime packages
const fs		= require('fs')


const file		= (filePath, fileContent) => new Promise((resolve, reject) => {

	fs.writeFile(filePath, fileContent, (err) => {
		if (err)	reject(err)
		else		resolve()
	})

})

module.exports = file
