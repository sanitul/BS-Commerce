import { Injectable } from '@nestjs/common';
import { Product, UpdateProduct } from 'src/entity/product';
import { IProductDatabase } from 'src/modules/product/repositories/product.database.interface';
import { CategoryModel } from '../category/category.model';
import { OrderModel } from '../order/order.model';
import { ProductModel } from './product.model';

@Injectable()
export class ProductDatabase implements IProductDatabase {

  async findProduct(query: Record<string, any>): Promise<Product | null> {
    return await ProductModel.findOne(query, '-_id').lean();
  }

  async createProduct(product: Product): Promise<Product | null> {
    return await ProductModel.create(product);
  }

  async findAllProducts(query: Record<string, any>, skip?: number, limit?: number): Promise<Product[] | []> {
    return await ProductModel.find(query, '-_id').skip(skip).limit(limit).lean();
  }

  async getAllConditionalProducts(slug: string, orderBy: string, skip?: number, limit?: number): Promise<Product[] | []> {
    const categories = await CategoryModel.find({ '$or': [{ 'slug': slug }, { 'ancestors.slug': slug }] }).lean();
    const categoryIdList = categories && categories.length && categories.map(category => { return category.id });
    return await ProductModel.find({ 'categories.id': { '$in': categoryIdList } }, '-_id').sort('info.' + orderBy).skip(skip).limit(limit).lean();
  }

  async getProductCount(query: Record<string, any>): Promise<number> {
    return await ProductModel.find(query, '-_id').lean().count();
  }

  async deleteProduct(productId: string): Promise<Product | null> {
    return await ProductModel.findOneAndRemove({ id: productId }).lean();
  }

  async updateProduct(product: UpdateProduct, productId: string): Promise<Product | null> {
    return await ProductModel.findOneAndUpdate({ id: productId }, { $set: product }, { new: true }).lean().exec();
  }

  async updateProductsForBrand(productIds: string[], brandId: string): Promise<Product[] | []> {
    await ProductModel.updateMany(
      { id: { '$in': productIds } },
      { $addToSet: { brands: brandId } },
      { multi: true }
    ).exec();
    return await ProductModel.find({ id: { '$in': productIds } }).lean();
  }

  async getProductsList(skip: number, limit: number, query?: Record<string, any>, sortCondition?: string): Promise<Product[] | []> {
    return await ProductModel.find(query, '-_id').sort(sortCondition).skip(skip).limit(limit).lean();
  }

  async GetTopSellingProducts(query: Record<string, any>, skip: number, limit: number): Promise<Product[] | []> {
    const orderArray = await OrderModel.aggregate([
      { $unwind: "$products" },
      { $unwind: "$products.info" },
      {
        $group:
        {
          _id: "$products.id",
          totalOrderQuantity:
          {
            $sum: "$products.info.quantity"
          }
        }
      },
      { $sort: { totalOrderQuantity: -1 } }
    ]);

    let productsIds = orderArray.map(function (item) {
      return item._id
    });

    return await ProductModel.find({ id: { $in: productsIds } }).skip(skip).limit(limit).lean();
  }
}
