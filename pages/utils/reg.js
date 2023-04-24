export function isPhone(phoneStr) {
	const myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/
	if (!myreg.test(phoneStr)) {
		return false
	} else {
		return true
	}
}

export function isIDCard(codeStr) {
	const myreg =
		/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
	if (!myreg.test(codeStr)) {
		return false
	} else {
		return true
	}
}

export function isBank(bank) {
	if (
		bank === undefined ||
		typeof bank === 'undefined' ||
		!bank ||
		bank == null ||
		bank === '' ||
		/^\s+$/gi.test(bank)
	) {
		return false
	} else {
		const myreg = /^[1-9]\d{9,29}$/
		if (!myreg.test(bank)) {
			return false
		} else {
			return true
		}
	}
}