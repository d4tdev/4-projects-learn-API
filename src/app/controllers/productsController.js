import productsService from '../../services/productsService';

class ProductsController {
   handleGetAllProductsStatic = async (req, res) => {
      const products = await productsService.getAllProductsStatic();
      return res.status(200).json(products);
   }
   handleGetAllProducts = async (req, res) => {
      const response = await productsService.getAllProducts(req.query);
      return res.status(200).json(response);
   }
}

export default new ProductsController();
