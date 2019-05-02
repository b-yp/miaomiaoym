var crypto = require('crypto');
var captcha = require('trek-captcha');

var setCrypto = (info)=>{
	return crypto.createHmac('sha256', '$%$%^jfdkf')
					.update(info)
                    .digest('hex');
};

var createVerify = (req,res)=>{
	return captcha().then((info)=>{
		req.session.verifyImg = info.token;
		return info.buffer;
	}).catch(()=>{
		return false;
	});
}

module.exports = {
	setCrypto,
	createVerify
};