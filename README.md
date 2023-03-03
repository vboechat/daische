# Daische

![Image with Daische Logo](./public/daische-logo.png "Daische Logo")

## What is Daische?
Daische is a daily scheduler where you can organize your daily tasks. <br />
It has been developed using Next.js, React, TypeScript, MariaDB and NextAuth and
was deployed using Vercel for the web application and PlanetScale for the database.

## Demo
The current version of Daische is available at Vercel and can be accessed at the following link: [Daische Demo](https://daische.vercel.app/)

## Run locally
To run Daische locally, you need to have Node.js installed on your machine. <br />
If you meet this requirement, follow the steps below:

1. Clone the repository
2. Install the dependencies using `yarn`
3. Rename the `.env.example` file to `.env` and fill in the environment variables
4. Run the application using `yarn dev`
5. Check your console for the URL where the application is running, and you're done!

## Contributing
Thank you for your interest in contributing to Daische! <br />
Steps to contribute:

1. Fork the repository and clone it
2. Create a new branch using the following pattern: `<type>/<description>`
3. Make and commit your changes
4. Push your changes to your fork
5. Create a pull request

## Roadmap
You can check the project roadmap here: [Daische Roadmap](https://github.com/users/vboechat/projects/9)

## Documentation
You can check the documentation here: [Daische Documentation](https://github.com/vboechat/daische/tree/master/docs)

## Environment Variables
The following environment variables are necessary for the application to run:

| Environment name     | Description                         |
|----------------------|-------------------------------------|
| DATABASE_URL         | Your MySQL / MariaDB database URL   |
| NEXTAUTH_URL         | Your website URL                    |
| NEXTAUTH_SECRET      | Used to encrypt NextAuth JWT        |
| GOOGLE_CLIENT_ID     | Your Google oAuth 2.0 client ID     |
| GOOGLE_CLIENT_SECRET | Your Google oAuth 2.0 client Secret |

## License
This project is licensed under the [MIT LICENSE](https://choosealicense.com/licenses/mit/)
