require 'rails_helper'

RSpec.describe "PartnerCompanies", type: :request do
  describe "GET /partner_companies" do
    it "works! (now write some real specs)" do
      get partner_companies_path
      expect(response).to have_http_status(200)
    end
  end
end
