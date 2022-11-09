class PagesController < ApplicationController
  include PagesHelper
  include SweetMobileHelper
  before_action :set_cookies
  before_action :deals_list
  skip_before_action :verify_authenticity_token, only: [:submit_lead]


  def index
    new_mobile_data()
    # get_deals_data('home')
    # @bc = isbadCustomer(params[:keyword]) || params[:bc] == "yes"
	end

	def show
    get_deals_data(params[:page_name])
    respond_to do |format|
      format.html {@partial = render_to_string partial: params[:page_name].to_s}
      format.js {}
    end
    if params[:page_name] == 'rmktg-awin'
      url = "/rmktg-awin2?"+params.to_unsafe_h.to_query
      redirect_to url
    end
	end

  def deals_list
    url = "https://mobilematcher.co.uk/deals/fetch"
    uri = URI(url)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    req = Net::HTTP::Get.new(url)
    res = http.request(req)
    puts "response #{res.body}"
    json = JSON.parse(res.body)
    @phoneshome = json['data']
  end

  def data_share
    response.headers.except! 'X-Frame-Options'
    render layout: "data_share"
  end

  def exclusive_o2_deals
    exclusive_o2_deal
    fetch_products('o2')
  end

  def exclusive_ee_deals
    exclusive_ee_deal
    fetch_products('ee')
  end

  def ee_deals
    ee_deal
    fetch_products('ee')
  end

  def exclusive_tribe_deals
    exclusive_tribe_deal
    fetch_products('tribe')
  end

  def exclusive_o2_deals_load
    exclusive_o2_load
    fetch_products('o2')
    RemarketingLeadJob.perform_later(params.permit!)
    DukestoreLeadJob.perform_later(params.permit!)
  end

  def sim_deals
    get_deals_data('sim_deal')
  end

  def sim_deals_v2
    sim_deal_v2
  end

  def fetch_products(company)
    @products = Product.where(retailer: company).order(:product_type)
    @products = @products.where(product_type: params[:type]) if params[:type].present?
  end
  def sweet_mobile
    sweet_mobiles
    sweet_deals_data
  end

  def submit_lead
    url = URI.parse('https://leads-inst47-client.phonexa.uk/lead/')
    http = Net::HTTP.new(url.host, url.port)
    http.use_ssl = true
    api_id, api_password = get_api_credentials
    data = {
      "firstName": params[:firstName],
      "lastName": params[:lastName],
      "email": params[:email],
      "mobilePhone": params[:mobilePhone],
      "postCode": params[:postCode],
      "street": params[:street],
      "city": params[:city],
      "price": params[:price],
      "productId":  params[:productId],
      "houseNumber": params[:houseNumber],
      "houseName": params[:houseName],
      "dob": params[:dob],
      "titleId": params[:titleId],
      "employmentStatus": params[:employmentStatus],
      "handset": params[:handset],
      "apiId": api_id,
      "apiPassword": api_password,
      "source": params[:source],
      "userIp": request.remote_ip,
      "userAgent":  params[:userAgent],
      "clickid": params[:clickid],
      "webSiteUrl": params[:webSiteUrl]
    }
    request = Net::HTTP::Post.new(url.path, {'Content-Type' => 'application/json'})
    request.body = data.to_json

    response = http.request(request)

    render json: {data: JSON.parse(response.body)}
  end

  private
  def set_cookies
    @cookie_uuid =  cookies[:_msuuid_1fexuyzkduuouz] || "SS#{SecureRandom.uuid}"
    cookies[:_msuuid_1fexuyzkduuouz] = {
      value: @cookie_uuid,
      expires: 1.year.from_now,
      secure: false,
      httponly: false,
    }
  end
  def new_mobile_data
    @details = {}
    @deals_list = [
      {
        productId: "179",
         image: "phones/iphone14.jpeg",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "iPhone 14	- 128GB",
        monthly:"36",
        button: "Continue",
        color: ["#676562","#f7f8f2","#fbe9d2","#a2c1dd"],
      },
      {
        productId: "169",
         image: "phones/iphone13.jpeg",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "iPhone	13	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#a2c1dd","#f7f8f2","#fbe9d2","#676562"],
      },
      {
        productId: "170",
         image: "phones/iphone13mini.jpeg",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "iPhone	13	Mini	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#a2c1dd","#f7f8f2","#fbe9d2","#676562"],
      },
      {
        productId: "78",
         image: "phones/iphonexr.jpeg",
        img_class: "w-38 mb-2",
        data: "Unlimited",
        title: "iPhone	XR	– 64GB",
        monthly:"24",
        button: "Continue",
        color: ["#a2c1dd","#f7f8f2","#fbe9d2","#676562"],
      },
      {
        productId: "123",
         image: "phones/iphonese.jpeg",
        img_class: "w-50 mb-2",
        data: "Unlimited",
        title: "iPhone	SE	– 64GB",
        monthly:"24",
        button: "Continue",
        color: ["#dcb5b3","#211e16","#a5a8c4","#c2c9d5","#cc333d"],
      },
      {
        productId: "178",
         image: "phones/s22-5g.jpeg",
        img_class: "w-61 mb-2",
        data: "Unlimited",
        title: "Galaxy	S22	5G	– 128GB ",
        monthly:"24",
        button: "Continue",
        color: ["#c2c9d5","#211e16","#5f4e4b","#6e7074","#3a414a"],
      },
      {
        productId: "158",
         image: "phones/galaxy-s21.png",
        img_class: "w-48 mb-3",
        data: "Unlimited",
        title: "Galaxy	S21	5G	– 128GB",
        monthly:"12",
        button: "Continue",
        color: ["#6e7074","#efc5be","#a5a8c4","#e9e9e7"],
      },
      {
        productId: "155",
         image: "phones/s20-fe-5g.jpeg",
        img_class: "w-35 mb-3",
        data: "Unlimited",
        title: "Galaxy	S20	Fe	5G	– 128GB",
        monthly:"36",
        button: "Continue",
        color: ["#e3deca","#2d2926","#435551","#bfb1d2"],
      },
      {
        productId: "160",
         image: "phones/s20-fe.jpeg",
        img_class: "w-94 mb-3",
        data: "Unlimited",
        title: "Galaxy	S20	FE	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#fae5c8","#2b4552","#e6e7e0","#454342"],
      },
      {
        productId: "161",
         image: "phones/a52-5g.jpeg",
        img_class: "w-40 mb-3",
        data: "Unlimited",
        title: "Galaxy	A52	5G	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "165",
         image: "phones/a32-5g.jpeg",
        img_class: "w-40 mb-3",
        data: "Unlimited",
        title: "Galaxy	A32	5G	– 64GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "162",
         image: "phones/a42-5g.jpeg",
        img_class: "w-40 mb-3",
        data: "Unlimited",
        title: "Galaxy	A42	5G	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "173",
         image: "phones/pixel5.jpg",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "Google	Pixel	5	5G	– 256GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "177",
         image: "phones/google-pixel-4a-5g.jpg",
        img_class: "w-40 mb-3",
        data: "Unlimited",
        title: "Google	Pixel	4A	5G	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "175",
         image: "phones/pixel4a.jpg",
        img_class: "w-30 mb-3",
        data: "Unlimited",
        title: "Google	Pixel	4A	– 128GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "174",
         image: "phones/p40-pro.png",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "Huawei	P40	Pro	5G	256GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "152",
         image: "phones/p40.png",
        img_class: "w-50 mb-3",
        data: "Unlimited",
        title: "Huawei	P40	– 256GB",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
      {
        productId: "176",
         image: "phones/P40-lite.jpg",
        img_class: "w-36 mb-3",
        data: "Unlimited",
        title: "Huawei	P40	Lite	– 128GB ",
        monthly:"24",
        button: "Continue",
        color: ["#2b4552","#fae5c8","#454342","#e6e7e0"],
      },
    ]
  end

  def get_api_credentials
    pub_id = params[:pub].to_i
    api_key=''
    api_password=''
    if pub_id == 132
      api_key, api_password = '0F45A41BA83347E892B99209E9487E9E', '5813061'
    elsif pub_id == 136
      api_key, api_password = '62D512CE83A84D1CB946886F8DBA2CD4', 'c314b28e76'
    elsif pub_id == 137
      api_key, api_password = '8F316CF6D4A84CC3957CE2DB546DCCA6', 'cb6993b'
    else
      api_key, api_password = 'C172389047E348F48D370CC93890A31E', 'f047c36'
    end
    return api_key, api_password
  end
end
