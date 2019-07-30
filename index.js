const nslookup = require('nslookup');

function lookup(){
    let docker = JSON.parse( Buffer.from(process.env.baseConfig,'base64') );
    console.log(docker)
    nslookup(`tasks.${docker.service_name}`)
        .server(docker.docker_dns)
        .type(docker.lookup_type)
        .end((err,data) => {
            console.log(data);
            lookup();
        })
}

lookup();
