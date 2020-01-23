# this class is used in order to efficiently keep an array sorted by the pos value
class ArrayPos
  attr_accessor :arr

  def initialize()
    @arr = []
  end

  # method used for adding an object in a sorted array
  def add(value)
#   we first check where we should insert at
    insert_at = @arr.bsearch_index { |obj| obj['pos'] > value.pos }
    if insert_at === nil
#     if it should be added as the last element
      @arr.push(value.to_json)
    else
      @arr.insert(insert_at, value.to_json)
    end
  end
end