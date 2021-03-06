import { SuperModule } from '@kaufman-bot-generated/super';
import { BotInGroupsModule } from '@kaufman-bot/bot-in-groups-server';
import { BotCommandsModule } from '@kaufman-bot/core-server';
import { DebugMessagesModule } from '@kaufman-bot/debug-messages-server';
import { FactsGeneratorModule } from '@kaufman-bot/facts-generator-server';
import { LanguageSwitherModule } from '@kaufman-bot/language-swither-server';
import { ShortCommandsModule } from '@kaufman-bot/short-commands-server';
import { Module } from '@nestjs/common';
import env from 'env-var';
import { TelegrafModule } from 'nestjs-telegraf';
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
    TelegrafModule.forRoot({
      token: env.get('TELEGRAM_BOT_TOKEN').required().asString(),
      launchOptions: {
        dropPendingUpdates: true,
        ...(TELEGRAM_BOT_WEB_HOOKS_DOMAIN && TELEGRAM_BOT_WEB_HOOKS_PATH
          ? {
              webhook: {
                domain: TELEGRAM_BOT_WEB_HOOKS_DOMAIN,
                hookPath: TELEGRAM_BOT_WEB_HOOKS_PATH,
              },
            }
          : {}),
      },
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
      botNames: {
        en: BOT_NAMES,
      },
      botMeetingInformation: {
        en: [`Hello! I'm ${BOT_NAMES[0]} ????`, 'Hello!', 'Hello ????'],
      },
    }),
    LanguageSwitherModule.forRoot(),
    FactsGeneratorModule.forRoot(),
    SuperModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}
