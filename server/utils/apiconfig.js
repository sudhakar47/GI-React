exports.getEnvHostName = function hostName() {
  let envName = '';
  let apiVersion = '/v1';
  const port = normalizePort(process.env.PORT || '8002');
  if (process.env.ENV) {
    envName = process.env.ENV;
  } else {
    envName = 'LOCAL';
  }
  if (process.env.APIVERSION) {
    apiVersion = `/${process.env.APIVERSION}`;
  }
  const hostname = {};
  switch (envName) {
    case 'LOCAL':
      hostname['secure'] = 'https://localhost:' + port + '/api' + apiVersion + '/secure';
      hostname['nonsecure'] = 'http://localhost:' + port + '/api' + apiVersion;
      break;
  }
  hostname['endPoint'] = envName;
  return hostname;
}

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}


/*
exports.getPort = function(){
    let port = normalizePort(process.env.PORT || '80');
    return port;}
exports.getHostName = function(){
    let hostName = normalizeHost(process.env.HOST || 'localhost');
    return hostName;} */
exports.getEndPoint = function () {
  let endPoint = '';
  if (process.env.WCSENDPOINT) {
    endPoint = process.env.WCSENDPOINT;
  } else {
    endPoint = "LOCAL";
  }
  let endpointConfigURL = {};
  switch (endPoint) {
    case 'LOCAL':
      endpointConfigURL['hostname'] = '192.168.0.39';
      endpointConfigURL['searchHostname'] = '192.168.0.39:3738';
      break;
  }
  endpointConfigURL['endPoint'] = endPoint;
  return endpointConfigURL;
}
/*function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;}
  if (port >= 0) {
    return port;}
  return false;}

function normalizeEndPoint(val) {
  let hostName = val;
  if (isNaN(hostName)) {
    return val;}
  if (hostName.length >= 0) {
    return hostName;}
  return false;
}



exports.getTestHostName = function(version){

    switch(version){

        case "v2":
                version = 'v2';
                break;
        default:
                version = 'v1';
    }
    return 'localhost:8002/api/' + version;
}*/
