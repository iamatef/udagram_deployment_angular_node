## APP Diagram
Visitors visit the app from the S3 bucket holding the static front-end files after building the Angular APP, this front-end then connects to the backedn API which is a NodeJS App that we build and deply to an ElasticBeanstalk environment, an S3 bucked is used for storing media upladed by the APP users

![APP Diagram](https://i.imgur.com/mqi2lG8.png)

## Used AWS Resources

- One RDS database
- Two S3 Buckets
- One ElasticBeanstalk Environment

## Steps of installations
The first step is to create two buckets one for holding the front-end app and another for storing media 

## AWS resources installation

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



1. Create an Elastic beanstalk environmet for deploying the backend API
![BeansTalk environment](https://i.imgur.com/569t7lx.png)

```
cd udagram/udagram-api
eb init //to initiate the eb project
eb create //to create the environment
eb deploy //to deploy the current code to the created environment

```


### CircleCI

- Connect the repo to CircleCI and then visit the project options and set the Environment variables to allow AWS CLI and AWS EB installation and also variables that will be passed to the EB Environment

![](https://i.imgur.com/VZoGz6E.png)

- .circleci/config.yml contains all the steps for CircleCI to follow to build and deply the APP

![](https://i.imgur.com/DCs5LBL.png)

with every push to our repo, CircleCI will start the CI where it will automatically build and lint the code, if we approve, it will start the automated deployment