# App-Setup

> ### tl;dr
> Calls back and promises require wait, use functions to call setups applications.

## ¿Que es app-setup?
Es una clase para construir aplicaciones con módulos setup's

Todas las aplicaciones pueden tener accesos a recursos asíncronos, para ello ideal utilizar los setup's y setrun de una aplicación con AppSetup.

* setup: Un recurso que se carga al momento de ser iniciada
* setrun: Una ves se aya cargado todos los demás recursos este sera usado.

### Ejemplo
```javascript
import AppSetup from 'app-setup' // Or let AppSetup = require('app-setup').AppSetup

class App extends AppSetup {
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

        this.setrun(done => {
            // A run with delay 2 sec 
            setTimeout(() => done(), 2000)
        })
    }
}

let app = new App

app.run()
    .then(() => {
        // Is ok after 5 sec
    })
```

## Como instalar
> :warning:: Requiere NODE 6.2 o superior.

Usando NPM para instalar desde la consola.

```bash
npm install --save app-setup
```

