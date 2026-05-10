import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CreateReportDto } from './dto/report.dto';
import { ReportsService } from './reports.service';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear reporte contra usuario' })
  create(@CurrentUser('id') reporterId: string, @Body() dto: CreateReportDto) {
    return this.reportsService.create(reporterId, dto);
  }

  @Get('mine')
  @ApiOperation({ summary: 'Mis reportes enviados' })
  findMine(@CurrentUser('id') reporterId: string) {
    return this.reportsService.findMine(reporterId);
  }
}