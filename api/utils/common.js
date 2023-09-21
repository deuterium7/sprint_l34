const inDebug = () => {
	return ['1', 'true'].includes(process.env.APP_DEBUG);
}

const isString = (v) => {
	return ''+v === v;
}

const isNumber = (v) => {
	return +v === v;
}

const isBoolean = (v) => {
	return !!v === v;
}

const isBool = (v) => {
	return [0, 1].includes(Number(v));
}

const paginate = (page = 1, per_page = 10, query) => {
	const offset = (page - 1) * per_page;
	const limit = per_page;

	return {
		...query,
		offset,
		limit,
	};
};

module.exports = { inDebug, isString, isNumber, isBoolean, isBool, paginate };