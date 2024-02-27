import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'LeaguesController.store')
      Route.get('/', 'LeaguesController.index')
      Route.get('/type', 'LeaguesController.showByType')
      Route.get('/me', 'LeaguesController.showMyLeagues')
      Route.get('/:id', 'LeaguesController.show')
      Route.patch('/:id', 'LeaguesController.update')
      Route.post('/:id/join', 'LeaguesController.joinLeague')
      Route.delete('/:id', 'LeaguesController.destroy')
    }).prefix('/league')
  }).prefix('/v1')
})
  .prefix('/api')
  .middleware(['auth:api'])
