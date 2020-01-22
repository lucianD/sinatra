# myapp.rb
require 'sinatra'
require 'json'
require './models/sport'
require './models/event'
require './services/sport'
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
sportsArray = nil
get '/api/sports' do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'

    if sportsArray
        JSON sportsArray.arr
    else
        sportsArray = SportService.parseSimpleSportsList(data_hash)
    end
    JSON sportsArray.arr
end

get '/api/sports/:id' do |id|
    headers 'Access-Control-Allow-Origin' => 'http://localhost:3000'
    if sportsArray
#         sportById = sportsArray.arr.select { |sport| sport['id'].to_s == id.to_s }
        events = SportService.parseSportById(data_hash, id)

#         events = ArrayPos.new
#         comps = data_hash['sports']['comp'];
#         comps.each do |current|
#           current['events'] do |event|
#             thisSport = Event.new(event['id'], event['desc'], event['pos'], event['event_type'], event['sport_id'])
#             events.add(thisSport)
#           end
#         end
        JSON events.arr
    end
end

# get '/hello/' do
#     greeting = params[:greeting] || "Hi There"
#     erb :index, :locals => {'greeting' => greeting}
# end