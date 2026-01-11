import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({ summary: 'Perform a system health check' })
  @ApiOkResponse({
    description: 'The service is functional and responding correctly.',
  })
  health() {
    return this.appService.handleHealth();
  }
}