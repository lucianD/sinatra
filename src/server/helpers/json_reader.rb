require 'json'

# Utility class used to read a json fron disk / url (in a future implementation)
class JsonReader
  @@data = nil

  def self.fetch()
    if (@@data)
        return @@data
    end
    file = File.read('data.json')
    @@data = JSON.parse(file)
    return @@data
  end
end