import { AuthModule } from 'src/modules/auth/auth.graphql.module';
import { CompareModule } from 'src/modules/compare/compare.gql.module';
import { UserModule } from 'src/modules/user/user.graphql.module';
import { GraphqlInitModule } from "./graphql.init";
import { BrandModule } from 'src/modules/brands/brand.graphql.module';

export const ResolveGraphqlModule = () => {
  return [
    ...GraphqlInitModule(),
    AuthModule,
    BrandModule,
    UserModule,
    CompareModule
  ];
};
