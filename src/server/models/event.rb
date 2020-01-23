# Will hold the sports data
class Event
  attr_accessor :id, :desc, :comp_desc, :pos, :event_type, :sport_id

  def initialize(id, desc, pos, event_type, comp_desc, sport_id)
    @id = id
    @desc = desc
    @pos = pos
    @event_type = event_type
    @comp_desc = comp_desc
    @sport_id = sport_id
  end

# implementing to_json in order to be able to send object to front-end as JSON
  def to_json
    {'id' => @id, 'desc' => @desc, 'comp_desc' => @comp_desc,'pos' => @pos, 'event_type' => @event_type, 'sport_id' => @sport_id}
  end
end