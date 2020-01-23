require './helper/array_pos'
require './models/event'
require './models/sport'

# Will hold data manipulation regarding the sports
class SportService
  # method gets the json dump and returns a sorted array by pos of Sport objects
  def self.parseSimpleSportsList(data)
    sportsArray = ArrayPos.new
    data['sports'].each do |current|
      thisSport = Sport.new(current['id'], current['desc'], current['pos'])
      sportsArray.add(thisSport)
    end
    sportsArray
  end
  # method gets the json dump and an id returns a sorted array by pos of Event objects
  def self.parseSportById(data, id)
    sportsArray = ArrayPos.new
    selectedSport = data['sports'].select { |sport| sport['id'].to_s == id.to_s }[0]
    events = ArrayPos.new
    selectedSport['comp'].each do |comp|
      comp['events'].each do |event|
          events.add(Event.new(event['id'], event['desc'], event['pos'], event['event_type'], comp['desc']))
      end
    end
    events
  end

  # implementing to_json in order to be able to send object to front-end as JSON
  def to_json
    {'id' => @id, 'desc' => @desc, 'pos' => @pos}
  end
end