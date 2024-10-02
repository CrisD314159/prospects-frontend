const bcrypt = require('bcrypt');

async function wasd(){
    console.log(await bcrypt.hash("password789", 10))
}

wasd()