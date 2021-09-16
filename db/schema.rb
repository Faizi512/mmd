# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_09_09_052424) do

  create_table "exit_deliveries", force: :cascade do |t|
    t.string "url"
    t.float "percentage"
    t.string "status"
    t.integer "priority"
    t.integer "cap"
    t.integer "count", default: 0
    t.string "operational", default: "active"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "functional"
    t.float "copy_percentage"
    t.integer "total_count"
    t.boolean "is_default", default: false
    t.string "name"
    t.text "source"
  end

  create_table "lead_counts", force: :cascade do |t|
    t.string "url"
    t.date "redirect_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "accept_page", default: false
    t.string "source"
    t.json "complete_data"
  end

  create_table "leads", force: :cascade do |t|
    t.integer "lead_id"
    t.string "reject_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "delivery_name"
    t.string "success_url"
    t.string "token"
    t.string "reject_params"
    t.string "success_params"
  end

  create_table "products", force: :cascade do |t|
    t.integer "product_type"
    t.string "title"
    t.string "img"
    t.integer "monthly_cost"
    t.integer "upfront"
    t.integer "data"
    t.integer "calls"
    t.integer "text"
    t.integer "contract"
    t.string "network_img"
    t.string "color"
    t.string "retailer"
    t.string "free_gift"
    t.string "data_roaming"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "share_domains", force: :cascade do |t|
    t.string "url"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
