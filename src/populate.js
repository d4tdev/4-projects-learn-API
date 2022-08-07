import db from './config/db/connect';
import jsonProducts from './products.json';
import Products from './app/model/products';

(async () => {
	try {
      await db.connect();
      await Products.deleteMany({});
      await Products.create(jsonProducts);
      console.log('OK!!!');
      process.exit(0);
	} catch (err) {
		console.log(err);
      process.exit(1);
	}
})();
