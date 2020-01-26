# this class is for handling errors
class ErrorHandler

  # method used for handling errors in back-end and generating logs + return a proper message for UI
  def self.handle(e, useCase)
    puts e.message
    error = { 'message' => e.message, 'useCase' => useCase, 'backtrace' => e.backtrace }
#     puts error # this would be a proper log file
    response = { 'message' => 'An error has occured' }
    return response
  end
end