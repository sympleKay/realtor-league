import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'LeaguesController.store')
      Route.get('/', 'LeaguesController.index')
      Route.get('/type', 'LeaguesController.showByType')
      Route.get('/me', 'LeaguesController.showMyLeagues')
      Route.patch('/:id', 'LeaguesController.update')
      Route.delete('/:id', 'LeaguesController.destroy')
    }).prefix('/league')
  }).prefix('/v1')
})
  .prefix('/api')
  .middleware(['auth:api'])
