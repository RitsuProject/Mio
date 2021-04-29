<h1 align="center">Mio</h1>

<p align="center">📡 Backend responsible for handle themes from services like AnimeThemes and Opening.moe for Ritsu and more!</p>

## How to Run

- Fork the project and clone to your computer.

- Set the environment variables in `.env` as described below.

- Run `yarn dev` for the development environment or `yarn start` to the production environment

#### .env Structure

```ascii
.env
└── MONGOURI
    ├── The URL of your MongoDB database that Ritsu will use.
└── PORT
    ├── The port to listen on, if not specified, Mio will listen in 3001.
```

### Branch's

- `main` - It is **just** to release the final code to Mio, all that is in it is what is currently running in production.
