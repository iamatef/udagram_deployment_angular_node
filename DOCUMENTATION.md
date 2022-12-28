APP Docs

## APP Diagram
users visit the app from the S3 bucket holding the static front-end files after building the Angular APP, this front-end then connects to the backedn API which is a NodeJS App that we build and deply to an ElasticBeanstalk environment, an S3 bucked is used for storing media upladed by the APP users

![APP Diagram](https://i.imgur.com/mqi2lG8.png)

## Steps of installations
The first step is to create two buckets one for holding the front-end app and another for storing media 

## AWS resources

1.Create an RDS Database which the backend uses for storing and retriving the data, note the endpoint, the port, the username and the password

![deploy](https://i.imgur.com/PTMkprG.png)

 
1.Create Two S3 buckets, one for the front-end app deployment and another for media storage
![s3 buckets created](https://i.imgur.com/mqk2243.png)

set buckets for static site hosting and required policy was attached

```
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Principal": "*",
			"Action": [
				"s3:PutObject",
				"s3:PutObjectAcl",
				"s3:GetObject",
				"s3:GetObjectAcl",
				"s3:DeleteObject"
			],
			"Resource": [
				"arn:aws:s3:::udagram-api-media",
				"arn:aws:s3:::udagram-api-media/*"
			]
		}
	]
}
```

![s3 buckets created](https://i.imgur.com/qpzGTME.png)

Set CORS for media bucked to allow the front-end app to request aws and get image path

![cors enabled](https://i.imgur.com/il4y5IS.png)

```

[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://www.example2.com"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]

```



1. Elastic beanstalk environmet for deploying the backend API
![BeansTalk environment](https://i.imgur.com/569t7lx.png)

```
cd udagram/udagram-api
eb init //to initiate the eb project
eb create //to create the environment
eb deploy //to deploy the current code to the created environment

```

1. Set Environment variables for the project, list of these variables  are locate here  /udagram/udagram-api/src/config/README.md

![environment variables](https://i.imgur.com/Fr12Vfn.png)

these variables will be used by the APP to connect to the created RDS database and to store the images in the bucket for media
 

### CircleCI

- Connect the repo to CircleCI and then visit the project options and set the Environment variables to allow AWS CLI and AWS EB installation 

![](https://i.imgur.com/8n2spSn.png)

- .circleci/config.yml contains all the steps for CircleCI to follow to build and deply the APP

![](https://i.imgur.com/DCs5LBL.png)

with every push to our repo, CircleCI will start the CI where it will automatically build and lint the code, if we approve, it will start the automated deployment

- [Front end working app link](http://udagram-front.s3-website-us-east-1.amazonaws.com/) - Click to visit the APP!

- CI/CD Pipeline

![Pipeline](https://i.imgur.com/jDoZwSd.png)

- Build passed including lint

![build passed](https://i.imgur.com/DpHJN3a.png)


- Deploy success after approval

![deploy](https://i.imgur.com/6sQOy7f.png)



 
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