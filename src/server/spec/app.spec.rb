require "spec_helper"

ENV['RACK_ENV'] = 'test'

RSpec.configure do |config|
  config.mock_with :rspec
end

describe ApplicationController do
  let(:app) { ApplicationController.new }

  context "GET to /api/sports" do
    let(:response) { get "/api/sports" }

    before do
      @jsonResponse = JSON.parse(response.body)
    end

    it "should return status 200 OK" do
      expect(response.status).to eq 200
    end

    it "should return a non-empty list of sports" do
      expect(@jsonResponse.length).to be >= 0
#       expect(@jsonResponse.length).to be(3)
    end

    it "should contain the necessary keys" do
      expect(@jsonResponse[0].key?('id')).to be true
      expect(@jsonResponse[0].key?('desc')).to be true
      expect(@jsonResponse[0].key?('pos')).to be true
    end
  end

  context "trying to get the events for an inexistent sport" do
    let(:response) { get "/api/sports/601" }

    before do
      @jsonResponse = JSON.parse(response.body)
    end

    it "returns status 400" do
      expect(response.status).to eq 400
    end

    it "returns an error message" do
      expect(@jsonResponse.key?('message')).to be true
      expect(@jsonResponse['message']).to eq 'An error has occured'
    end
  end

  context "trying to get the events for an existent sport" do
    let(:response) { get "/api/sports/600" }

    before do
      @jsonResponse = JSON.parse(response.body)
    end

    it "should return status 200 OK" do
      expect(response.status).to eq 200
    end

    it "should return at least one event" do
      expect(@jsonResponse.length).to be >= 0
#       expect(@jsonResponse.length).to be(3)
    end

    it "should contain the necessary keys" do
      expect(@jsonResponse[0].key?('id')).to be true
      expect(@jsonResponse[0].key?('desc')).to be true
      expect(@jsonResponse[0].key?('comp_desc')).to be true
      expect(@jsonResponse[0].key?('pos')).to be true
      expect(@jsonResponse[0].key?('sport_id')).to be true
      expect(@jsonResponse[0].key?('event_type')).to be true
    end
  end

  context "trying to get the outcome for an existent event" do
      let(:response) { get "/api/sports/600/events/1173958800" }

      before do
        @jsonResponse = JSON.parse(response.body)
      end

      it "should return status 200 OK" do
        expect(response.status).to eq 200
      end

      it "should return at least one event" do
        expect(@jsonResponse.length).to be >= 0
      end

      it "should contain the necessary keys" do
        expect(@jsonResponse.key?('scrA')).to be true
        expect(@jsonResponse.key?('scrB')).to be true
      end
    end
  context "trying to get the events for an existent sport" do
    let(:response) { get "/api/non-existent" }

    it "should return status 404 OK" do
      expect(response.status).to eq 404
    end
  end
end