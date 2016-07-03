
import expect from 'expect.js'
import AppSetup from '../src/AppSetup'


describe('use AppSetup', () => {
	let app = new AppSetup,
		ready1 = false,
		ready2 = false,
		ready3 = false,
		ready4 = false,
		ready5 = false

	it('instence of AppSetup', () => {
		expect(app).to.be.a(AppSetup)
	})

	it('defined setups', () => {
		app.setup(done1 => {
			ready1 = true

			app.setup(done2 => {
				ready2 = true

				app.setup(done3 => {
					ready3 = true

					done1()
					done2()
					done3()
				})
			})
		})
	})

	it('defined setruns', () => {
		app.setrun(done => {
			done()
		})
	})

	it('use run()', (done) => {
		app.run()
			.then(() => {
				done()
			})
	})

	it('compare if is ready\'s',() => {
		expect(ready1).to.be(true)
		expect(ready2).to.be(true)
		expect(ready3).to.be(true)
	})
})

// let app = new AppSetup

// app.setup(function (done) {

// 	console.log('run setup1')

// 	app.setup(function (done1) {

// 		console.log('run setup1.2')

// 		app.setup(function (done2) {
// 			console.log('run setup1.3')
	
// 			done1()
// 			done2()
// 			setTimeout(done, 3000)
// 		})

// 	})
	
// })

// app.setup(function (done) {
// 	console.log('run setup2')
// 	done()
// })

// app.setrun(function (done) {
// 	console.log('run runer1')
// 	done()
// })

// app
// .run()
// .then(() => {
// 	console.log('app is ok')
// })
// .catch((err) => {
// 	console.log(err.stack)
// })