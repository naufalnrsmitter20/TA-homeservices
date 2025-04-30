import express from 'express'
import cors from 'cors'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())


app.use(`/menu`, )
app.use(`/user`, )
app.use(`/order`, )
app.use(`/report`,)

// Set public folder as static
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${3000}`)
})