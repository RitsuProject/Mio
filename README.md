<h1 align="center">Mio</h1>

<p align="center">📡 Ritsu Images and Themes MicroService</p>

<p align="center">
<img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
<a href="https://discord.gg/XuDysZg"><img src="https://discordapp.com/api/guilds/764929033723969567/widget.png"></a>
<a href="https://ritsu.sazz.fail"><img alt="website" src="https://img.shields.io/badge/website-Ritsu-ff3860"></a>
<img alt="code quality" src="https://www.code-inspector.com/project/16601/status/svg"></a>
<br>
</p>

Ritsu MicroService that generates images like the answer card and serves as a proxy for AnimeThemes and Openings.moe so that we can use them with the same response!

## Contributing or Self-Hosting.

Do you want to contribute to the Mio source code? Add new features or even fix a bug?

### Bugs

Did you find a bug? Feel free to open an issue and describe the bug (try to give as much information as possible), if you have any questions, enter the support server above and feel free to ask!

### Writing code

Want to add new things to Ritsu? First, know that Ritsu is extremely simple, the bot ecosystem doesn't have much of a secret, so once you open it you should understand how everything works (just to be clear, Ritsu is made in Javascript). If you have an idea, please open an issue first and describe it, so we can stay tuned. Don't have an idea? We are always adding new things to do in the Issue, comment saying that you will do it and now it's just fork, clone on your computer and when you're done open a pull request!

### Discussion and Planning

Want to discuss an idea? Join to the support server and feel free to say your opinion! We always create a small project on github with issues that should go to the next update, feel free to take a look [here](https://github.com/orgs/RitsuProject/projects) too!

### Translate Ritsu!

Is it not available in your language? You can easily translate it using Crowdin, enter the project and mention me (sazz # 0002) on the support server, so you will win a fancy translator role.

https://crowdin.com/project/ritsu

### Self-Hosting

**We do not recommend you to self-host the MicroService yourself, unless it is to contribute to the code, but if you still want to, study the ecosystem and be on your own, it is not difficult, we will not give support you if not to contribute to the code or learn something from Ritsu.**

- Fork the project and clone to your computer.

#### .env Structure

```ascii
.env
└── MONGOURI
    ├── The URL of your MongoDB database that Ritsu will use.
└── API_KEY
    ├── Default API_KEY used in restricted endpoints.
└── PORT
    ├── The port to listen on, if not specified, Mio will listen in 3001.
```

#### Starting Ritsu

```
yarn start (or npm start)

(FOR DEVELOPMENT ENVIROMENT)
yarn dev (or npm dev)
```

### Branch's

- `Main` - It is **just** to release the final code to Mio, all that is in it is what is currently running in production.

## Credits

If it weren't for them, maybe Ritsu wouldn't even exist (or development would be much more complicated).

> https://animethemes.moe -> For providing the themes for the bot to play.

> https://openings.moe -> For providing the themes for the bot to play.
