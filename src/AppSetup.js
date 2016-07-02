
const setups = Symbol('setups')
const setruns = Symbol('setruns')
const running = Symbol('running')
const setupsadd = Symbol('setups add')
const onFinish = Symbol('event on finish')
const runned = Symbol('runned')

export class AppSetup {
	constructor () {
		this[ setups ] = new Set
		this[ setruns ] = new Set

		this[ running ] = false
		// Status runned
	}

	// Sedine un nuevo setup
	setup(e, stores = setups) {
		if (typeof e !== 'function') throw new TypeError('setup(): The first parameter not is a function')

		let useCallback = false
		let usePromise = false
		let useSecuence = false

		if (e instanceof AppSetup) {
			this[ stores ].add(e.run())
		} else {
			// With Callback
			if (e.length >= 1) {
				this[ stores ].add(new Promise((resolve, reject) => {
					e((err = undefined) => {
						if (err) {
							reject(err)
						} else {
							resolve()
						}
					})
				}))
			} else {
				// Without callback
				try {
					const result = e()
				
					// Is a Promise
					if (result instanceof Promise) {
						this[ stores ].add(result)
					} else {
						// is a function sequence
						this[ stores ].add(Promise.resolve(result))
					}
				} catch (ex) {
					this[ stores ].add(Promise.reject(ex))
				}
			}
		}
	}

	setrun(e) {
		this.setup(e, setruns)
	}

	run() {
		if (this[ running ] === false) {

			this[ runned ] = Promise.resolve()
				.then(() => Promise.all( [ ...this[ setups ].values() ] ))
				.then(() => Promise.all( [ ...this[ setruns ].values() ] ))

			this[ running ] = true
		}

		return this[ runned ]
	}
}

export default AppSetup