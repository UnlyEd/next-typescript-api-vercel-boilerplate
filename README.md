<a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" align="right" height="20" alt="Unly logo" title="Unly logo" /></a>
[![Maintainability](https://api.codeclimate.com/v1/badges/8eb12b795ca757dbc07d/maintainability)](https://codeclimate.com/github/UnlyEd/next-typescript-api-vercel-boilerplate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/8eb12b795ca757dbc07d/test_coverage)](https://codeclimate.com/github/UnlyEd/next-typescript-api-vercel-boilerplate/test_coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/UnlyEd/next-typescript-api-vercel-boilerplate/badge.svg?targetFile=package.json)](https://snyk.io/test/github/UnlyEd/next-typescript-api-vercel-boilerplate?targetFile=package.json)

# Next.js with TypeScript, powered by Vercel Now for building APIs

> This is a more detailed example of a universal [Next.js](https://nextjs.org) app that can be deployed with Vercel and zero configuration.
>
> **The default configuration is focused on backend development** (APIs), yet uses Next.js framework (universal framework) in case rendering UI becomes necessary later on.
> **But you can use this to quick start a frontend + backend project as well.** _(we will release another OSS boilerplate with a very complete boilerplate for a rock-solid production app with Next/Vercel/TypeScript before 2020!)_
>
> This boilerplate uses Sentry for tracking errors that happens on the server, but feel free to use another tool, it's merely used as an example.

## Other alternatives

> **We released in February 2020 our ["Next Right Now" boilerplate](https://github.com/UnlyEd/next-right-now), which is similar to this project, except it is a universal/isomorphic boilerplate that isn't solely focused on the backend/api, unlike this one.** Make sure to check it out!


---

<!-- toc -->

- [Deploy Your Own project (ultimate quick start)](#deploy-your-own-project-ultimate-quick-start)
- [TODO (after generating a project from this boilerplate)](#todo-after-generating-a-project-from-this-boilerplate)
- [Getting started](#getting-started)
- [Deploying From Your Terminal](#deploying-from-your-terminal)
- [Deploying through Vercel <> GitHub CI/CD (official way, not recommended)](#deploying-through-vercel--github-cicd-official-way-not-recommended)
- [Deploying through Vercel <> GitHub Actions CI/CD (our way)](#deploying-through-vercel--github-actions-cicd-our-way)
- [API](#api)
- [Test](#test)
- [CodeClimate](#codeclimate)
- [EsLint](#eslint)
- [Sentry](#sentry)
  * [Configuring secret SENTRY_DSN in Vercel](#configuring-secret-sentry_dsn-in-vercel)
- [Vulnerability disclosure](#vulnerability-disclosure)
- [Contributors and maintainers](#contributors-and-maintainers)
- [**[ABOUT UNLY]**](#about-unly-)

<!-- tocstop -->

## Deploy Your Own project (ultimate quick start)

Deploy your own Next.js project based on this template with Vercel. ([free](https://vercel.com/pricing))

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/project?template=https://github.com/UnlyEd/next-typescript-api-vercel-boilerplate)

**Pro tip**: If you allow Vercel to access your GitHub account, it will even create the GitHub repository for you and automatically link it to your Vercel project and enable Vercel <> GitHub integration (automated CI/CD).
**[Though, beware this](#deploying-through-vercel--github-cicd-official-way-not-recommended).**

_Live Example: [https://next-typescript-api-vercel-boilerplate.unly.now.sh/](https://next-typescript-api-vercel-boilerplate.unly.now.sh/)_

**Play around with the API:**
- [`/status` with metadata](https://next-typescript-api-vercel-boilerplate.unly.now.sh/api/status)
- [`/date` used by the frontend](https://next-typescript-api-vercel-boilerplate.unly.now.sh/api/date)
- [`/error` to test your Sentry integration](https://next-typescript-api-vercel-boilerplate.unly.now.sh/api/error)


## TODO (after generating a project from this boilerplate)

- Duplicate `.env.build.example` into `.env.build`
- Define your `SENTRY_DSN` in `.env.build`, if not set then errors won't be sent to Sentry (but the app will run fine) - See [Configuring secret SENTRY_DSN in Vercel](#configuring-secret-sentry_dsn-in-vercel)

## Getting started

Install:

```
yarn install
```

Start the project locally:

```
yarn start
```

Go to [`http://localhost:9999`](http://localhost:9999) once running.

---

## Deploying From Your Terminal

You can deploy your new Next.js project with a single command from your terminal using [Now CLI](https://vercel.com/download):

```shell
yarn deploy # Deploy a staging/preview deployment (use now.staging.json)
yarn deploy:production # Deploy a production deployment (use now.production.json)
```

---

## Deploying through Vercel <> GitHub CI/CD (official way, not recommended)

If you link your GitHub repository to a Vercel project, you'll benefit from automated CI/CD.

Every time you push something to the GitHub remote, it'll get deployed.

> **N.B: Be careful about when you merge a branch into the `master` branch though, as it will automatically deploy the `now.staging.json` configuration and not the production!**

Due to this reason, we recommend to disable the GitHub integration for your Vercel project, **if you need to deploy a different configuration based on the stage**.
Vercel does not allow any kind of configuration to customise this behaviour at this time, it will therefore always deploy CI/CD using the `now.json` configuration **(which is a symbolic link to `now.staging.json`)**

## Deploying through Vercel <> GitHub Actions CI/CD (our way)

> Because we believe only very simple projects/POC can rely on the same staging/production configuration, we've built our own Vercel <> GitHub Actions integration.

And we encourage you to rather take advantage of [it](./.github/workflows).

To make it work, you need to:
- Disable Vercel <> GitHub integration (just opt-out from it from your Vercel project's page)
- Generate a Vercel personal token and add it to GitHub secrets
    1. Go to your **[personal settings](https://vercel.com/account/tokens)** *(not your team's!)*
    1. Create a new token, I usually name it `GitHub Actions`
    1. Go to your GitHub project's settings page then `Secrets`, would be `https://github.com/UnlyEd/boilerplates-generator/settings/secrets` for this project
    1. Add the new secret, named `ZEIT_TOKEN` (the same as the one in your)

---

## API

This project aims at providing a quick start with TypeScript and focused on the API abilities.

The API lives at [src/pages/api](./src/pages/api). The boilerplate comes with few files and test to showcase how it can be done.

The paths are automatically linked to the filesystem, read [https://nextjs.org/docs#dynamic-routing](https://nextjs.org/docs#dynamic-routing).

---

## Test

Test are compatible with TypeScript and TSX files (`.tsx`) used for React components

```
yarn test # Watch mode, for development
yarn test:once # Useful for CI integration
yarn test:coverage
```

---

## CodeClimate

This boilerplate comes with a Code Climate [configuration](.codeclimate.yml). We recommend using it for OSS projects, as it's free in this case.

You will need to manually [register your project to Code Climate](https://codeclimate.com/dashboard) (Quality, not Velocity), until then it'll have no effect.

There are many things CC does for you, one of them is check that the license you use are OSS, for instance. (kinda handy, even if it gets mistaken sometimes)


---

## EsLint

This boilerplate comes with an ESLint [configuration](.eslintrc.yml). Feel free to change the rules at your convenience,
but it was difficult to make it work with TypeScript so we recommend keeping it around even if you don't use it immediately.

```
yarn lint # Watch mode, for development
yarn lint:once # Useful for CI integration
yarn lint:fix # Auto fix of rules - Pro tip: Commit your changes before doing that, that can be nasty
yarn lint:fix:preview # Handy for previewing the result of the auto fix, but not apply it
```


---

## Sentry

This boilerplate comes with [Sentry](https://sentry.io/) reporting, very handy.

Sentry works for both server and browser usage, the boilerplate comes with basic meta data tracking for debugging purposes.

We usually link Sentry to our Slack channels to get notifications in real time about what's wrong on our production environment.

Feel free to replace it by another similar tooling of your choice!

You'll need to provide your `SENTRY_DSN` in `.env.build` file. You can get it at https://sentry.io/settings/unly/projects/YOUR_PROJECT/keys/

### Configuring secret SENTRY_DSN in Vercel

In order to allow Vercel to access your SENTRY_DSN sensitive key, we use [Now secrets](https://vercel.com/docs/v2/environment-variables-and-secrets).

- `now secrets add ntazb-sentry-dsn YOUR_DSN`

This ensures this secret is not git-tracked if you consider it's too sensitive.
We recommend using secrets for all sensitive information.

**N.B**: You still need to have it in your `.env.build` file for local development. _(yeah, that sucks)_

# Vulnerability disclosure

[See our policy](https://github.com/UnlyEd/Unly).

---

# Contributors and maintainers

This project is being maintained by:
- [Unly] Ambroise Dhenain ([Vadorequest](https://github.com/vadorequest)) **(active)**

---

# **[ABOUT UNLY]** <a href="https://unly.org"><img src="https://storage.googleapis.com/unly/images/ICON_UNLY.png" height="40" align="right" alt="Unly logo" title="Unly logo" /></a>

> [Unly](https://unly.org) is a socially responsible company, fighting inequality and facilitating access to higher education.
> Unly is committed to making education more inclusive, through responsible funding for students.
We provide technological solutions to help students find the necessary funding for their studies.

We proudly participate in many TechForGood initiatives. To support and learn more about our actions to make education accessible, visit :
- https://twitter.com/UnlyEd
- https://www.facebook.com/UnlyEd/
- https://www.linkedin.com/company/unly
- [Interested to work with us?](https://jobs.zenploy.io/unly/about)

Tech tips and tricks from our CTO on our [Medium page](https://medium.com/unly-org/tech/home)!

#TECHFORGOOD #EDUCATIONFORALL
