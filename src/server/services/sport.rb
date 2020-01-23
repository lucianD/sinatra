require './helper/array_sorted_by_pos'
require './helper/json_reader'
require './models/event'
require './models/sport'

# Will hold data manipulation regarding the sports
class SportService
    # reading the json
    @@data_hash = JsonReader.fetch()
  # method gets the json dump and returns a sorted array by pos of Sport objects
  def self.parseSimpleSportsList()
    sportsArray = ArraySortedByPos.new
    @@data_hash['sports'].each do |current|
      thisSport = Sport.new(current['id'], current['desc'], current['pos'])
      sportsArray.add(thisSport)
    end
    sportsArray
  end

  # method gets the json dump and an id returns a sorted array by pos of Event objects
  def self.parseSportById(id)
    sportsArray = ArraySortedByPos.new
    # we need to pick the only sport of interest by id
    selectedSport = @@data_hash['sports'].select { |sport| sport['id'].to_s == id.to_s }[0]
    events = ArraySortedByPos.new
    # safely check if "comp" key exists then iterate
    selectedSport.key?('comp') && selectedSport['comp'].each do |comp|
      # safely check if "events" key exists then iterate
      comp.key?('events') && comp['events'].each do |event|
          events.add(Event.new(event['id'], event['desc'], event['pos'], event['event_type'], comp['desc'], id))
      end
    end
    events
  end

  # implementing to_json in order to be able to send object to front-end as JSON
  def to_json
    {'id' => @id, 'desc' => @desc, 'pos' => @pos}
  end
end