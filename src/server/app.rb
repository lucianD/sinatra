require 'sinatra/base'
require './services/sport'
require './helpers/array_sorted_by_pos'
require './helpers/error_handler'

class ApplicationController < Sinatra::Base
    # in memory cached object
    @@sportsArray = nil

    before do
        headers 'Access-Control-Allow-Origin' => '*'
    end

    get '/api/sports' do
      begin
          if @@sportsArray
              # if the object is already defined it means it has been already loaded
              JSON @@sportsArray.arr
          else
              # else it means this is the first request and we need to parse the json
              @@sportsArray = SportService.parseSimpleSportsList()
          end
          JSON @@sportsArray.arr
      rescue StandardError => e
          status 400
          response = ErrorHandler.handle(e, '/api/sports')
          JSON response
      end
    end

    # gets a list of events for a sport
    get '/api/sports/:id' do |id|
      begin
          events = SportService.parseSportById(id)
          JSON events.arr
      rescue StandardError => e
          status 400
          response = ErrorHandler.handle(e, "/api/sports/#{id}")
          JSON response
      end
    end

    # gets the outcomes of a particular event
    get '/api/sports/:sport_id/events/:event_id' do |sport_id, event_id|
      begin
#       TODO implement the service method for this
          return SportService.getOutcomeForEvent(sport_id, event_id)
      rescue StandardError => e
          status 400
          response = ErrorHandler.handle(e, "/api/sports/#{sport_id}/events/#{event_id}")
          JSON response
      end
    end

    # 500 handler
    error StandardError do
        status 500
        content_type :json
        return '{"error": "Internal server error", "code": 500}'
    end

    not_found do
        status 404
        content_type :json
        return '{"error": "Page not found", "code": 404}'
    end
end
## gets all the sports sorted by pos