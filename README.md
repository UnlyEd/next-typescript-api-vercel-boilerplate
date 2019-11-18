# Next.js with TypeScript, powered by Zeit Now for building APIs

> This directory is a more detailed example of a [Next.js](https://nextjs.org) app that can be deployed with ZEIT Now and zero configuration.
>
> **It is focused on backend development** (APIs), yet uses Next.js framework (universal framework) in case rendering UI becomes necessary later on.
>
> It uses Sentry for tracking errors that happens on the server, but feel free to use another tool, it's merely used as an example.

<!-- toc -->

- [Deploy Your Own project (ultimate quick start)](#deploy-your-own-project-ultimate-quick-start)
- [Clone this boilerplate](#clone-this-boilerplate)
- [TODO (after generating a project from this boilerplate)](#todo-after-generating-a-project-from-this-boilerplate)
- [Getting started](#getting-started)
- [Deploying From Your Terminal](#deploying-from-your-terminal)
- [Deploying through Zeit <> GitHub CI/CD (official way, not recommended)](#deploying-through-zeit--github-cicd-official-way-not-recommended)
- [Deploying through Zeit <> GitHub Actions CI/CD (our way)](#deploying-through-zeit--github-actions-cicd-our-way)
- [API](#api)
- [Test](#test)
- [CodeClimate](#codeclimate)
- [EsLint](#eslint)
- [Sentry](#sentry)
  * [Configuring secret SENTRY_DSN in Zeit](#configuring-secret-sentry_dsn-in-zeit)

<!-- tocstop -->

## Deploy Your Own project (ultimate quick start)

Deploy your own Next.js project based on this template with ZEIT Now. ([free](https://zeit.co/pricing))

[![Deploy with ZEIT Now](https://zeit.co/button)](https://zeit.co/new/project?template=https://github.com/UnlyEd/next-typescript-api-zeit-boilerplate)

**Pro tip**: If you allow Zeit to access your GitHub account, it will even create the GitHub repository for you and automatically link it to your Zeit project and enable Zeit <> GitHub integration (automated CI/CD). 
**[Though, beware this](#deploying-through-zeit--github-cicd-official-way-not-recommended).**

_Live Example: [https://next-typescript-api-zeit-boilerplate.unly.now.sh/](https://next-typescript-api-zeit-boilerplate.unly.now.sh/)_

**Play around with the API:**
- [`/status` with metadata](https://next-typescript-api-zeit-boilerplate.unly.now.sh/api/status)
- [`/date` used by the frontend](https://next-typescript-api-zeit-boilerplate.unly.now.sh/api/data)
- [`/error` to test your Sentry integration](https://next-typescript-api-zeit-boilerplate.unly.now.sh/api/error)

---

## Clone this boilerplate

See [instructions](../../README.md#usage)

## TODO (after generating a project from this boilerplate)

- Duplicate `.env.build.example` into `.env.build`
- Define your `SENTRY_DSN` in `.env.build`, if not set then errors won't be sent to Sentry (but the app will run fine) - See [Configuring secret SENTRY_DSN in Zeit](#configuring-secret-sentry_dsn-in-zeit)
- Delete this section

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

You can deploy your new Next.js project with a single command from your terminal using [Now CLI](https://zeit.co/download):

```shell
yarn deploy # Deploy a staging/preview deployment (use now.staging.json)
yarn deploy:production # Deploy a production deployment (use now.production.json)
```

---

## Deploying through Zeit <> GitHub CI/CD (official way, not recommended)

If you link your GitHub repository to a Zeit project, you'll benefit from automated CI/CD.

Every time you push something to the GitHub remote, it'll get deployed.

> **N.B: Be careful about when you merge a branch into the `master` branch though, as it will automatically deploy the `now.staging.json` configuration and not the production!**

Due to this reason, we recommend to disable the GitHub integration for your Zeit project, **if you need to deploy a different configuration based on the stage**.
Zeit Now does not allow any kind of configuration to customise this behaviour at this time, it will therefore always deploy CI/CD using the `now.json` configuration **(which is a symbolic link to `now.staging.json`)**

## Deploying through Zeit <> GitHub Actions CI/CD (our way)

> Because we believe only very simple projects/POC can rely on the same staging/production configuration, we've built our own Zeit <> GitHub Actions integration.

And we encourage you to rather take advantage of [it](./.github/workflows).

To make it work, you need to:
- Disable Zeit <> GitHub integration (just opt-out from it from your Zeit project's page)
- Generate a Zeit personal token and add it to GitHub secrets
    1. Go to your **[personal settings](https://zeit.co/account/tokens)** *(not your team's!)*
    1. Create a new token, I usually name it `GitHub Actions`
    1. Go to your GitHub project's settings page then `Secrets`, would be `https://github.com/UnlyEd/boilerplates-generator/settings/secrets` for this project
    1. Add the new secret, named `ZEIT_TOKEN` (the same as the one in your)

---

## API

This project aims at providing a quick start with TypeScript and focused on the API abilities.

The API lives at [src/pages/api](./src/pages/api). The boilerplate comes with few files and test to showcase how it can be done.

The paths are automatically linked to the filesystem, read 

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

### Configuring secret SENTRY_DSN in Zeit

In order to allow Zeit to access your SENTRY_DSN sensitive key, we use [Now secrets](https://zeit.co/docs/v2/environment-variables-and-secrets).

- `now secrets add sentry-dsn YOUR_DSN`

This ensures the secrets is not git-tracked if you consider it's too sensitive. We recommend using secrets for all sensitive information.

**N.B**: You still need to have it in your `.env.build` file for local development. _(yeah, that sucks)_
