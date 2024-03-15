// 4IT573 Základy Node.js
// 4. úkol

import http from 'http'
import fs from "fs/promises"


const port = 3000;
const file = "counter.txt";


const server = http.createServer(async (req, res) => {
  let text = "not OK";
  const action = req.url.slice(1)

  try{
      const data = await fs.readFile(file);
      text = "OK";

      if(action == "increase"){
        changeCounter(file, data, 1);
      }else if(action == "decrease"){
        changeCounter(file, data, -1);
      }else if(action == "read"){
        text = data;
      }

      res.statusCode = 200;
      
  }catch(err){
      // handle file errors
      if(err.code == "ENOENT"){
        try{
          await fs.writeFile(file, "0");
          text = "File " + file + " was just created: 0";
          console.error("File " + file + " was just created, it contains 0.\n");
        }catch(err2){
          console.error(err + "\n" + err2);
        }
      }else{
        console.error(err);
      }

  }finally{
    res.setHeader('Content-Type', 'text/html')
    res.write(text);
    res.end();
  }
})

server.listen(port, () => {
  console.log("Server listening.")
})

async function changeCounter(fileName, count, change) 
{
  try{
    let num = Number(count) + Number(change);
    await fs.writeFile(file, num.toString());
  }catch(err){
    console.error(err);
  }
}




