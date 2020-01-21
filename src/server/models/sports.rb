# Will hold the sports data
class Sports
  attr_accessor :id, :desc, :pos

  def initialize(id, desc, pos)
    @id = id
    @desc = desc
    @pos = pos
  end

  def printYourself
    puts "Hello Ruby! #{@id} - #{@desc} - #{@pos}"
  end
# implementing to_json in order to be able to send object to front-end as JSON
  def to_json
    {'id' => @id, 'desc' => @desc, 'pos' => @pos}
  end
end