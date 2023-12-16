/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Database from '@ioc:Adonis/Lucid/Database'

export type Post = {
  d_snowflake: string
  d_name: string
  d_content_html: string
  d_author_name: string
  created_at: string
}

Route.get('/', async ({ view }) => {
  const posts = await Database.query<
    Pick<Post, 'd_snowflake' | 'd_name' | 'd_author_name' | 'created_at'>[]
  >()
    .from('posts')
    .select('d_snowflake', 'd_name', 'd_author_name', 'created_at')
    .orderBy('created_at', 'asc')
  return view.render('home', { posts })
})

Route.get('/:id', async ({ view, params: { id } }) => {
  const post = await Database.query<
    Pick<Post, 'd_snowflake' | 'd_name' | 'd_content_html' | 'd_author_name' | 'created_at'>
  >()
    .from('posts')
    .select('d_snowflake', 'd_name', 'd_content_html', 'd_author_name', 'created_at')
    .where('d_snowflake', id)
    .first()
  return view.render('post', { post })
})
