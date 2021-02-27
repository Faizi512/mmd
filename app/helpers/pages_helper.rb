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

  def step_form
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'step-form',
      optin_url: '/step-form',
      sid: nil,
      ssid: nil,
      source:'step-form',
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

  def sim_deal
    @details = {
      camp_id: 'SIMO2',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      form_name: 'sim-deals',
      optin_url: '/sim-deals',
      sid: nil,
      ssid: nil,
      source:'sim-deals',
      quick_submit: false,
      submit_on_load: false,
      uu_id: @cookie_uuid,
    }.to_json

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

  def get_deals_data url_name
    send(url_name.gsub('-', '_')) rescue home
  end
end
