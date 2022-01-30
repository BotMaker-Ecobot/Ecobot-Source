
function Data (name) {
    let data = {
        "name":  `${name}`,
        "main":   `index.js`,
        "scripts" : {
          "dev": "nodemon index.js"
        },
        "license": "MIT",
        "devDependencies": {
          "dotenv": "^10.0.0",
          "eslint": "^8.5.0",
          "nodemon": "^2.0.15"
        },
        "dependencies": {
          "@discordjs/builders": "^0.9.0",
          "@discordjs/opus": "^0.7.0",
          "@discordjs/rest": "^0.1.0-canary.0",
          "@discordjs/voice": "^0.7.5",
          "chalk": "^5.0.0",
          "discord-api-types": "^0.25.2",
          "discord.js": "^13.3.1",
          "ffmpeg-static": "^4.4.0",
          "fs": "^0.0.1-security",
          "ytdl-core": "^4.9.2"
        }
    } 
}

module.exports = Data;