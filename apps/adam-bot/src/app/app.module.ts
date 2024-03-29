import { InjectBot, NestjsGrammyModule } from '@grammyjs/nestjs';
import { SuperModule } from '@kaufman-bot-generated/super';
import { BotInGroupsModule } from '@kaufman-bot/bot-in-groups-server';
import { BotCommandsModule } from '@kaufman-bot/core-server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages-server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator-server';
import { LanguageSwitcherModule } from '@kaufman-bot/language-switcher-server';
import {
  DISABLE_SHORT_COMMANDS__BEFORE_HOOK,
  ShortCommandsModule,
} from '@kaufman-bot/short-commands-server';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import env from 'env-var';
import { Bot, Context, webhookCallback } from 'grammy';
import { CustomInjectorModule } from 'nestjs-custom-injector';
import {
  getDefaultTranslatesModuleOptions,
  TranslatesModule,
} from 'nestjs-translates';
import { join } from 'path';
import { AppService } from './app.service';

const TELEGRAM_BOT_WEB_HOOKS_DOMAIN = env
  .get('TELEGRAM_BOT_WEB_HOOKS_DOMAIN')
  .asString();
const TELEGRAM_BOT_WEB_HOOKS_PATH = env
  .get('TELEGRAM_BOT_WEB_HOOKS_PATH')
  .asString();

const BOT_NAMES = env.get('BOT_NAMES').required().asArray();

@Module({
  imports: [
    CustomInjectorModule.forRoot(),
    NestjsGrammyModule.forRoot({
      token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
      ...(TELEGRAM_BOT_WEB_HOOKS_DOMAIN && TELEGRAM_BOT_WEB_HOOKS_PATH
        ? {
            useWebhook: true,
          }
        : {}),
    }),
    TranslatesModule.forRoot(
      getDefaultTranslatesModuleOptions({
        localePaths: [
          join(__dirname, 'assets', 'i18n'),
          join(__dirname, 'assets', 'i18n', 'getText'),
          join(__dirname, 'assets', 'i18n', 'class-validator-messages'),
        ],
        vendorLocalePaths: [join(__dirname, 'assets', 'i18n')],
        locales: ['en'],
      })
    ),
    DebugMessagesModule.forRoot(),
    BotCommandsModule.forRoot({
      admins: env.get('TELEGRAM_BOT_ADMINS').default('').asArray(','),
      commit: env.get('DEPLOY_COMMIT').default('').asString(),
      date: env.get('DEPLOY_DATE').default('').asString(),
      version: env.get('DEPLOY_VERSION').default('').asString(),
      botMeetingInformation: {
        en: [`Hello! I'm ${BOT_NAMES[0]} 😉`, 'Hello!', 'Hello 🖖'],
      },
    }),
    ShortCommandsModule.forRoot({
      commands: {
        en: {
          '*fact*|history': 'get facts',
          '*what you can do*|faq': 'help',
          'disable debug': 'debug off',
          'enable debug': 'debug on',
        },
      },
    }),
    BotInGroupsModule.forRoot({
      defaultGroupGlobalContext: {
        [DISABLE_SHORT_COMMANDS__BEFORE_HOOK]: true,
      },
      botNames: {
        en: BOT_NAMES,
      },
      botMeetingInformation: {
        en: [`Hello! I'm ${BOT_NAMES[0]} 😉`, 'Hello!', 'Hello 🖖'],
      },
    }),
    LanguageSwitcherModule.forRoot(),
    FactsGeneratorModule.forRoot(),
    SuperModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(
    @InjectBot()
    private readonly bot: Bot<Context>
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const webhook = env.get('TELEGRAM_BOT_WEB_HOOKS_PATH').asString();
    if (webhook) {
      consumer.apply(webhookCallback(this.bot, 'express')).forRoutes(webhook);
    }
  }
}
