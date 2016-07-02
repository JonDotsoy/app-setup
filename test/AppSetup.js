
import AppSetup from '../src/AppSetup'


let app = new AppSetup

app.setup(function (done) {

	console.log('run setup1')

	app.setup(function (done1) {

		console.log('run setup1.2')

		app.setup(function (done2) {
			console.log('run setup1.3')
	
			done1()
			done2()
			setTimeout(done, 3000)
		})

	})
	
})

app.setup(function (done) {
	console.log('run setup2')
	done()
})

app.setrun(function (done) {
	console.log('run runer1')
	done()
})

app
.run()
.then(() => {
	console.log('app is ok')
})
.catch((err) => {
	console.log(err.stack)
})