import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTenantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  name: string;
}
