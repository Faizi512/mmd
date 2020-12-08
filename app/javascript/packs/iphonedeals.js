import Common from "./common.js"

class IphoneDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()


    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( ".btn-deal-iphone" ).click(() => {
      $('#dealform').parsley().whenValidate({
          group: 'block-0'
      }).done(function() {
        CI.mmdLead();
        CI.successUrl();
      })
    });
  }

  urlSelection(){

    if(this.deliveryName == "Exit 1 (Energy)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Exit 2 (Credit)"){
      window.location = this.details.success_url+this.paramsforSuccess()
    }else if(this.deliveryName == "Exit 4 (sweetmobile)"){
      window.location = this.details.success_url
    }else if(this.deliveryName == "Exit 5 (UK Credit Ratings)"){
      window.location = this.details.success_url+this.paramsforSuccess()
    }else if(this.deliveryName == "Exit 8 (Energy / Awin)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Exit Lotto"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "(Energy / Voxi)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "(Energy / E2Save)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Voxi Exit"){
      window.location = this.details.success_url
    }else if(this.deliveryName == "Exit 10 (E 2 Save)"){
      window.location = this.details.success_url
    }else if(this.deliveryName == "Exit Sweet-Mobile"){
      window.location = this.details.success_url+this.paramsforSuccess()
    }else{
      window.location = this.details.success_url+this.additionalParamsFoBC()
    }
  }

  successUrl(){
    var CI = this;
    $("#loaderPopup").css('height', '100%')
    setTimeout(function(){
      if (CI.redirectUrl) {
        CI.urlSelection()
      }else {
        CI.successUrl()
      }
    }, 1000)
  }

  mmdLead(){
    $("#loaderPopup").css('height', '100%')
    if (this.isPhone == true && this.isEmail == true){
      this.postMMDData()
    }else{
      $('#dealform').parsley().validate()
    }
  }

  postMMDData() {
    var data = this.getData();
    $( ".progress").hide()
    $(".postcode_holder").html($(".postcode").val() || this.getUrlParameter("postcode")  || "");
    // Form Submisson
    this.updateFacebookAudience(data)
    this.submitLead(data, this.details.camp_id)
  }

  submitLead(formData, campid){
    var CI = this
    $.ajax({
      type: "POST",
      url: "https://go.webformsubmit.com/dukeleads/waitsubmit?key=eecf9b6b61edd9e66ca0f7735dfa033a&campid=" + campid,
      data: formData,
      success: function(data) {
        console.log(data)
        if(data.code == 1 && data.records[0].status != "Rejected"){
           window.location = "/ee-success?device=iPhone12"
        }else{
          CI.sendMmdExitLead()
        }
      },
      error: function(error){
        console.log(error)
        window.location = "https://mtrk11.co.uk/?a=14118&c=33110"
      },
      dataType: "json"
    })
    this.firePixel()
  }

  getData() {
    var track = "";
    try {
      track = AnyTrack('formSubmit') || "";
    }
    catch (e) {}

    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || 'unknown',
      towncity: this.getUrlParameter('towncity') || $(".towncity").val() || 'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || this.details.source || 'google3',
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      url_with_params: window.location.href,
      ipaddress: this.ip_Address,
      uu_id: this.details.uu_id,
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      anytrack: track,
      utm_source: this.getUrlParameter('utm_source'),
      tps_result: this.tps_result,
      apidown: this.apiDown,
      user_agent: window.navigator.userAgent,
    };
  }

}
export default new IphoneDeals();
