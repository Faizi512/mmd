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

ActiveRecord::Schema.define(version: 2020_08_10_155919) do

  create_table "leads", force: :cascade do |t|
    t.integer "lead_id"
    t.string "redirect_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "delivery_name"
  end

  create_table "products", force: :cascade do |t|
    t.integer "product_type"
    t.string "img"
    t.integer "monthly_cost"
    t.integer "upfront"
    t.integer "data"
    t.integer "calls"
    t.integer "text"
    t.integer "contract"
    t.string "network_img"
    t.string "color"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
