import { NextRouter } from 'next/router';
import { GET_PRODUCTS } from '../graphqlSchema/queries/productQueries';
import { User } from '../utils/types';
import client from '../graphqlSchema/apollo-client';
import {
  CreateProductRequest,
  GetUserSuccessResponse,
  UpdatedUserRequest,
  ChangePasswordRequest,
  Product,
  SignInRequest,
  SignInSuccessResponse,
  getCategoryListSuccessResponse,
  getCategoryRequest,
  getCategorySuccessResponse,
  GetAllBrandsSuccessResponse,
  createCategoryRequest,
  createCategorySuccessResponse,
  UploadFileSuccessResponse,
  GetTagsResponse,
  CreateBrandRequest,
} from 'models';

export async function getUserGraphQl(): Promise<User[] | undefined> {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });
  return data as User[];
}
export async function createProductGraphQl(data: CreateProductRequest) {
  return;
}

export async function getProductsGraphQL(): Promise<Product[] | undefined> {
  return;
}

export async function getProductSearchGraphQL(): Promise<Product | undefined> {
  return;
}

export async function signinGraphQL(
  data: SignInRequest,
  router: NextRouter
): Promise<SignInSuccessResponse | undefined> {
  return;
}

export async function createAdminGraphql(): Promise<User | undefined> {
  return;
}

export async function getAdminsGraphql(): Promise<User[] | undefined> {
  return;
}

export async function updateAdminGraphql(): Promise<
  UpdatedUserRequest | undefined
> {
  return;
}

export async function changePasswordGraphql(): Promise<
  ChangePasswordRequest | undefined
> {
  return;
}

export async function getUserProfileGraphql(): Promise<
  GetUserSuccessResponse | undefined
> {
  return;
}

export async function getCategoryListGraphQL(): Promise<
  getCategoryListSuccessResponse | undefined
> {
  return undefined;
}

export async function getCategoryGraphQL(
  id: getCategoryRequest
): Promise<getCategorySuccessResponse | undefined> {
  return undefined;
}

export async function getBrandsGraphQL(): Promise<
  GetAllBrandsSuccessResponse | undefined
> {
  return undefined;
}
export async function getBrandGraphQL(): Promise<any> {
  return undefined;
}
export async function createBrandGraphQL(
  data: CreateBrandRequest,
  router: NextRouter
): Promise<any> {
  return undefined;
}
export async function createCategoryGraphQL(
  data: createCategoryRequest,
  router: NextRouter
): Promise<createCategorySuccessResponse | undefined> {
  return undefined;
}
export async function getTagsGraphQL(): Promise<GetTagsResponse | undefined> {
  return;
}

export async function mediaUploadGraphQL(
  data: FormData
): Promise<UploadFileSuccessResponse | undefined> {
  return undefined;
}

export async function getAllOrderListGraphQL() {
  return undefined;
}
