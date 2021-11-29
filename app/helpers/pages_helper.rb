module PagesHelper

  def isbadCustomer query
    if(query.present?)
      keywords = ["credit", "accepted", "bad", "score", "sunshine",
                         "no credit", "free", "guaranteed", "gift", "win", "wining", "very",
                         "phone check", "check" , "no upfront", "cheap", "catalogues", "later",
                         "sun", "no deposit", "accepted", "No deposit", "0 deposit"]
      query = query.downcase();
      keywords.each do |word|
        matchedIndex = query.in?(word);
        if (matchedIndex)
          return true;
          break;
        end
      end
      return false
    end
  end

  def new_mmd
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'MEGA-MOBILE-DEALS',
      optin_url: '/new-mmd',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: true,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def mmd_post
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'mmd-post',
      optin_url: '/mmd-post',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def loan_decline
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'loan-decline',
      optin_url: '/loan-decline',
      sid: 90,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def returning_loans
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'returning-loans',
      optin_url: '/returning-loans',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def handsets
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'handset',
      optin_url: '/handset',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def breeze_mobile
    @details = {
      camp_id: 'BREEZE-MOBILE',
      success_url: '/breeze-success',
      bad_success_url: '/breeze-success',
      form_name: 'Breeze-Mobile',
      optin_url: '/breeze-mobile',
      sid: nil,
      ssid: nil,
      source:'Charles Duke',
      quick_submit: true,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def ee_deal
    @details = {
      camp_id: 'EE-MOBILE-NEW',
      success_url: '/ee-success-breeze',
      bad_success_url: '/ee-decline',
      form_name: 'ee_deals',
      optin_url: '/ee_deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def exclusive_ee_deal
    @details = {
      camp_id: 'BREEZE-MOBILE',
      success_url: '/ee-success',
      bad_success_url: '/ee-success',
      form_name: 'exclusive_ee_deals',
      optin_url: '/exclusive_ee_deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def iphone_deals
    @details = {
      camp_id: 'BREEZE-MOBILE',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'iphone-deals',
      optin_url: '/iphone-deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def exclusive_o2_deal
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: '/o2-success',
      bad_success_url: '/o2-success',
      form_name: 'exclusive_o2_deals',
      optin_url: '/exclusive_o2_deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end


  def exclusive_tribe_deal
    @details = {
      camp_id: 'BREEZE-MOBILE',
      success_url: '/tribe-success',
      bad_success_url: '/tribe-success',
      form_name: 'exclusive_tribe_deals',
      optin_url: '/exclusive_tribe_deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def exclusive_o2_load
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: '/o2-success',
      bad_success_url: '/o2-success',
      form_name: 'exclusive_o2_deals_load',
      optin_url: '/exclusive_o2_deals_load',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def MMD_loans
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'MMD-loans',
      optin_url: '/MMD-loans',
      sid: nil,
      ssid: nil,
      source:'mmd-loans',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def upgrade_checker
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'upgrade-checker',
      optin_url: '/upgrade-checker',
      sid: nil,
      ssid: nil,
      source:'upgrade-checker',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def step_form
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'step-form',
      optin_url: '/step-form',
      sid: nil,
      ssid: nil,
      source:'step-form',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def homev1
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'Mega-Mobile-Deals-homev1',
      optin_url: '/homev1',
      sid: nil,
      ssid: nil,
      source:'home-pagev1',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def home
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'Mega-Mobile-Deals',
      optin_url: '',
      sid: nil,
      ssid: nil,
      source:'home-page',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def accept_mobiles
    @details = {
      camp_id: 'ACCEPT-MOBILE-LEADS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'accept-mobiles',
      optin_url: '/accept-mobiles',
      sid: nil,
      ssid: nil,
      source:'Accept-mobile',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def sim_deal
    @details = {
      camp_id: 'SIMO2',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'sim-deals',
      optin_url: '/sim-deals',
      sid: nil,
      ssid: nil,
      source:'sim-deals',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end
  def cheap_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'cheap-deals',
      optin_url: '/cheap-deals',
      sid: nil,
      ssid: nil,
      source:'cheap-deals',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def exclusive_iphone_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'exclusive_iphone_deals',
      optin_url: '/exclusive_iphone_deals',
      sid: 1,
      ssid: 1,
      source:'exclusive_iphone_deals',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
  end

  def exclusive_samsung_discounts
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'exclusive-samsung-discounts',
      optin_url: '/exclusive-samsung-discounts',
      sid: nil,
      ssid: nil,
      source:'exclusive-samsung-discounts',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json

    @samsungs21 = [
      {
        name: "Samsung Galaxy S21 5G",
        image: ["samsung/grey-galaxy-s21.png","samsung/orang-galaxy-s21.png","samsung/violet-galaxy-s21.png","samsung/white-galaxy-s21.png"],
        btn_text: "Get This Deal",
        color: ["#6e7074","#efc5be","#a5a8c4","#e9e9e7"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phones212",
      },
    ]
    @samsungs21plus = [
      {
        name: "Samsung Galaxy S21 Plus",
        image: ["samsung/golden-galaxy-s21plus.png","samsung/black-galaxy-s21plus.png","samsung/violet-galaxy-s21.png","samsung/silver-galaxy-s21plus.png","samsung/red-galaxy-s21plus.png"],
        btn_text: "Get This Deal",
        color: ["#dcb5b3","#211e16","#a5a8c4","#c2c9d5","#cc333d"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phones21plus2",
      },
    ]
    @samsungs21ultra = [
      {
        name: "Samsung Galaxy S21 Ultra",
        image: ["samsung/silver-galaxy-s21-ultra.png","samsung/black-galaxy-s21-ultra.png","samsung/brown-galaxy-s21-ultra.png","samsung/titanium-galaxy-s21-ultra.png","samsung/navy-galaxy-s21-ultra.png"],
        btn_text: "Get This Deal",
        color: ["#c2c9d5","#211e16","#5f4e4b","#6e7074","#3a414a"],
        memory: "128GB/256/512GB",
        ram:  "12GB",
        carouselid:"phones21ultra2",
      },
    ]
    @samsungzflip = [
      {
        name: "Samsung Galaxy Z Flip3",
        image: ["samsung/gold-galaxy-z-flip3.png","samsung/black-galaxy-z-flip3.png","samsung/green-galaxy-z-flip3.png","samsung/lavender-galaxy-z-flip3.png"],
        btn_text: "Get This Deal",
        color: ["#e3deca","#2d2926","#435551","#bfb1d2"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phonezflip3",
      },
    ]
    @samsungzfold = [
      {
        name: "Samsung Galaxy Z Fold3",
        image: ["samsung/silver-galaxy-z-fold3.png","samsung/black-galaxy-z-fold3.png","samsung/green-galaxy-z-fold3.png"],
        btn_text: "Get This Deal",
        color: ["#cac6c4","#2d2926","#384a46"],
        memory: "256/512GB",
        ram:  "12GB",
        carouselid:"phonezfold3",
      },
    ]
    @samsungnote20 = [
      {
        name: "Samsung Galaxy Note 20",
        image: ["samsung/green-galaxy-note20.png","samsung/bronze-galaxy-note20.png","samsung/grey-galaxy-note20.png"],
        btn_text: "Get This Deal",
        color: ["#91b098","#9a716e","#545859"],
        memory: "256GB",
        ram:  "8GB",
        carouselid:"phonenote20",
      },
    ]
    @samsungnote20ultra = [
      {
        name: "Samsung Galaxy Note 20 Ultra",
        image: ["samsung/bronze-galaxy-note20-ultra.png","samsung/black-galaxy-note20-ultra.png","samsung/white-galaxy-note20-ultra.png"],
        btn_text: "Get This Deal",
        color: ["#9a716e","#1a1815","#dad9db"],
        memory: "256/512GB",
        ram:  "8GB",
        carouselid:"phonenote20ultra",
      },
    ]

    @phones = [
      {
        name: "Samsung Galaxy S21 Ultra",
        image: ["samsung/silver-galaxy-s21-ultra.png","samsung/black-galaxy-s21-ultra.png","samsung/brown-galaxy-s21-ultra.png","samsung/titanium-galaxy-s21-ultra.png","samsung/navy-galaxy-s21-ultra.png"],
        btn_text: "Get This Deal",
        color: ["#c2c9d5","#211e16","#5f4e4b","#6e7074","#3a414a"],
        memory: "128GB/256/512GB",
        ram:  "12GB",
        carouselid:"phones21ultra",
      },
      {
        name: "Samsung Galaxy S21 Plus",
        image: ["samsung/golden-galaxy-s21plus.png","samsung/black-galaxy-s21plus.png","samsung/violet-galaxy-s21.png","samsung/silver-galaxy-s21plus.png","samsung/red-galaxy-s21plus.png"],
        btn_text: "Get This Deal",
        color: ["#dcb5b3","#211e16","#a5a8c4","#c2c9d5","#cc333d"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phones21plus",
      },
      {
        name: "Samsung Galaxy S21 5G",
        image: ["samsung/grey-galaxy-s21.png","samsung/orang-galaxy-s21.png","samsung/violet-galaxy-s21.png","samsung/white-galaxy-s21.png"],
        btn_text: "Get This Deal",
        color: ["#6e7074","#efc5be","#a5a8c4","#e9e9e7"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phones21",
      },
      {
        name: "Samsung Galaxy Z Flip3",
        image: ["samsung/gold-galaxy-z-flip3.png","samsung/black-galaxy-z-flip3.png","samsung/green-galaxy-z-flip3.png","samsung/lavender-galaxy-z-flip3.png"],
        btn_text: "Get This Deal",
        color: ["#e3deca","#2d2926","#435551","#bfb1d2"],
        memory: "128/256GB",
        ram:  "8GB",
        carouselid:"phoneszflip3",
      },
      {
        name: "Samsung Galaxy S20 FE",
        image: ["samsung/navy-galaxy-s20-fe.png","samsung/mint-galaxy-s20-fe.png","samsung/red-galaxy-s20-fe.png","samsung/lavender-galaxy-s20-fe.png","samsung/white-galaxy-s20-fe.png","samsung/orang-galaxy-s20-fe.png"],
        btn_text: "Get This Deal",
        color: ["#485167","#b6cfd0","#b73439","#d0acd0","#f0f0f1","#f3c29a"],
        memory: "128GB/256GB",
        ram:  "8GB",
        carouselid:"phones20fe",
      },
      {
        name: "Samsung Galaxy Z Fold3",
        image: ["samsung/silver-galaxy-z-fold3.png","samsung/black-galaxy-z-fold3.png","samsung/green-galaxy-z-fold3.png"],
        btn_text: "Get This Deal",
        color: ["#cac6c4","#2d2926","#384a46"],
        memory: "256/512GB",
        ram:  "12GB",
        carouselid:"phoneszfold3",
      },
      {
        name: "Samsung Galaxy M52",
        image: ["samsung/blue-galaxy-m52.png","samsung/black-galaxy-m52.png","samsung/white-galaxy-m52.png"],
        btn_text: "Get This Deal",
        color: ["#2d5eab","#000000","#ffffff"],
        memory: "128GB",
        ram:  "6/8GB",
        carouselid:"phonem52",
      },
      {
        name: "Samsung Galaxy A52s",
        image: ["samsung/lavender-galaxy-a52s.png","samsung/black-galaxy-a52s.png","samsung/white-galaxy-a52s.png","samsung/mint-galaxy-a52s.png"],
        btn_text: "Get This Deal",
        color: ["#b9b7d4","#494d35","#ecece5","#c7e9e3"],
        memory: "128GB",
        ram:  "8GB",
        carouselid:"phonea52s",
      },
      {
        name: "Galaxy S20 FE (SM-G780G)",
        image: ["samsung/red-galaxy-s20-fe.png","samsung/navy-galaxy-s20-fe.png","samsung/mint-galaxy-s20-fe.png","samsung/lavender-galaxy-s20-fe.png","samsung/white-galaxy-s20-fe.png","samsung/orang-galaxy-s20-fe.png"],
        btn_text: "Get This Deal",
        color: ["#b73439","#485167","#b6cfd0","#d0acd0","#f0f0f1","#f3c29a"],
        memory: "128GB/256GB",
        ram:  "8GB",
        carouselid:"phones20feg780g",
      },
      {
        name: "Samsung Galaxy A03s",
        image: ["samsung/blue-galaxy-a03s.png","samsung/black-galaxy-a03s.png"],
        btn_text: "Get This Deal",
        color: ["#204874","#000000"],
        memory: "32GB",
        ram:  "3GB",
        carouselid:"phonea03s",
      },
      {
        name: "Galaxy S20 FE (SM-G780F)",
        image: ["samsung/mint-galaxy-s20-fe.png","samsung/navy-galaxy-s20-fe.png","samsung/red-galaxy-s20-fe.png","samsung/lavender-galaxy-s20-fe.png","samsung/white-galaxy-s20-fe.png","samsung/orang-galaxy-s20-fe.png"],
        btn_text: "Get This Deal",
        color: ["#b6cfd0","#485167","#b73439","#d0acd0","#f0f0f1","#f3c29a"],
        memory: "128GB/256GB",
        ram:  "8GB",
        carouselid:"phones20feg780f",
      },
      {
        name: "Samsung Galaxy A72",
        image: ["samsung/violet-galaxy-a72.png","samsung/black-galaxy-a72.png","samsung/white-galaxy-a72.png","samsung/blue-galaxy-a72.png"],
        btn_text: "Get This Deal",
        color: ["#b9b7d4","#1f2018","#ecece5","#7ab7dc"],
        memory: "128GB",
        ram:  "8GB",
        carouselid:"phonea72",
      },
    ]
    
  end
  
  def cheapest_mobile_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'cheapest_mobile_deals',
      optin_url: '/cheapest_mobile_deals',
      sid: nil,
      ssid: nil,
      source:'cheapest_mobile_deals',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json
    @phones = [
      {
        name: "iPhone 13 Pro Max",
        image: "phone/apple-iphone-13-pro-max.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "Galaxy Z Fold3 5G",
        image: "phone/z-fold3.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13",
        image: "phone/apple-iphone-13.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13 Pro",
        image: "phone/apple-iphone-13-pro.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "Galaxy Z Flip3 5G",
        image: "phone/z-flip3.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13 Mini",
        image: "phone/apple-iphone-13-mini.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 12",
        btn_text: "Exclusive Deal",
        image: "iphone_12_black.png"
      },
      {
        name: "Galaxy S20",
        btn_text: "Get Deal",
        image: "phone/samsung-galaxy-s20-plus.png"
      },
      {
        name: "iPhone 11 Pro",
        btn_text: "Exclusive Deal",
        image: "phone/iphone11pro.png"
      },
      {
        name: "Note 20 5G",
        btn_text: "Get Deal",
        image: "phone/note-20.jpg"
      },
      {
        name: "iPhone 11",
        btn_text: "Exclusive Deal",
        image: "phone/iphone11.png",
      },
      {
        name: "S20 Ultra 5G",
        btn_text: "Exclusive Deal",
        image: "phone/samsung-galaxy-s20-ultra-black.png"
      },
    ]
  end

  def hq
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      form_name: 'hq-MMD',
      optin_url: '/hq',
      sid: nil,
      ssid: nil,
      source:'google-home-page',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      token: @randon_token,
      ipaddress: request.remote_ip,
    }.to_json

    @featured_deals = [
      {
        name: "iPhone 12",
        image: "iphone_12_black.png",
        url:"/success",
        deposit: "£0"
      },
      {
        name: "iPhone 11 Pro Max",
        image: "phone/1iphone-11-pro-max.png",
        url:"/success",
        deposit: "£0"
      }
    ]

    @phones = [
      {
        name: "iPhone 13 Pro Max",
        image: "phone/apple-iphone-13-pro-max.png",
        ribbon_text: "Pre Order Now",
      },
      {
        name: "Samsung Galaxy Z Fold3 5G",
        image: "phone/z-fold3.png",
        ribbon_text: "50% Off",
      },
      {
        name: "iPhone 13",
        image: "phone/apple-iphone-13.png",
        ribbon_text: "Pre Order Now",
      },
      {
        name: "iPhone 13 Pro",
        image: "phone/apple-iphone-13-pro.png",
        ribbon_text: "Pre Order Now",
      },
      {
        name: "Samsung Galaxy Z Flip3 5G",
        image: "phone/z-flip3.png",
        ribbon_text: "50% Off",
      },
      {
        name: "iPhone 13 Mini",
        image: "phone/apple-iphone-13-mini.png",
        ribbon_text: "Pre Order Now",
      },
      {
        name: "iPhone 12",
        image: "iphone_12_black.png",
        ribbon_text: "50% Off"
      },
      {
        name: "iPhone 11",
        image: "phone/iphone11.png",
        ribbon_text: "50% Off"
      },
      {
        name: "Galaxy S20",
        image: "phone/samsung-galaxy-s20-plus.png",
        ribbon_text: "50% Off",
      },
      {
        name: "iPhone XS",
        image: "phone/iphonexs.png",
        ribbon_text: "50% Off",
      },
      {
        name: "Galaxy S10",
        image: "phone/samsungs10.png",
        ribbon_text: "50% Off",
      },
      {
        name: "iPhone 11 Pro",
        image: "phone/iphone11pro.png",
        ribbon_text: "50% Off",
      },
      {
        name: "Note 20 5G",
        image: "phone/note-20.jpg",
        ribbon_text: "50% Off",
      },
      {
        name: "Samsung A20",
        image: "phone/samsung-a20.png",
        ribbon_text: "50% Off",
      },
      {
        name: "Galaxy S20 5G",
        image: "phone/galaxy-s20-5g.png",
        ribbon_text: "50% Off",
      },
      {
        name: "iPhone SE 128GB",
        image: "phone/iphonese.jpg",
        ribbon_text: "50% Off",
      },
      {
        name: "S20 Ultra 5G",
        image: "phone/samsung-galaxy-s20-ultra-black.png",
        ribbon_text: "50% Off",
      },
      {
        name: "Huawei P30",
        image: "phone/huaweip30.png",
        ribbon_text: "50% Off",
      }
    ]

    @testimonials = [
      {
        name: 'Sophie',
        comment: 'Brilliant service, ordered my phone and it arrived the next day. Absolutely delighted!',
        date: 'May 21, 2021',
        image: 'comment1.jpg'
      },
      {
        name: 'John',
        comment: 'Got the latest iPhone with no upfront payment - really good offer.',
        date: 'Jan 04, 2021',
        image: 'comment3.jpg'
      },
      {
        name: 'Elizabeth',
        comment: 'Really helpful staff, got an amazing deal on my SIM only plan, saving over £15 per month now',
        date: 'March 03, 2021',
        image: 'comment2.jpg'
      }
    ]
    partners_list
  end
  def exclusive_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      form_name: 'exclusive-deals-MMD',
      optin_url: '/exclusive-deals',
      sid: nil,
      ssid: nil,
      source:'needed',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      token: @randon_token,
      ipaddress: request.remote_ip,
    }.to_json
    @phones = [
      {
        name: "iPhone 13 Pro Max",
        btn_text: "Get iPhone 13 Pro Max",
        image: "phone/apple-iphone-13-pro-max.png",
      },
      {
        name: "Galaxy S21 Plus",
        btn_text: "Get S21 Plus",
        image: "phone/samsung-galaxy-s21-plus.png",
      },
      {
        name: "Galaxy S21 Ultra",
        btn_text: "Get S21 Ultra",
        image: "phone/samsung-galaxy-s21-ultra1.png"
      },
      {
        name: "iPhone 12 Pro Max",
        btn_text: "Get iPhone 12 Pro Max",
        image: "phone/iphone_12_pacific_blue.png"
      },
      {
        name: "Galaxy Z Flip3",
        btn_text: "Get Z Flip3 ",
        image: "phone/z-flip3.png"
      },
      {
        name: "Galaxy Z Fold3",
        btn_text: "Get Z Fold3",
        image: "phone/z-fold3.png"
      },
    ]
    @sims = [
      {
        offer: "6 Months half price",
        image: "sim/voda-sim-card.png",
        name: "Unlimited Sim Plan",
        intro: "5g Ready",
        data: "Unlimited",
        calls: "Unlimited Calls",
        text: "Unlimited Texts"
      },
      {
        offer: "Special Offer",
        image: "sim/o2-sim.png",
        name: "150GB Sim Plan",
        intro: "5g Ready",
        data: "150GB",
        calls: "Unlimited Calls",
        text: "Unlimited Texts"
      },
      {
        offer: "Commitment-free SIM plan",
        image: "sim/Smarty.png",
        name: "Unlimited Sim Plan",
        intro: "5g Ready",
        data: "Unlimited",
        calls: "Unlimited Calls",
        text: "Unlimited Texts"
      }
    ]
  end
  def o2
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk5.co.uk/?a=14118&c=33110',
      form_name: 'o2-MMD',
      optin_url: '/o2',
      sid: nil,
      ssid: nil,
      source:'google-home-page',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      token: @randon_token,
      ipaddress: request.remote_ip,
    }.to_json

    @featured_deals = [
      {
        name: "iPhone 12",
        image: "iphone_12_black.png",
        url:"/success",
        deposit: "£0"
      },
      {
        name: "iPhone 11 Pro Max",
        image: "phone/1iphone-11-pro-max.png",
        url:"/success",
        deposit: "£0"
      }
    ]

    @phones = [
      {
        name: "iPhone 13 Pro Max",
        image: "phone/apple-iphone-13-pro-max.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "Samsung Galaxy Z Fold3 5G",
        image: "phone/z-fold3.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13",
        image: "phone/apple-iphone-13.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13 Pro",
        image: "phone/apple-iphone-13-pro.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "Samsung Galaxy Z Flip3 5G",
        image: "phone/z-flip3.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 13 Mini",
        image: "phone/apple-iphone-13-mini.png",
        btn_text: "Exclusive Deal",
      },
      {
        name: "iPhone 12",
        btn_text: "Exclusive Deal",
        image: "iphone_12_black.png"
      },
      {
        name: "iPhone 11",
        btn_text: "Get Deal",
        image: "phone/iphone11.png",
      },
      {
        name: "Galaxy S20",
        btn_text: "Exclusive Deal",
        image: "phone/samsung-galaxy-s20-plus.png"
      },
      {
        name: "iPhone XS",
        btn_text: "Get Deal",
        image: "phone/iphonexs.png"
      },
      {
        name: "Galaxy S10",
        btn_text: "Get Deal",
        image: "phone/samsungs10.png"
      },
      {
        name: "iPhone 11 Pro",
        btn_text: "Get Deal",
        image: "phone/iphone11pro.png"
      },
      {
        name: "Note 20 5G",
        btn_text: "Exclusive Deal",
        image: "phone/note-20.jpg"
      },
      {
        name: "Samsung A20",
        btn_text: "Get Deal",
        image: "phone/samsung-a20.png"
      },
      {
        name: "Galaxy S20 5G",
        btn_text: "Get Deal",
        image: "phone/galaxy-s20-5g.png"
      },
      {
        name: "iPhone SE 128GB",
        btn_text: "Get Deal",
        image: "phone/iphonese.jpg"
      },
      {
        name: "S20 Ultra 5G",
        btn_text: "Get Deal",
        image: "phone/samsung-galaxy-s20-ultra-black.png"
      },
      {
        name: "Huawei P30",
        btn_text: "Exclusive Deal",
        image: "phone/huaweip30.png"
      }
    ]

    @testimonials = [
      {
        name: 'Sophie',
        comment: 'Brilliant service, ordered my phone and it arrived the next day. Absolutely delighted!',
        date: 'May 21, 2021',
        image: 'comment1.jpg'
      },
      {
        name: 'John',
        comment: 'Got the latest iPhone with no upfront payment - really good offer.',
        date: 'Jan 04, 2021',
        image: 'comment3.jpg'
      },
      {
        name: 'Elizabeth',
        comment: 'Really helpful staff, got an amazing deal on my SIM only plan, saving over £15 per month now',
        date: 'March 03, 2021',
        image: 'comment2.jpg'
      }
    ]
    partners_list
  end



  def sim_deal_v2
    @details = {
      camp_id: 'SIMO2',
      success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      bad_success_url: 'https://dl.reliatrk.com/?a=2&c=36&s1=exit',
      form_name: 'sim-deals-v2',
      optin_url: '/sim-deals-v2',
      sid: nil,
      ssid: nil,
      source:'sim-deals-v2',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
      ipaddress: request.remote_ip,
    }.to_json

    @o2simdeals = [
      {
        data: '150GB',
        img:'sim/o2-sim.png',
        text: 'Upto £10 off'
      },
      {
        data: '30GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: 'Unlimited',
        img:'sim/o2-sim.png',
        text: 'Upto £10 off'
      },
      {
        data: '5GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: '50GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: '10GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      }
    ]
    @vodasimdeals = [
      {
        data: 'Unlimited',
        img:'sim/voda-sim-card.png',
        text: '6 Months half price'
      },
      {
        data: '120 GB',
        img:'sim/voda-sim-card.png',
        text: '6 Months half price'
      }
    ]
    @threesimdeals = [
      {
        data: '8 GB',
        img:'sim/three.png',
        text: 'Online exclusive'
      },
      {
        data: 'Unlimited',
        img:'sim/three.png',
        text: '6 Months half price'
      }
    ]
    @voxisimdeals = [
      {
        data: '12 GB',
        img:'sim/voxi.png',
        text: 'Endless social media'
      },
      {
        data: 'Unlimited',
        img:'sim/voxi.png',
        text: '5G Plan'
      }
    ]
    @smartysimdeals = [
      {
        data: '3 GB',
        img:'sim/Smarty.png',
        text: 'Up to £3 back every month'
      },
      {
        data: 'Unlimited',
        img:'sim/Smarty.png',
        text: 'Commitment-free SIM plan'
      }
    ]
  end

  def data_share_domains
    ShareDomain.pluck(:url)
  end

  def get_deals_data url_name
    send(url_name.gsub('-', '_')) rescue home

    @simdeals = [
      {
        data: '150GB',
        img:'sim/o2-sim.png',
        text: 'Upto £10 off'
      },
      {
        data: '30GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: 'Unlimited',
        img:'sim/o2-sim.png',
        text: 'Upto £10 off'
      },
      {
        data: '5GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: '50GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: '10GB',
        img:'sim/o2-sim.png',
        text: 'Special Offer'
      },
      {
        data: 'Unlimited',
        img:'sim/voda-sim-card.png',
        text: '6 Months half price'
      },
      {
        data: '120 GB',
        img:'sim/voda-sim-card.png',
        text: '6 Months half price'
      },
      {
        data: '8 GB',
        img:'sim/three.png',
        text: 'Online exclusive'
      },
      {
        data: 'Unlimited',
        img:'sim/three.png',
        text: '6 Months half price'
      },
      {
        data: '12 GB',
        img:'sim/voxi.png',
        text: 'Endless social media'
      },
      {
        data: 'Unlimited',
        img:'sim/voxi.png',
        text: '5G Plan'
      },
      {
        data: '3 GB',
        img:'sim/Smarty.png',
        text: 'Up to £3 back every month'
      },
      {
        data: 'Unlimited',
        img:'sim/Smarty.png',
        text: 'Commitment-free SIM plan'
      },

    ]
  end
end
