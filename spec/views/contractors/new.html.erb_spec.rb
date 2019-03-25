require 'rails_helper'

RSpec.describe "contractors/new", type: :view do
  before(:each) do
    assign(:contractor, Contractor.new(
      :first_name => "MyString",
      :last_name => "MyString",
      :partner_company => nil
    ))
  end

  it "renders new contractor form" do
    render

    assert_select "form[action=?][method=?]", contractors_path, "post" do

      assert_select "input[name=?]", "contractor[first_name]"

      assert_select "input[name=?]", "contractor[last_name]"

      assert_select "input[name=?]", "contractor[partner_company_id]"
    end
  end
end
