# Hosting a Full-Stack Application

This project contains the code to deploy a full stack application, it contains the front-end angular code that we will build and deply to Amazon S3. It also contains the backend nodeJS API written in TypeScript linted with ESlint which we will build, lint and deploy to Amazon ElasticBeanstalk

The main purpose is to build, lint and deploy the front-end and the backend using [CirlcleCI](https://circleci.com) so this repo is connected to CircleCI which will build and lint the code with every push to this repo 

Manual approval is still needed for CircleCI according to our config!

![Working APP](https://i.imgur.com/PwO9JHB.png)


## Working APP link and CircleCI screenshots

- [Front end working app link](http://udagram-front.s3-website-us-east-1.amazonaws.com/) - Click to visit the APP!

- CI/CD Pipeline

![Pipeline](https://i.imgur.com/jDoZwSd.png)

- Build passed including lint

![build passed](https://i.imgur.com/DpHJN3a.png)


- Deploy success after approval

![deploy](https://i.imgur.com/6sQOy7f.png)

## AWS resources

1. RDS Database which the backend uses for storing and retriving the data

![deploy](https://i.imgur.com/PTMkprG.png)

2. Two S3 buckets, one for the front-end app deployment and another for media storage
![s3 buckets created](https://i.imgur.com/mqk2243.png)

  
3. Elastic beanstalk environmet for deploying the backend API
![BeansTalk environment](https://i.imgur.com/569t7lx.png)

 
### Dependencies

```
- Node v16.2.0 (LTS) or more recent. While older versions can work it is advisable to keep node to latest LTS version

- npm 6.14.8 (LTS) or more recent, Yarn can work but was not tested for this project

- AWS CLI v2, v1 can work but was not tested for this project

- A RDS database running Postgres.

- A S3 bucket for hosting uploaded pictures.

- ElasticBeans talk for deployment of the API

```

### Installation

Provision the necessary AWS services needed for running the application:

1. In AWS, provision a publicly available RDS database running Postgres then note the endpoint, username and password
1. In AWS, provision a s3 bucket for hosting the uploaded files and another for hosting the front-end both should have public access enabled.  
1. set ENV variables needed including the database endpoint,username,password and the bucket name and the bucket region
1. From the root of the repo, navigate udagram-api folder `cd starter/udagram-api` to install the node_modules `npm install`. After installation is done start the api in dev mode with `npm run dev`.
1. Without closing the terminal in step 1, navigate to the udagram-frontend `cd starter/udagram-frontend` to intall the node_modules `npm install`. After installation is done start the api in dev mode with `npm run start`.