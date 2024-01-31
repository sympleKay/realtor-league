import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/change-password', 'UsersController.changePassword').middleware('auth:api')
    }).prefix('/user')
  }).prefix('/v1')
}).prefix('/api')
