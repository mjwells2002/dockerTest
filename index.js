const express = require('express');
var dns = require('dns');
const os = require('os')
const request = require('request');

const publicApp = express()
const externalPort = 3000

const internalApp = express()
const internalPort = 4040

let appShared = 'lolcatz'
let myip
try {
    myip = os.networkInterfaces()['eth0'][0].address
} catch {
     myip = 'windows '
}


publicApp.get('/', lookup);
publicApp.get('/set',extUpdate);
//internalApp.get('/', intApp)
internalApp.get('/update', post)

publicApp.listen(externalPort, onStart);
internalApp.listen(internalPort, onStart);

function onStart() {
    console.log('startred')
}

function lookup(req,res){
    let docker = JSON.parse( Buffer.from(process.env.baseConfig,'base64') );
    console.log(docker)
    dns.resolve(`tasks.${docker.service_name}`, (a,b) => {
        res.send(`${process.env.HOSTNAME} - ${myip} -- ${b} --${appShared}`)
        console.log(b);
        //setTimeout(lookup,2500);
    })
}

function extUpdate(req,res){
    appShared = req.params.d
    t3();
    console.log(`update for PUBLIC appShared ${appShared}`);
    res.send('OKAY');
}

function post(req,res){
    appShared = req.params.d
    console.log(`update for appShared ${appShared}`);
    res.send('OKAY');
}

function t2(callback){
    let docker = JSON.parse( Buffer.from(process.env.baseConfig,'base64') );
    console.log(docker)
    dns.resolve(`tasks.${docker.service_name}`, (a,b) => {
        //res.send(`${process.env.HOSTNAME} -- ${b}`)
        callback(b)
        //setTimeout(lookup,2500);
    })
}

function t3(){
    t2(arr => {
        arr.forEach(x => {
            if (x == myip){

            } else {
                //not only present node
                request(`http://${x}:${internalPort}/update?d=${appShared}`, function (error, response, body) {
                
                });
            }
        })
    })
}


