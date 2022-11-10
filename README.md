# KaufmanBotGenerated

## Links

https://github.com/EndyKaufman/kaufman-bot - source code of bot

https://dev.to/endykaufman/series/16805 - kaufman-bot series articles

https://telegram.me/KaufmanBot - current bot in telegram

## Check logic of work with @kaufman-bot/schematics

### Create empty nx project

> npx -y create-nx-workspace@15.0.13 --name=kaufman-bot-generated --preset=empty --interactive=false --nx-cloud=false

```sh
endy@endy-virtual-machine:~/Projects/current$ npx -y create-nx-workspace@15.0.13 --name=kaufman-bot-generated --preset=empty --interactive=false --nx-cloud=false

 >  NX   Nx is creating your v15.0.13 workspace.

   To make sure the command works reliably in all environments, and that the preset is applied correctly,
   Nx will run "npm install" several times. Please wait.

✔ Installing dependencies with npm
✔ Nx has successfully created the workspace.

 ———————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————


 >  NX   First time using Nx? Check out this interactive Nx tutorial.

   https://nx.dev/getting-started/nx-core
```

### Go to created project

> cd kaufman-bot-generated

### Add all need schematics

> npm install -D @nrwl/nest@15.0.13 @kaufman-bot/schematics@3.2.0

```sh
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm install -D @nrwl/nest@15.0.13 @kaufman-bot/schematics@3.2.0

added 162 packages, and audited 567 packages in 12s

54 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Create kaufman-bot application

> npx -y nx@15.0.13 g @kaufman-bot/schematics:app adam-bot --bot-name adam

```sh
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npx -y nx@15.0.13 g @kaufman-bot/schematics:app adam-bot --bot-name adam
UPDATE package.json
UPDATE nx.json
UPDATE tsconfig.base.json
UPDATE .gitignore
CREATE .env.local
CREATE .env-example.local
CREATE jest.config.js
CREATE jest.preset.js
UPDATE .vscode/extensions.json
CREATE apps/adam-bot/src/app/.gitkeep
CREATE apps/adam-bot/src/assets/.gitkeep
CREATE apps/adam-bot/src/environments/environment.prod.ts
CREATE apps/adam-bot/src/environments/environment.ts
CREATE apps/adam-bot/src/main.ts
CREATE apps/adam-bot/tsconfig.app.json
CREATE apps/adam-bot/tsconfig.json
CREATE apps/adam-bot/project.json
UPDATE workspace.json
CREATE .eslintrc.json
CREATE apps/adam-bot/.eslintrc.json
CREATE apps/adam-bot/jest.config.js
CREATE apps/adam-bot/tsconfig.spec.json
CREATE apps/adam-bot/src/app/app.module.ts
CREATE apps/adam-bot/src/app/app.service.ts

added 343 packages, removed 1 package, changed 1 package, and audited 909 packages in 37s

102 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

up to date, audited 909 packages in 2s

102 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

### Create telegram bot in @BotFather

![Create telegram bot in @BotFather](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y42z7xieyso9vfewdygu.png)

### Append token to env file

_.env.local_

```sh
TELEGRAM_BOT_TOKEN=5384981645:AAEKAfqNpZmoN1w5eQL2QxJtvY5h3O-71Zs
TELEGRAM_BOT_WEB_HOOKS_DOMAIN=
TELEGRAM_BOT_WEB_HOOKS_PATH=
TELEGRAM_BOT_ADMINS=
BOT_NAMES=adam
```

### Check from telegram

> npm run serve:adam-bot-local

```sh
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm run serve:adam-bot-local

> kaufman-bot-generated@0.0.0 serve:adam-bot-local
> export $(xargs < ./.env.local) > /dev/null 2>&1 && npm run nx -- serve adam-bot


> kaufman-bot-generated@0.0.0 nx
> nx "serve" "adam-bot"


> nx run adam-bot:serve

chunk (runtime: main) main.js (main) 10.1 KiB [entry] [rendered]
webpack compiled successfully (3e915c7195348378)
Debugger listening on ws://localhost:9229/045c9820-61d9-42b1-a3b5-57dc00299eea
For help, see: https://nodejs.org/en/docs/inspector
Issues checking in progress...
[Nest] 1363135  - 04/22/2022, 1:32:02 PM     LOG [NestFactory] Starting Nest application...
...
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [TranslatesBootstrapService] onModuleInit
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [TranslatesStorage] Add 1 translates for locale: en
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [NestApplication] Nest application successfully started +2ms
[Nest] 1363135  - 04/22/2022, 1:32:05 PM     LOG [Application] 🚀 Application is running on: http://localhost:3333
```

![npm run serve:adam-bot-local](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/st86stk5rv8tkzsganzp.png)

Search new bot
![Search new bot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dnxxniwrgixkzxz5wjit.png)

Start work with bot
![Start work with bot](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pcqq79odfdja46rtw11r.png)

Example of run commands
![Example of run commands](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b3vpxtspkdurinm6rp1l.png)

### Create new command

> npm run nx -- g @kaufman-bot/schematics:lib super

```sh
endy@endy-virtual-machine:~/Projects/current/kaufman-bot-generated$ npm run nx -- g @kaufman-bot/schematics:lib super

> kaufman-bot-generated@0.0.0 nx
> nx "g" "@kaufman-bot/schematics:lib" "super"

CREATE libs/super/README.md
CREATE libs/super/src/index.ts
CREATE libs/super/tsconfig.json
CREATE libs/super/tsconfig.lib.json
CREATE libs/super/project.json
UPDATE workspace.json
UPDATE tsconfig.base.json
CREATE libs/super/.eslintrc.json
CREATE libs/super/jest.config.js
CREATE libs/super/tsconfig.spec.json
CREATE libs/super/src/lib/super.module.ts
CREATE libs/super/src/lib/super.service.ts
```

![Create new command](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/86px1fnvpu6quinjvojy.png)

### Update app module

_apps/adam-bot/src/app/app.module.ts_

```ts
import { SuperModule } from '@kaufman-bot-generated/super';
...

@Module({
  imports: [
    ...
    SuperModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule {}
```

### Restart application and check work in telegram

![Restart application and check work in telegram](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3w41zhmmq4jayslqphw1.png)

### Generated commands service

_libs/super/src/lib/super.service.ts_

```ts
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
  category: string[];
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
```

### Generated commands module

_libs/super/src/lib/super.module.ts_

```ts
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
```
