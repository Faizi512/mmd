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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
    }.to_json
  end

  def loan_decline
    @details = {
      camp_id: 'MEGA-MOBILE-DEALS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
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
      ipaddress: request.remote_ip,
    }.to_json
  end

  def accept_mobiles
    @details = {
      camp_id: 'ACCEPT-MOBILE-LEADS',
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
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
      ipaddress: request.remote_ip,
    }.to_json
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
        name: "iPhone 12",
        image: "iphone_12_black.png"
      },
      {
        name: "iPhone 11",
        image: "phone/iphone11.png",
      },
      {
        name: "Galaxy S20",
        image: "phone/samsung-galaxy-s20-plus.png"
      },
      {
        name: "iPhone XS",
        image: "phone/iphonexs.png"
      },
      {
        name: "Galaxy S10",
        image: "phone/samsungs10.png"
      },
      {
        name: "iPhone 11 Pro",
        image: "phone/iphone11pro.png"
      },
      {
        name: "Note 20 5G",
        image: "phone/note-20.jpg"
      },
      {
        name: "Samsung A20",
        image: "phone/samsung-a20.png"
      },
      {
        name: "Galaxy S20 5G",
        image: "phone/galaxy-s20-5g.png"
      },
      {
        name: "iPhone SE 128GB",
        image: "phone/iphonese.jpg"
      },
      {
        name: "S20 Ultra 5G",
        image: "phone/samsung-galaxy-s20-ultra-black.png"
      },
      {
        name: "Huawei P30",
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
        name: "iPhone 12",
        btnt_text: "Exclusive Deal",
        image: "iphone_12_black.png"
      },
      {
        name: "iPhone 11",
        btnt_text: "Get Deal",
        image: "phone/iphone11.png",
      },
      {
        name: "Galaxy S20",
        btnt_text: "Exclusive Deal",
        image: "phone/samsung-galaxy-s20-plus.png"
      },
      {
        name: "iPhone XS",
        btnt_text: "Get Deal",
        image: "phone/iphonexs.png"
      },
      {
        name: "Galaxy S10",
        btnt_text: "Get Deal",
        image: "phone/samsungs10.png"
      },
      {
        name: "iPhone 11 Pro",
        btnt_text: "Get Deal",
        image: "phone/iphone11pro.png"
      },
      {
        name: "Note 20 5G",
        btnt_text: "Exclusive Deal",
        image: "phone/note-20.jpg"
      },
      {
        name: "Samsung A20",
        btnt_text: "Get Deal",
        image: "phone/samsung-a20.png"
      },
      {
        name: "Galaxy S20 5G",
        btnt_text: "Get Deal",
        image: "phone/galaxy-s20-5g.png"
      },
      {
        name: "iPhone SE 128GB",
        btnt_text: "Get Deal",
        image: "phone/iphonese.jpg"
      },
      {
        name: "S20 Ultra 5G",
        btnt_text: "Get Deal",
        image: "phone/samsung-galaxy-s20-ultra-black.png"
      },
      {
        name: "Huawei P30",
        btnt_text: "Exclusive Deal",
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
      success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
      bad_success_url: 'https://mtrk11.co.uk/?a=14118&c=33110',
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
