const fetch = require("node-fetch");
const express = require('express');
const app = new express();
console.log("API Aktif")
app.get("/invite", function(req, res) {
     if(!req.query.code){
      res.json({
        error: "Cannot find query code.",
        queries: "/invite?code=<code>"
      })
    }else{
    fetch(`https://discord.com/api/v9/invites/` + req.query.code, {
      headers: {
        Authorization: "Bot YourBotToken"
      }
    }).then(a => a.json()).then(x => {
      if(x.code !== req.query.code){
      res.json({
        error: "Invalid invite code.",
        queries: "/invite?code=<code>"
      })  
      }else{
      res.json({
        code: x.code,
        guild: {
          id: x.guild.id,
          name: x.guild.name,
          splash: x.guild.splash,
          banner: x.guild.banner,
          description: x.guild.description,
          icon: x.guild.icon,
          features: x.guild.features,
          verification_level: x.guild.verification_level,
          vanity_url: x.guild.vanity_url_code,
          nsfw_level: x.guild.nsfw_level,
          boost_count: x.guild.premium_subscription_count
        },
        channel: {
          id: x.channel.id,
          name: x.channel.name,
          type: x.channel.type
        }
      })
      }
      })
    }
    })
app.listen(3000)