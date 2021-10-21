const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Let us recap node express.');
});

const phones = [
	{id: 0, name: 'Samsung Galaxy', price: 50000},
	{id: 1, name: 'Apple iPhone', price: 70000},
	{id: 2, name: 'Sony Xperia', price: 60000},
	{id: 3, name: 'LG Optimus', price: 30000},
	{id: 4, name: 'Motorola Moto', price: 20000},
]

// implement search query
app.get('/phones', (req, res) => {
	const search = req.query.search;
	if (search) {
		const searchResult = phones.filter(phone => phone.name.toLowerCase().includes(search));
		res.send(searchResult);
	} else {
		res.send(phones);
	}
});

// access dynamic id
app.get('/phones/:phoneId', (req, res) => {
	const id = req.params.phoneId;
	const phone = phones[id];
	res.send(phone);
});

// app.METHOD
app.post('/phones', (req, res) => {
	// console.log('hitting post', req.body);
	const newPhone = req.body;
	newPhone.id = phones.length;
	phones.push(newPhone);
	// res.send(JSON.stringify(newPhone));
	res.json(newPhone);
})

app.listen(port, () => {
	console.log('Listening to port', port);
});