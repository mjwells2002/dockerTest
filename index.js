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
let ready = false;

try {
    myip = os.networkInterfaces()['eth0'][0].address
} catch {
     myip = 'windows '
}

setInterval(() => {
    if(ready){
        publicApp.listen(externalPort, onStart);
        internalApp.listen(internalPort, onStart);
    }
},100);
publicApp.get('/', lookup);
publicApp.get('/set',extUpdate);
internalApp.get('/', intApp)
internalApp.get('/update', post)



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
    appShared = req.query.d
    t3();
    console.log(`update for PUBLIC appShared ${appShared}`);
    res.send('OKAY');
}
function intApp(req,res){
    res.send(appShared)
}

function post(req,res){
    appShared = req.query.d
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
let out = []    
function t4(){
    t2(arr => {
        arr.forEach(x => {
            if (x == myip){

            } else {
                //not only present node
                request(`http://${x}:${internalPort}/`, function (error, response, body) {
                out.push(body);
                });
            }
        })
    })
}



setTimeout(() => {
    out.forEach(d => {
        if (!ready){
            if (d == appShared ){
                //default value
            } else {
                appShared = d
                console.log(`stating node got update ${appShared}`)
                ready= true;
            }
        }
        
    })
    //ready = true;
},1000);
let x = setTimeout(() => {
    ready = true;
},2000);