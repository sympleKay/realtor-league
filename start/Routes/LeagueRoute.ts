import Route from '@ioc:Adonis/Core/Route'

// topLeagues
// teamRank
// history
// table

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/', 'LeaguesController.store')
      Route.get('/', 'LeaguesController.index')
      Route.get('/type', 'LeaguesController.showByType')
      Route.get('/me', 'LeaguesController.showMyLeagues')
      Route.get('/join', 'LeaguesController.joinPrivateLeague')
      Route.get('/top-leagues', 'LeaguesController.topLeagues')
      Route.get('/history', 'LeaguesController.history')
      Route.get('/:id', 'LeaguesController.show')
      Route.get('/:id/table', 'LeaguesController.table')
      Route.get('/:id/:teamId', 'LeaguesController.teamRank')
      Route.patch('/:id', 'LeaguesController.update')
      Route.post('/:id/join', 'LeaguesController.joinLeague')
      Route.delete('/:id', 'LeaguesController.destroy')
    }).prefix('/league')
  }).prefix('/v1')
})
  .prefix('/api')
  .middleware(['auth:api'])
