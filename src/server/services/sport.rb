require './helper/array_pos'
require './models/event'

# Will hold data manipulation regarding the sports
class SportService

  def self.parseSimpleSportsList(data)
    sportsArray = ArrayPos.new
    data['sports'].each do |current|
      thisSport = Sport.new(current['id'], current['desc'], current['pos'])
      sportsArray.add(thisSport)
    end
    sportsArray
  end

  def self.parseSportById(data, id)
    sportsArray = ArrayPos.new
    selectedSport = data['sports'].select { |sport| sport['id'].to_s == id.to_s }[0]
#     puts selectedSport.inspect
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