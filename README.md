# adonis-graphql-server

A GraphQL server built with Apollo server and AdonisJs

## Getting Started

Clone the project repository by running the command below if you use SSH

```bash
git clone git@github.com:ammezie/adonis-graphql-server.git
```

If you use https, use this instead

```bash
git clone https://github.com/ammezie/adonis-graphql-server.git
```

## Setup

Run the command below to install dependencies

```bash
npm install
```

### Environment variables

Duplicate `.env.example` and rename it `.env`

### Migrations

Setup your database and enter the following in `.env`

```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_DATABASE=adonis_graphql_server
DB_USER=root
DB_PASSWORD=
```

Run the following command to run migration.

```bash
adonis migration:run
```

Finally, start the application:

```bash
adonis serve --dev
```

and visit [http://127.0.0.1:3333](http://127.0.0.1:3333) to see the application in action.

## Seed Database
`database/development.sqlite` is configured & included by default.
It's easy to download drivers for other DBs, such as MySQL or PgSQL
For a new database, you can create the user `admin@example.org` for the examples below, by
```bash
adonis seed
```

To scrape SPDR data into the database, add the following into a cron job:
```bash
cd spdr # wherever your project directory lives
node ace scrape
node ace insert
```

## Examples
Try [http://127.0.0.1:3333/graphiql](http://127.0.0.1:3333/graphiql)
* `query{user(id:1){email}}`
* `query{allUsers{id, email}}`
* `query{allHoldings{ticker,name,weight,sector,created_at}}`
* `query{holding(created_at:"2020-02-02", ticker:"GOOGL"){ticker,name,weight,sector,created_at}}`
* `mutation{login(email:"admin@example.org", password:"password")}`
* `mutation{createUser(email:"admin@example.org", password:"password"){user}}`

### Advanced Example:
Querying Holdings requires a valid JWT token.
Get the token:
Open [http://127.0.0.1:3333/graphiql](http://127.0.0.1:3333/graphiql)
In the left, query side, enter
`mutation{login(email:"admin@example.org", password:"password")}`
Run the query by pressing the (>) button
Copy the token from the right hand results side:
{
  "data": {
    "login": "**grab-this-token**"
  }
}

Download and install the free Insomnia app, a variant of Postman, Postwoman, etc. Currently, I've not been able to get GraphiQL nor GraphQL Playground to work with JWT, but these may improve their Developer eXperience in the future.

In Insomnia, create a new workspace, as needed. Set the top to
** POST http://127.0.0.1:3333/graphql/ **

Set the first tab to **GraphQL**
  ` query{allHoldings{ticker,name,weight,sector,created_at}} `
Set the second second, Auth tab to **Bearer**
  *** Paste the JWT token here ***
Set the fourth, Header tab with
  ` Content-Type application/json `

Click **Send**
To test that JWT auth works, you can uncheck the `ENABLED` box
 