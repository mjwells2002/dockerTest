const express = require('express');
var dns = require('dns');

const app = express()
const port = 3000

app.get('/', lookup)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


function lookup(req,res){
    let docker = JSON.parse( Buffer.from(process.env.baseConfig,'base64') );
    console.log(docker)
    dns.resolve(`tasks.${docker.service_name}`, (a,b) => {
        res.send(`${process.env.HOSTNAME} -- ${b}`)
        console.log(b);
        //setTimeout(lookup,2500);
    })
}

