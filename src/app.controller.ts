import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { SkipInterceptor } from './common/decorators/skip.interceptor';

@ApiTags('System')
@Controller()
@SkipInterceptor()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/health')
  
  @ApiOperation({ summary: 'Perform a system health check' })
  @ApiOkResponse({
    description: 'The service is functional and responding correctly.',
  })
  health() {
    return this.appService.handleHealth();
  }

  @Get('/metrics')
  @ApiOperation({ summary: 'Gather application metrics' })
  @ApiOkResponse({
    description: 'Metrics delivered',
  })
  metrics() {
    return this.appService.handleMetrics();
  }
}