// 4IT573 Základy Node.js
// 3. úkol

import fs from 'fs/promises'


async function main(){
  const instructions = "instrukce.txt";

  try{
    const numFiles = await fs.readFile(instructions);
    const num = numFiles.toString();
    
    // if instrukce.txt doesn't contain number
    if (isNaN(num)){
      console.error("Nastal problém, více informací:\n" +"V souboru instrukce.txt musí být číslo.");
      return 2;
    }

    createFiles(num);
  } catch(err){
    console.error("Nastal problém, více informací:\n" +err);
  }
}

async function createFiles(num)
{
  let functions = [];
  for(let i = 0; i < num; i++){ 
    functions.push(fs.writeFile(i + ".txt", "Soubor " + i));
  }

  try{
    await Promise.all(functions);
    console.log("Soubory byly vytvořeny.");
  }catch(err){
    console.error("Nastal problém, více informací:\n" +err);
  }
}

main();