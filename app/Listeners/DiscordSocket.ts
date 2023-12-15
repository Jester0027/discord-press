import type { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

export default class DiscordSocket {
  public async onReady([]: EventsList['discord:ready']) {
    Logger.info('Discord bot ready')
  }

  public async onThreadCreated([]: EventsList['discord:thread:created']) {
    Logger.info('Thread created')
  }

  public async onThreadUpdated([]: EventsList['discord:thread:updated']) {
    Logger.info('Thread updated')
  }

  public async onThreadDeleted([]: EventsList['discord:thread:deleted']) {
    Logger.info('Thread deleted')
  }
}
