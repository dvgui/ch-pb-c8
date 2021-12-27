import express from 'express'

const app = express()
const { Router } = express
const routerProductos = Router()

app.use('/api/productos', routerProductos)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended: true}))

app.use(express.static('public'))



/* ------------------------------------------------------ */
/* Productos */

class Productos {
    constructor() {
        this.productos = []
    }
    get(id) {
        let producto = this.productos.find(x => x.id === id)
        if (producto == null) {
            return 'not found';
        } else {
            return producto
        }
    }
    add(prod) {
        this.productos.push({
            id : this.productos.length + 1,
            ...prod
        });
    }
    get() {
        if (this.productos.length == 0) {
            return 'empty'
        } else {
            return this.productos
        }
    }
    update(id, obj) {
        console.log();
        const newProds = this.productos.map(prod => prod.id === id ? obj : prod)
        this.productos = newProds;
/*         this.productos[productos.findIndex(el => el.id === obj.id)] =  {
            ...obj
        } */
    }
    delete(id) {
        const newProds = this.productos.map( x => x.id === id ? null : x) 
        this.productos = newProds;
    }
}

const productos = new Productos();

routerProductos.get('/', (req,res) => {
    res.json(productos.get())
})
routerProductos.get('/:id', (req,res) => {
    res.json(productos.get(req.params.id))
})

routerProductos.post('/', (req,res) => {
    productos.add(req.body)
    res.json(req.body)
})

routerProductos.put('/:id', (req,res) => {
    console.log(req.params.id)
    productos.update(parseInt(req.params.id), req.body)
    res.json(productos.get())
})
routerProductos.delete('/:id', (req,res) => {
    productos.delete(parseInt(req.params.id))
    res.json(productos.get())
})

/* ----------------------------------------------------- */

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))
