require './helpers/array_sorted_by_pos'
require './helpers/json_reader'
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

   # method gets the json dump and an id returns a sorted array by pos of Event objects
    def self.getOutcomeForEvent(sport_id, event_id)
      # we need to pick the only sport of interest by id
      selectedSport = @@data_hash['sports'].select { |sport| sport['id'].to_s == sport_id.to_s }[0]
      event = nil
      # we then iterate within the comp array
      selectedSport.key?('comp') && selectedSport['comp'].each do |comp|
        # we pick the desired event
        event = comp.key?('events') && comp['events'].select { |event| event['id'].to_s == event_id.to_s }[0]
        # if we fould it then break out the iteration
        event && break
      end
      scoreboard = event && event.key?('scoreboard') && event['scoreboard']
      result = scoreboard && { 'scrA' => scoreboard['scrA'], 'scrB' => scoreboard['scrB'] }
      JSON result || {}
    end

  # implementing to_json in order to be able to send object to front-end as JSON
  def to_json
    {'id' => @id, 'desc' => @desc, 'pos' => @pos}
  end
end