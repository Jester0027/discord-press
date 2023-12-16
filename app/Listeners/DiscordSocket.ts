import type { EventsList } from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'
import { marked } from 'marked'
import createDOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

export default class DiscordSocket {
  public async onReady([]: EventsList['discord:ready']) {
    Logger.info('Discord bot ready')
  }

  // @ts-ignore
  public async onThreadCreated([thread, newThread]: EventsList['discord:thread:created']) {
    // const initialMessage = await thread.fetchStarterMessage()
    // const html = await this.#parseMarkdown(initialMessage?.content)
    Logger.info('Thread created')
  }

  // @ts-ignore
  public async onThreadUpdated([thread]: EventsList['discord:thread:updated']) {
    // const initialMessage = await thread.fetchStarterMessage()
    Logger.info('Thread updated')
  }

  // @ts-ignore
  public async onThreadDeleted([thread]: EventsList['discord:thread:deleted']) {
    // const initialMessage = await thread.fetchStarterMessage()
    Logger.info('Thread deleted')
  }

  #sanitize(content: string | null) {
    if (content === null) return null
    const window = new JSDOM('').window
    const purify = createDOMPurify(window)
    return purify.sanitize(content, { KEEP_CONTENT: true, SANITIZE_DOM: true })
  }

  // @ts-ignore
  #parseMarkdown = async (content?: string) =>
    this.#sanitize(content ? await marked.parse(content) : null)
}
