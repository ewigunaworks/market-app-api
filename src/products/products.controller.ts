import { ProductsService } from "./products.service";
import { Controller, UseGuards, Post, UseInterceptors, UploadedFile, Request, HttpException, HttpStatus, Get, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { saveImageToStorage} from "./helper/image-upload.helper";
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, of } from "rxjs";
import CreateProductsDto from "./dto/products.dto";
import { PaginationDto } from "./dto/pagination.dto";
import { PaginatedProductsResultDto } from "./dto/paginated-result.dto";

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): Observable<Object>{
    const filename = file?.filename;

    let ext = filename.split('.').pop();
    const extArr = ['png', 'jpg', 'jpeg']
    if(!extArr.includes(ext)) {
      throw new HttpException('File must be a png, jpg/jpeg', HttpStatus.BAD_REQUEST);
    }

    try {
      const createProductsDto = new CreateProductsDto();
      createProductsDto.name = file.originalname;
      createProductsDto.imagePath = file.path;
  
      this.productsService.create(createProductsDto);
      return of(createProductsDto); 
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  findAll(@Query() paginationDto: PaginationDto): Promise<PaginatedProductsResultDto> {
    paginationDto.page = Number(paginationDto.page)
    paginationDto.limit = Number(paginationDto.limit)

    return this.productsService.findAll({
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit
    })
  }
}