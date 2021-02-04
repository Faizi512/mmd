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
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'MEGA-MOBILE-DEALS',
      optin_url: '/new-mmd',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: true,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def mmd_post
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'mmd-post',
      optin_url: '/mmd-post',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def mmd_loans_2
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'mmd_loans_2',
      optin_url: '/mmd_loans_2',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: true,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def returning_loans
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'returning-loans',
      optin_url: '/returning-loans',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end


  def terms_and_conditions
    @details = {
      camp_id: '',
      success_url: '',
      form_name: '',
      optin_url: '',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def sim_deals
    @details = {
      camp_id: 'SIM',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Sim-Deals',
      optin_url: '/sim-deals',
      sid: 1,
      ssid: 1,
      source:nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def loan_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://loans4mobiles.com?source=exit',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'loan-deals',
      optin_url: '/loan-deals',
      sid: 1,
      ssid: 1,
      source:'exit',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def uk_credit_ratings
    @details = {
      camp_id: 'GUY-CREDIT-REPORT',
      success_url: 'https://secure.uk.rspcdn.com/xprr/red/PID/2607/SID/',
      bad_success_url: 'https://secure.uk.rspcdn.com/xprr/red/PID/2607/SID/',
      form_name: 'uk-credit-ratings',
      optin_url: '/uk-credit-ratings',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def handsets
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'handset',
      optin_url: '/handset',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
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
    }.to_json
  end

  def iphone_deals
    @details = {
      camp_id: 'BREEZE-MOBILE',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'iphone-deals',
      optin_url: '/iphone-deals',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
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
    }.to_json
  end

  def sweet_mobiles
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://sweetmobile.co.uk/pay.php',
      bad_success_url: '',
      form_name: 'sweet-mobile',
      optin_url: '/sweet-mobile',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
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
    }.to_json
  end

  def MMD_loans
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'MMD-loans',
      optin_url: '/MMD-loans',
      sid: nil,
      ssid: nil,
      source:'mmd-loans',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def upgrade_checker
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'upgrade-checker',
      optin_url: '/upgrade-checker',
      sid: nil,
      ssid: nil,
      source:'upgrade-checker',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end


  def homev1
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Mega-Mobile-Deals-homev1',
      optin_url: '/homev1',
      sid: nil,
      ssid: nil,
      source:'home-pagev1',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def home
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Mega-Mobile-Deals',
      optin_url: '',
      sid: nil,
      ssid: nil,
      source:'home-page',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def get_deals_data url_name
    send(url_name.gsub('-', '_')) rescue home

    @phoneshome = [
      {
        name: "iPhone 12",
        data: "Unlimited",
        image: "iphone_12_black.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung Galaxy S10",
        data: "Unlimited",
        image: "phone/samsungs10.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung Galaxy Note 20 Ultra 5G",
        data: "Unlimited",
        image: "phone/note-20-b.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Apple iPhone 11 Pro",
        data: "Unlimited",
        image: "phone/iphone11pro.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung Galaxy Note 20 5G",
        data: "Unlimited",
        image: "phone/note-20.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung A20",
        data: "Unlimited",
        image: "phone/samsung-a20.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming",
        deposit: "£0",
        handset: "Samsung A20"
      },
      {
        name: "Samsung Galaxy S20 5G",
        data: "Unlimited",
        image: "phone/galaxy-s20-5g.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "iPhone SE 128GB",
        data: "Unlimited",
        image: "phone/iphonese.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming",
        deposit: "£0",
        handset: "iPhone SE"
      },
      {
        name: "Samsung A10",
        data: "Unlimited",
        image: "phone/samsung-a10.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming",
        deposit: "£0",
        handset: "Samsung A10"
      },
      {
        name: "Huawei Y7",
        data: "Unlimited",
        image: "phone/huaweiy7.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming",
        deposit: "£0",
        handset: "Huawei Y7"
      },
      {
        name: "Samsung Galaxy S20 Ultra 5G",
        data: "Unlimited",
        image: "phone/samsung-galaxy-s20-ultra-black.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming, 5G Ready",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Huawei P30",
        data: "30GB",
        image: "phone/huaweip30.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "6 Months Half Price SIM!",
        data: "Unlimited",
        image: "sim/three-sim.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Best Sim Only Deals, 5G Ready",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung Galaxy S20 Plus 5G",
        data: "4GB",
        image: "phone/samsung-galaxy-s20-plus.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming, 5G Ready",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Oneplus 8 Pro 5G",
        data: "Unlimited",
        image: "phone/oneplus8pro.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Data Roaming, 5G Ready",
        deposit: "£0",
        handset: ""
      },
      {
        name: "iPhone 11 Pro Max",
        data: "Unlimited",
        image: "phone/1iphone-11-pro-max.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "iPhone 11",
        data: "Unlimited",
        image: "phone/iphone11.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "Samsung Galaxy S10e",
        data: "30GB",
        image: "phone/samsung-galaxy-s10e.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },

      {
        name: "iPhone XR",
        data: "Unlimited",
        image: "phone/iphonexr.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
      {
        name: "iPhone XS",
        data: "Unlimited",
        image: "phone/iphonexs.png",
        calls: "Unlimited",
        texts: "Unlimited",
        url:"/success",
        bluetext: "Personal Hotspot, Go Binge, Data Roaming",
        deposit: "£0",
        handset: ""
      },
    ]

    @sims = [
     {
        name: "Tesco Sim Card",
        data: "15 GB",
        image: "sim/tesco-sim-card.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£10",
        contlength: "3 Month"

      },
     {
        name: "O2 Sim Card",
        data: "Unlimited",
        image: "sim/O2-sim-card.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£50",
        contlength: "12 Month"

      },
      {
        name: "Vodafone Sim Card",
        data: "50 GB",
        image: "sim/voda-sim-card.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£10",
        contlength: "18 Month"

      },
      {
        name: "3 Sim Card",
        data: "4 GB",
        image: "sim/three-sim.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£5",
        contlength: "6 Month"

      },
      {
        name: "ID Sim Card",
        data: "5 GB",
        image: "sim/id-sim-card.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£7",
        contlength: "1 Month"

      },
      {
        name: "EE Sim Card",
        data: "20 GB",
        image: "sim/ee-sim-card.png",
        calls: "Unlimited",
        texts: "Unlimited",
        permonth: "£6",
        contlength: "12 Month"

      }
    ]

  end
end
