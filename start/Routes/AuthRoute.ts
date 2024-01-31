import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.group(() => {
      Route.post('/login', 'AuthController.login')
      Route.post('/register', 'AuthController.register')
      Route.get('/verify-email', 'AuthController.verifyEmail')
      Route.post('/complete-profile', 'AuthController.completeProfile').middleware('auth:api')
      Route.get('/user', 'AuthController.currentUser').middleware('auth:api')
    }).prefix('/auth')
  }).prefix('/v1')
}).prefix('/api')
