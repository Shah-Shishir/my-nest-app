import { PartialType } from '@nestjs/swagger';
import { CreateQuickAccessDto } from './create-quick-access.dto';

export class UpdateQuickAccessDto extends PartialType(CreateQuickAccessDto) {}
