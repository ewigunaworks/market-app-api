import Products from "../products.entity";

export class PaginatedProductsResultDto {
  data: Products[]
  page: number
  limit: number
  totalCount: number
}