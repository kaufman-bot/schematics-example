import {
  BotCommandsEnum,
  BotCommandsProvider,
  BotCommandsProviderActionMsg,
  BotCommandsProviderActionResultType,
  BotCommandsToolsService,
} from '@kaufman-bot/core-server';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { getText } from 'class-validator-multi-lang';
import { TranslatesService } from 'nestjs-translates';

export const SUPER_CONFIG = 'SUPER_CONFIG';

export interface SuperConfig {
  title: string;
  name: string;
  descriptions: string;
  usage: string[];
  spyWords: string[];
  category: string;
}

@Injectable()
export class SuperService implements BotCommandsProvider {
  handlerId = SuperService.name;

  private readonly logger = new Logger(SuperService.name);

  constructor(
    @Inject(SUPER_CONFIG)
    private readonly superConfig: SuperConfig,
    private readonly translatesService: TranslatesService,
    private readonly commandToolsService: BotCommandsToolsService,
    private readonly botCommandsToolsService: BotCommandsToolsService
  ) {}

  async onHelp<
    TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
  >(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
    return await this.onMessage({
      ...msg,
      text: `${this.superConfig.name} ${BotCommandsEnum.help}`,
    });
  }

  async onMessage<
    TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
  >(msg: TMsg): Promise<BotCommandsProviderActionResultType<TMsg>> {
    const locale = this.botCommandsToolsService.getLocale(msg, 'en');

    const spyWord = this.superConfig.spyWords.find((spyWord) =>
      this.commandToolsService.checkCommands(msg.text, [spyWord], locale)
    );
    if (spyWord) {
      if (
        this.commandToolsService.checkCommands(
          msg.text,
          [BotCommandsEnum.help],
          locale
        )
      ) {
        return {
          type: 'markdown',
          message: msg,
          markdown: this.commandToolsService.generateHelpMessage(msg, {
            locale,
            name: this.superConfig.title,
            descriptions: this.superConfig.descriptions,
            usage: this.superConfig.usage,
            category: this.superConfig.category,
          }),
        };
      }

      const processedMsg = await this.process(msg, locale);

      if (typeof processedMsg === 'string') {
        return {
          type: 'text',
          message: msg,
          text: processedMsg,
        };
      }
      if (processedMsg) {
        return { type: 'message', message: processedMsg };
      }

      this.logger.warn(`Unhandled commands for text: "${msg.text}"`);
      this.logger.debug(msg);
    }
    return null;
  }

  private async process<
    TMsg extends BotCommandsProviderActionMsg = BotCommandsProviderActionMsg
  >(msg: TMsg, locale: string) {
    if (
      this.commandToolsService.checkCommands(
        msg.text,
        [getText('ping')],
        locale
      )
    ) {
      return this.translatesService.translate(getText('pong'), locale);
    }
    return null;
  }
}
