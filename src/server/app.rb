require 'sinatra'
require './services/sport'
require './helper/array_pos'
require './helper/json_reader'

set :port, 8080
set :static, true
set :public_folder, "static"
set :views, "views"

get '/' do
  'Hello world!'
end

# reading the json
data_hash = JsonReader.fetch()

# in memory object
sportsArray = nil

## gets all the sports sorted by pos
get '/api/sports' do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
    begin
        if sportsArray
            # if the object is already defined it means it has been already loaded
            JSON sportsArray.arr
        else
            # else it means this is the first request and we need to parse the json
            sportsArray = SportService.parseSimpleSportsList(data_hash)
        end
    rescue
        status 400
        error = { 'error' => 'Something bad happened' }
        JSON error
    else
        JSON sportsArray.arr
    end
end

get '/api/sports/:id' do |id|
    begin
        headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
        events = SportService.parseSportById(data_hash, id)
        JSON events.arr
    rescue
        status 400
        error = { 'error' => 'Something bad happened' }
        JSON error
    else
        JSON events.arr
    end
end