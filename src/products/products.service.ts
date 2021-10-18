import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from './products.entity';
import { Repository } from 'typeorm';
import CreateProductsDto from './dto/products.dto';
import { PaginationDto } from './dto/pagination.dto';
import { PaginatedProductsResultDto } from './dto/paginated-result.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>
  ) {}

  async create(productData: CreateProductsDto) {
    const newProduct = await this.productsRepository.create(productData);
    await this.productsRepository.save(newProduct);
    return newProduct;
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedProductsResultDto> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.productsRepository.count()
    const products = await this.productsRepository.createQueryBuilder()
        .offset(skippedItems)
        .limit(paginationDto.limit)
        .getMany()

    return {
      totalCount,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products
    }
  }
}
