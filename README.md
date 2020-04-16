# Client Dashboard
An application which provides Information about Company, Employee, Partner Company, Contractor and Client and supports users on customizing data. It is converted from Ruby on Rails project to Single Page Application using React as FrontEnd Library and Ruby on Rails as a RESTful APIs.

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing
Clone git repository and run bundle install:
```
$ git clone git@github.com:nicosticht/client_dashboard.git
$ bundle install
```

Set up the database:

```
$ rails db:setup
```

Run the rails server:

```
$ rails s
```

## Running the tests

To run the tests execute following statement:

```
$ bundle exec rake
```


## Create Backend part: API directory

Add following gems into Gemfile then run `bundle install`
```
gem 'grape'
gem 'grape-entity'
```
Grape helps building RESTful APIs while grape-entity support building entity for presenting objects. More information can be found at [Grape](https://github.com/ruby-grape/grape) and [Grape entity ](https://github.com/ruby-grape/grape-entity).

To check the routes from api, you should install grape_on_rails_routes.
```
gem 'grape_on_rails_routes'
```
Run `rake grape:routes` to see the Api Routes


## Create Frontend part: React
We can separate Frontend and Backend into two projects and run independently. However, the project creates Frontend along with Backend in only one repository using support gems.

```
gem 'webpacker'
gem 'react-rails'
gem 'rack-cors'
```
`react-rails` and `webpacker` will help build a javascript directory containing React component. Also, we can render inside of erb file.
`rack-cors` is stetup to allow CORS when we call API with our configured URL.

## Deploy on heroku
Please make sure that you already have heroku cli in your console. If not, following [The Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

Remember to add pg gem into production environment because heroku cannot work with sqlite.
```
group :production do
   gem 'pg'
end
```

Create a heroku app
`heroku create`
Deploy master code from our repository to heroku
`git push heroku master`
Update DB schema
`heroku run rake db:migrate`
Generate data
`heroku run rake db:seed`

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details


