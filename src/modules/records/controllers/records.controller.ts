import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Delete,
  UnauthorizedException,
  Query,
  Param,
} from '@nestjs/common';

import { RecordsService } from '../services/records.service';
import { Request } from 'express';
import {
  CreateTotalCaloriesBurnedDto,
  CreateDistanceDto,
  CreateStepsDto,
} from '../dto/create.dto';
import { DistanceMapper } from '../mappers/distance.mapper';
import { StepsMapper } from '../mappers/steps.mapper';
import { TotalCaloriesBurnedMapper } from '../mappers/total-calories-burned.mapper';
import { RecordMapper } from '../mappers/records.mapper';

@Controller('health-records')
export class RecordsController {
  constructor(
    private readonly recordService: RecordsService,
    private readonly totalCaloriesBurnedMapper: TotalCaloriesBurnedMapper,
    private readonly distanceMapper: DistanceMapper,
    private readonly stepsMapper: StepsMapper,
    private readonly recordMapper: RecordMapper,
  ) {}

  @Post('total-calories-burned')
  async createTotalCaloriesBurned(
    @Body() dto: CreateTotalCaloriesBurnedDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const model = this.totalCaloriesBurnedMapper.toModel({ ...dto, userId });
    await this.recordService.saveTotalCaloriesBurned(model);
  }

  @Post('distance')
  async createDistance(
    @Body() dto: CreateDistanceDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const model = this.distanceMapper.toModel({ ...dto, userId });
    await this.recordService.saveDistance(model);
  }

  @Post('steps')
  async createSteps(
    @Body() dto: CreateStepsDto,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const model = this.stepsMapper.toModel({ ...dto, userId });
    await this.recordService.saveSteps(model);
  }

  @Get('total-calories-burned')
  async getTotalCaloriesBurned(
    @Query() startTime: string,
    @Query() endTime: string,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    const models = await this.recordService.getTotalCaloriesBurned(
      userId,
      new Date(startTime),
      new Date(endTime),
    );
    return models.map((model) => this.totalCaloriesBurnedMapper.toDto(model));
  }

  @Get('distance')
  async getDistance(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    const models = await this.recordService.getDistance(
      userId,
      new Date(startTime),
      new Date(endTime),
    );
    return models.map((model) => this.distanceMapper.toDto(model));
  }

  @Get('steps')
  async getSteps(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    const models = await this.recordService.getSteps(
      userId,
      new Date(startTime),
      new Date(endTime),
    );
    return models.map((model) => this.stepsMapper.toDto(model));
  }

  @Get('all')
  async getAll(
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Req() req: Request,
  ) {
    const startTimeDate = new Date(startTime);
    const endTimeDate = new Date(endTime);
    const userId = req.user.id;
    const combined = await this.recordService.readRecords(
      userId,
      startTimeDate,
      endTimeDate,
    );

    return this.recordMapper.combinedToDto(combined);
  }

  @Delete('total-calories-burned/:id')
  async deleteTotalCaloriesBurned(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const models = await this.recordService.getTotalCaloriesBurned(
      userId,
      new Date(0),
      new Date(),
    );
    const record = models.find((model) => model.id === id);
    if (record) {
      await this.recordService.deleteTotalCaloriesBurned(id);
    } else {
      throw new UnauthorizedException('You can only delete your own records.');
    }
  }

  @Delete('distance/:id')
  async deleteDistance(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const models = await this.recordService.getDistance(
      userId,
      new Date(0),
      new Date(),
    );
    const record = models.find((model) => model.id === id);
    if (record) {
      await this.recordService.deleteDistance(id);
    } else {
      throw new UnauthorizedException('You can only delete your own records.');
    }
  }

  @Delete('steps/:id')
  async deleteSteps(
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    const userId = req.user.id;
    const models = await this.recordService.getSteps(
      userId,
      new Date(0),
      new Date(),
    );
    const record = models.find((model) => model.id === id);
    if (record) {
      await this.recordService.deleteSteps(id);
    } else {
      throw new UnauthorizedException('You can only delete your own records.');
    }
  }
}
