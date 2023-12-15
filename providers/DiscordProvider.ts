import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { Client } from 'discord.js'

export default class DiscordProvider {
  #token = this.app.env.get('DISCORD_TOKEN')
  #client = new Client({
    intents: ['GuildMessages', 'DirectMessages', 'MessageContent', 'Guilds'],
  })

  constructor(private readonly app: ApplicationContract) {}

  public async register() {
    await this.#client.login(this.#token)
    this.app.logger.info('discord client logged in')
  }

  public async boot() {
    const event = this.app.container.resolveBinding('Adonis/Core/Event')
    this.#client.on('ready', (...args) => event.emit('discord:ready', [...args]))
    this.#client.on('threadCreate', (...args) => event.emit('discord:thread:created', [...args]))
    this.#client.on('threadDelete', (...args) => event.emit('discord:thread:deleted', [...args]))
    this.#client.on('threadUpdate', (...args) => event.emit('discord:thread:updated', [...args]))

    event.on('discord:ready', 'DiscordSocket.onReady')
    event.on('discord:thread:created', 'DiscordSocket.onThreadCreated')
    event.on('discord:thread:updated', 'DiscordSocket.onThreadUpdated')
    event.on('discord:thread:deleted', 'DiscordSocket.onThreadDeleted')
  }
}
