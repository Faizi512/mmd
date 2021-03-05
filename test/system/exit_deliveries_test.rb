require "application_system_test_case"

class ExitDeliveriesTest < ApplicationSystemTestCase
  setup do
    @exit_delivery = exit_deliveries(:one)
  end

  test "visiting the index" do
    visit exit_deliveries_url
    assert_selector "h1", text: "Exit Deliveries"
  end

  test "creating a Exit delivery" do
    visit exit_deliveries_url
    click_on "New Exit Delivery"

    fill_in "Cap", with: @exit_delivery.cap
    fill_in "Count", with: @exit_delivery.count
    fill_in "Percentage", with: @exit_delivery.percentage
    fill_in "Priority", with: @exit_delivery.priority
    fill_in "Source", with: @exit_delivery.source
    fill_in "Status", with: @exit_delivery.status
    fill_in "Url", with: @exit_delivery.url
    click_on "Create Exit delivery"

    assert_text "Exit delivery was successfully created"
    click_on "Back"
  end

  test "updating a Exit delivery" do
    visit exit_deliveries_url
    click_on "Edit", match: :first

    fill_in "Cap", with: @exit_delivery.cap
    fill_in "Count", with: @exit_delivery.count
    fill_in "Percentage", with: @exit_delivery.percentage
    fill_in "Priority", with: @exit_delivery.priority
    fill_in "Source", with: @exit_delivery.source
    fill_in "Status", with: @exit_delivery.status
    fill_in "Url", with: @exit_delivery.url
    click_on "Update Exit delivery"

    assert_text "Exit delivery was successfully updated"
    click_on "Back"
  end

  test "destroying a Exit delivery" do
    visit exit_deliveries_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Exit delivery was successfully destroyed"
  end
end
