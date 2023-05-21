import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import * as ENTITIES from '@entities/index';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PopulateHint } from '@mikro-orm/core';

@Global()
@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongo',
        debug: true,
        ensureIndexes: true,
        populateWhere: PopulateHint.ALL,
        entitiesTs: ['src/entities/*.ts'],
        dbName: configService.get('DB_NAME'),
        entities: [...Object.values(ENTITIES)],
        clientUrl: configService.get('MONGO_URI'),
      }),
    }),
    MikroOrmModule.forFeature({
      entities: [...Object.values(ENTITIES)],
    }),
  ],
  providers: [],
  exports: [MikroOrmModule],
})
export class OrmModule {}
