const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');
    
var cmd = `cd ../../../../ && node endPointTest.js --host ${host} --path ${config.commentEndPoint} --method GET`
var data = JSON.stringify({
    data: {}
  });
  
  exec(
    `cd ../../../.. && node endPointTest.js --host ${host} --path ${
      config.commentEndPoint
    } --body '${data}'`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
      }
  
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    }
  );
  
