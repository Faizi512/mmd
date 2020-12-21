import Common from "./common.js"

class MMDLoansSMS extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()
 
    $('.carousel').carousel({
      interval: 2000
    })

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( "#quicksubmit" ).click(() => {
      $(".btn-success").addClass("in-progress")
      $('#dealform').parsley().whenValidate({
        group: 'block-0'
      }).done(() =>{
        CI.postMMDData()
        CI.successUrl();
      })
    });

    $(document).on("click", '.open-form', function() {
      CI.phoneName = $(this).find('input').val()
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
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
    setTimeout(function(){
      if (CI.redirectUrl) {
        CI.urlSelection()
      }else {
        CI.successUrl()
      }
    }, 1000)
  }

  postMMDData() {
    var data = this.getData();
    $(".postcode_holder").html($(".postcode").val() || this.getUrlParameter("postcode")  || "");
    // Form Submisson
    this.updateFacebookAudience(data)
    this.submitLead(data, this.details.camp_id)
    this.sendMmdExitLead()
    $("#loaderPopup").css('height', '100%')
    if(!this.getBcFromParams()){
      this.successUrl()
    }
  }

  getData() {
    var track = "";
    try {
      track = AnyTrack('formSubmit') || "";
    }
    catch (e) {}
    this.redirected_user = this.getUrlParameter('firstname') || $(".first_name").val()
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: $(".postcode").val() || this.getUrlParameter('postcode') || '',
      firstname: $(".first_name").val() || this.getUrlParameter('firstname') || '',
      lastname:  $(".last_name").val() || this.getUrlParameter('lastname') || '',
      email:  $(".email").val() || this.getUrlParameter('email') || '',
      phone1:  $(".phone").val() || this.getUrlParameter('phone1') || '',
      street1:  $(".street1").val() || $(".address").val() || this.getUrlParameter('street1') || 'unknown',
      towncity:  $(".towncity").val() || this.getUrlParameter('towncity') || 'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      handset: this.phoneName || this.getUrlParameter('handset') || '',
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
export default new MMDLoansSMS();