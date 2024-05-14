# shadeform-ta

## Backend

use node version in the nvmrc `18`. `nvm` can be used to manage node version

1. Install the modules

`npm install` 

2. setup the sqlite db.
   
`npx prisma migrate dev`

3. Add a Shadeform `API_KEY` env var to the `.env` file

Run the server

`npm run start:dev`

## Frontend

In another terminal

1. Install the modules

`npm i`

Run the app with

`npm run dev`

#### Pages

`/`: Dashboard to display instances
<br/>
`/create`: Create New Instance

### Notes:

Due to time constraints, I was not able to build a 1:1 match of the real Dashboard. For example the take home app doesn’t have filters and search. I also had to use some dummy data for the launch form. Styling is acceptable but also not as polished as I would like. I think regardless the app still showcases my technical skills and coding style.

#### Tech choices

#### Server/Database

I used a very popular nodejs framework for the API nestjs. Its a solid framework, with many large companies using it in production.

I went with sqlite for the db. I understand the task mentioned to use a data structure, but this would have required doing many workarounds as we would not be able to use the framework and ORM utilities and functionality.

It would have made building the API correctly more difficult and time consuming.

#### Shadcn

I went with the shadcn UI library for the styling. Shadcn is currently the most popular UI component library for tailwind. It makes building components easier because it allows you to copy paste the code directly into your codebase giving you complete control.
This is in contrast to the previous pattern of installing the library and importing components, then using overrides to customize it. This obviously feels more like a black box and gives you less control over the component.

#### Tanquery

For making api requests on the frontend, Im using Tanquery. This is a popular library for handling api requests and simplifies state management with api requests, such as offering state for loading and error states.
