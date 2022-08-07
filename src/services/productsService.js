import Products from '../app/model/products';

let getAllProductsStatic = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			let data = await Products.find().sort('-name');
			resolve({ data, count: data.length });
		} catch (e) {
			reject(e);
		}
	});
};

let getAllProducts = async query => {
	return new Promise(async (resolve, reject) => {
		try {
			//.find({}).sort() để sắp xếp theo thứ tự
			// .select() để lọc theo thuộc tính
			// .limit() để lọc theo số lượng
			// .skip() để bỏ qua số lượng
			const { featured, company, name, sort, fields, numericFilters } =
				query;
			const queryObj = {};

			if (featured) {
				queryObj.featured = featured === 'true' ? true : false;
			}
			if (company) {
				queryObj.company = company;
			}
			if (name) {
				queryObj.name = { $regex: name, $options: 'i' };
			}

			if (numericFilters) {
				const operatorMap = {
					'>': '$gt',
					'<': '$lt',
					'>=': '$gte',
					'<=': '$lte',
					'=': '$eq',
				};
				const regEx = /\b(<|>|>=|=|<=)\b/g;
				let filters = numericFilters.replace(
					regEx,
					match => `-${operatorMap[match]}-`
				);

				const options = ['price', 'rating'];
				filters = filters.split(',').forEach(item => {
					const [field, operator, value] = item.split('-');
					if (options.includes(field)) {
						queryObj[field] = { [operator]: Number(value) };
					}
				});
			}

			let results = Products.find(queryObj);
			//sort
			if (sort) {
				const sortList = sort.split(',').join(' ');
				results = results.sort(sortList);
			} else {
				results = results.sort('ceratedAt');
			}
			//fields
			if (fields) {
				const fieldsList = fields.split(',').join(' ');
				results = results.select(fieldsList);
			}

			const page = Number(query.page) || 1;
			const limit = Number(query.limit) || 10;
			const skip = (page - 1) * limit;
			results = results.skip(skip).limit(limit);

			const data = await results;
			resolve({ data, count: data.length });
		} catch (e) {
			reject(e);
		}
	});
};

export default { getAllProductsStatic, getAllProducts };
