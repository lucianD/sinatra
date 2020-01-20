# myapp.rb
require 'sinatra'
require 'json'

set :port, 8080
set :static, true
set :public_folder, "static"
set :views, "views"

get '/' do
  'Hello world!'
end

get '/api/data' do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
    file = File.read('data.json')
    data_hash = JSON.parse(file)
    JSON data_hash['sports']
end

get '/hello/' do
    greeting = params[:greeting] || "Hi There"
    erb :index, :locals => {'greeting' => greeting}
end