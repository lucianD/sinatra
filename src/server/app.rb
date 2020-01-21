# myapp.rb
require 'sinatra'
require 'json'
require './models/sports'
require './helper/array_pos'

set :port, 8080
set :static, true
set :public_folder, "static"
set :views, "views"

get '/' do
  'Hello world!'
end

file = File.read('data.json')
data_hash = JSON.parse(file)

# get '/api/data' do
#     headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
#     JSON data_hash['sports']
# end

# gets all the sports sorted by pos
get '/api/sports' do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
    sportsArray = ArrayPos.new
    data_hash['sports'].each do |current|
      thisSport = Sports.new(current['id'], current['desc'], current['pos'])
      sportsArray.add(thisSport)
      puts thisSport.printYourself
    end
    JSON sportsArray.arr
end

get '/api/sports/:id' do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
    JSON data_hash['sports']
end

# get '/hello/' do
#     greeting = params[:greeting] || "Hi There"
#     erb :index, :locals => {'greeting' => greeting}
# end