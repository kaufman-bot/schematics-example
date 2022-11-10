import {
  BotCommandsCategory,
  BotCommandsModule,
  BOT_COMMANDS_PROVIDER,
} from '@kaufman-bot/core-server';
import { DynamicModule, Module } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesModule } from 'nestjs-translates';
import { SuperService, SuperConfig, SUPER_CONFIG } from './super.service';

@Module({
  imports: [TranslatesModule, BotCommandsModule],
  exports: [TranslatesModule, BotCommandsModule],
})
export class SuperModule {
  static forRoot(): DynamicModule {
    return {
      module: SuperModule,
      providers: [
        {
          provide: SUPER_CONFIG,
          useValue: <SuperConfig>{
            title: getText('Super commands'),
            name: 'super',
            usage: [getText('super ping'), getText('super help')],
            descriptions: getText('Commands for super'),
            spyWords: [getText('super')],
            category: [BotCommandsCategory.user, BotCommandsCategory.group],
          },
        },
        {
          provide: BOT_COMMANDS_PROVIDER,
          useClass: SuperService,
        },
      ],
      exports: [SUPER_CONFIG],
    };
  }
}
