## ¿Que es app-setup?
Es una clase para construir aplicaciones con módulos setup's

### Ejemplo
```javascript
import appSetup from 'app-setup'

class App extends appSetup {
    constructor(opts = {}) {
        super()

        this.setup(() => {
            // a setups with promise
            return new Promise((resolve, reject) => {
                // use 2 sec to setup
                setTimeout(resolve, 2000, { ok: true })
            })
        })

        this.setup((done) => {
            // a setups with callback

            // Use 3 sec to setup
            setTimeout(() => done(), 3000)
        })
    }
}

let app = new App

app.run()
    .then(() => {
        // Is ok after 3 sec
    })
```
