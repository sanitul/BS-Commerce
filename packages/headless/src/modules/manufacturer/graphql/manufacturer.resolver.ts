import { Manufacturer } from 'src/entity/manufacturer';
import { ManufacturerService } from './../services/manufacturer.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';

@UseGuards(JwtAuthGuard)
@Resolver()
export class ManufacturerResolver {
  constructor(private manufacturerService: ManufacturerService) { }

  /**
   * Query Start
   */

  @Query()
  async getAllManufacturers(@Args('skip') skip: number, @Args('limit') limit: number) {
    return await this.manufacturerService.getAllManufacturers(skip, limit);
  }

  /**
  * Query End
  */

  /**
  * Mutation Start
  */

  @Mutation()
  async addManufacturer(@Args('manufacturer') manufacturer: Manufacturer) {
    return await this.manufacturerService.createManufacturer(manufacturer);
  }

  /**
   * Mutation End
   */
}
