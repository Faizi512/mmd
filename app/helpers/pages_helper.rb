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

  def compare_phones
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Compare-Phones',
      optin_url: '/compare-phones',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
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

  def mmd_success
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'mmd-success',
      optin_url: '/mmd-success',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: true,
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

  def sims_returning
    @details = {
      camp_id: 'SIM',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Sims-Returning',
      optin_url: '/sims_returning',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: true,
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

  def latest_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Latest-Deals',
      optin_url: '/latest-deals',
      sid: 2,
      ssid:16986,
      source:'Snapchat-16986-HR',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def returning
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'returning',
      optin_url: '/returning',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: true,
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

  def fb_phone_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'fb-phone-deals',
      optin_url: '/fb-phone-deals',
      sid: 157,
      ssid: 157,
      source:'taboola',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def social_phone_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'social-phone-deals',
      optin_url: '/social-phone-deals',
      sid: 157,
      ssid: 1,
      source:'Duke-FB',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def mega_phone_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'mega-phone-deals',
      optin_url: '/mega-phone-deals',
      sid: 15643,
      ssid: 1,
      source:'mega-HR',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def youtube
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://deals.megamobiledeals.com/youtube-success',
      form_name: 'youtube',
      optin_url: '/youtube',
      sid: nil,
      ssid: nil,
      source: nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def youtube_success
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'youtube-success',
      optin_url: '/youtube-success',
      sid: nil,
      ssid: nil,
      source: nil,
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def step_form
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Mega-Mobile-Deals',
      optin_url: '/stepform',
      sid: nil,
      ssid: nil,
      source:'Google',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def step_form_sim_deal_only
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Mega-Mobile-Deals',
      optin_url: '',
      sid: nil,
      ssid: nil,
      source:'three-sim-amp',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def sim_deal_only
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'sim-deal-only',
      optin_url: '/sim-deal-only',
      sid: nil,
      ssid: nil,
      source:'three-sim',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def exclusive_sim_deal
     @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'exclusive_sim_deal',
      optin_url: '/exclusive-sim-deal',
      sid: nil,
      ssid: nil,
      source:'three-sim',
      quick_submit: false,
      submit_on_load: true,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def exclusive_top_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'exclusive-top-deals',
      optin_url: '/exclusive-top-deals',
      sid: nil,
      ssid: nil,
      source:nil,
      quick_submit: false,
      submit_on_load: true,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def credit_report
    @details = {
      camp_id: 'GUY-CREDIT-REPORT',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Credit-Report',
      optin_url: '/credit-report',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def e_deals
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://bill-switchers.com/sp-exit?exit=1',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'e_deals',
      optin_url: '/e_deals',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end
  def e_deals_awin
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://bill-switchers.com/sp-exit?exit=1',
      bad_success_url: '/rmktg-awin',
      form_name: 'e-deals-awin',
      optin_url: '/e-deals-awin',
      sid: 1,
      ssid: nil,
      source:'',
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

  def rmktg_awin
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'rmktg-awin',
      optin_url: '/rmktg-awin',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: true,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def rmktg_awin2
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'rmktg-awin2',
      optin_url: '/rmktg-awin2',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: true,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def rmktg_sweet
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'rmktg-sweet',
      optin_url: '/rmktg-sweet',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: true,
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

  def lotto
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://bill-switchers.com/sp-exit?exit=1',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'Lotto',
      optin_url: '/lotto',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
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

  def e_deals_voxi
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://bill-switchers.com/sp-exit?exit=1',
      bad_success_url: 'https://www.awin1.com/cread.php?awinmid=10951&awinaffid=652417&ued=https%3A%2F%2Fwww.voxi.co.uk%2Facquisition%2Fplans',
      form_name: 'e-deals-voxi',
      optin_url: '/e-deals-voxi',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def e_deals_e2save
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://bill-switchers.com/sp-exit?exit=1',
      bad_success_url: 'https://www.awin1.com/cread.php?awinmid=422&awinaffid=652417&clickref=social-exit&ued=https%3A%2F%2Fwww.e2save.com%2F',
      form_name: 'e-deals-e2save',
      optin_url: '/e-deals-e2save',
      sid: 1,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def voxi
    @details = {
      camp_id: '',
      success_url: '/voxi-success',
      bad_success_url: '/voxi-success',
      form_name: 'voxi',
      optin_url: '/voxi',
      sid: nil,
      ssid: nil,
      source:'',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json
  end

  def voxi_tc
    @details = {
      camp_id: '',
      success_url: '/voxi-success',
      bad_success_url: '/voxi-success',
      form_name: 'voxi-tc',
      optin_url: '/voxi-tc',
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
      success_url: '/success2?check=1',
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
    @phones = [
     {
        name: "iPhone 11 Pro 256 GB",
        data: "Unlimited",
        image: "phone/iphone11pro.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
     {
        name: "iPhone 11 256 GB",
        data: "Unlimited",
        image: "phone/iphone11.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Samsung Galaxy Fold 5G 256 GB",
        data: "Unlimited",
        image: "phone/samsung-galaxy-fold.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "iPhone XR",
        data: "Unlimited",
        image: "phone/iphonexr.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "iPhone X 256 GB",
        data: "Unlimited",
        image: "phone/x.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Samsung S10+ 256 GB",
        data: "Unlimited",
        image: "phone/samsungs10plus.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Samsung S9 256 GB",
        data: "Unlimited",
        image: "phone/samsungs9.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Samsung S10 256 GB",
        data: "Unlimited",
        image: "phone/samsungs10.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "iPhone 8",
        data: "Unlimited",
        image: "phone/iphone8.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Samsung Note 10 128GB",
        data: "Unlimited",
        image: "phone/samsungnote10.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      },
      {
        name: "Huawei P30 Pro",
        data: "Unlimited",
        image: "phone/huaweip30.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0"
      }
    ]

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

    @phonesfbdeals = [
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

    @phonescompare = [
     {
        name: "iPhone 11 Pro 256 GB",
        data: "Unlimited",
        image: "phone/iphone11pro.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
     {
        name: "iPhone 11 256 GB",
        data: "Unlimited",
        image: "phone/iphone11.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Samsung Galaxy Fold 5G 256 GB",
        data: "Unlimited",
        image: "phone/samsung-galaxy-fold.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "iPhone XR",
        data: "Unlimited",
        image: "phone/iphonexr.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "iPhone X 256 GB",
        data: "Unlimited",
        image: "phone/x.jpg",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Samsung S10+ 256 GB",
        data: "Unlimited",
        image: "phone/samsungs10plus.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Samsung S9 256 GB",
        data: "Unlimited",
        image: "phone/samsungs9.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Samsung S10 256 GB",
        data: "Unlimited",
        image: "phone/samsungs10.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "iPhone 8",
        data: "Unlimited",
        image: "phone/iphone8.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Samsung Note 10 128GB",
        data: "Unlimited",
        image: "phone/samsungnote10.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      },
      {
        name: "Huawei P30 Pro",
        data: "Unlimited",
        image: "phone/huaweip30.png",
        calls: "Unlimited",
        texts: "Unlimited",
        deposit: "£0",
        bigdic: "Big Discount!"
      }
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

    @voxideals = [
      {
        name: "12GB Plan",
        data: "12GB",
        monthly: "10",
      },
      {
        name: "15GB Plan",
        data: "15GB",
        monthly:"15",
      },
      {
        name: "45GB Plan",
        data: "45GB",
        monthly: "20",
      },
      {
        name: "Endless Data",
        data: "Unlimited",
        monthly: "35",
      },
    ]
  end
end
