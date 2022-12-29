# CircleCI Pipeline

This project repository is connected to circleci.com which will fire the build process for the project with every push to the repo master branch, once the build is successfull, the admin of the CircleCI account must approve for depoloyment. once approved, CircleCI will deply the code to AWS 

![pipeline](https://i.imgur.com/t1ApAoP.png)

## PipeLine installation
- Connect the repo to CircleCI and then visit the project options and set the Environment variables to allow AWS CLI and AWS EB installation 

![](https://i.imgur.com/8n2spSn.png)

- .circleci/config.yml contains all the steps for CircleCI to follow to build and deply the APP

![](https://i.imgur.com/DCs5LBL.png)

with every push to our repo, CircleCI will start the CI where it will automatically build and lint the code, if we approve, it will start the automated deployment


- CI/CD Pipeline

![Pipeline](https://i.imgur.com/jDoZwSd.png)

- Build passed including lint

![build passed](https://i.imgur.com/DpHJN3a.png)

- Deploy success after approval

![deploy](https://i.imgur.com/6sQOy7f.png)

## .circleci/config.yml

This file contains the setup for the CirceleCI including the orbs, build and deply jobs, it also contains instructions and order of each step including holding for user approval after successfull build 

### orbs

Environment setup with nodeJS, EB console and AWS CLI console

```
node: circleci/node@5.0.2
eb: circleci/aws-elastic-beanstalk@2.0.1
aws-cli: circleci/aws-cli@3.1.1
```

### jobs

Pipeline has two jobs which are build and deply 

#### build steps 

Build jobs takes care of building the frontend app and also the backend API and make sure the lint works and the build is successfull

- Install Front-End Dependencies
- Lint the frontend
- Build the frontend app
- Build the backend API      

#### deploy steps

Deploy steps takes care of deploying the code after admin approval

- Frontend deploy which uploads the code to S3
- API deply which deploy to ElasticBeanstalk and set the environment variables

### jobs WorkFlow

The build is initiated once the push is made to the master branch. if build is successfull it waits for the hold user approval
. if approved, deploy gets fired 