Source for [madeina2.com](http://www.madeina2.com/)

### Deploying to S3

Add an `aws.json` file in the root dir like this

```
{
	"key": "your-aws-key-goes-here",
	"secret": "your-aws-secret-goes-here",
	"bucket": "www.madeina2.com"
}
```

Then run

```
$ npm install
$ grunt deploy
```
