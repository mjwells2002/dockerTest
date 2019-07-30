const nslookup = require('nslookup');
var dns = require('dns');

function lookup(){
    let docker = JSON.parse( Buffer.from(process.env.baseConfig,'base64') );
    console.log(docker)
    dns.lookup(`tasks.${docker.service_name}`, (a,b) => {
        console.log(b);
        setTimeout(lookup,2500);
    })
}

lookup();
