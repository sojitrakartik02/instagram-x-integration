import { App } from './app'
import { InstagramRoute } from './routes/instagram.route'

const app = new App([
    new InstagramRoute()
])


app.listen()   