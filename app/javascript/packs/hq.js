import Common from "./common.js"
class HQ extends Common {
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
    this.showTab(this.currentTab);
    $('.carousel').carousel({
      interval: 2000,
    });
    $( ".property" ).change(function() {
      CI.TogglePopUp()
      CI.ToggleCheckBox()
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("house-number"))
      $('.street2').val($(this).find("option:selected").data("street2"))
      $('.building').val($(this).find("option:selected").data("building"))
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( ".btn-continue" ).click(() => {
      CI.nextStep(1)
    });

    $( ".btn-back" ).click(function() {
      CI.backStep(-1)
    });
  }

  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*33)+"%";
    }
  }

  postData() {
    var data = this.getData();
    debugger
    $.ajax({
      type: "POST",
      url: "/submit_lead",
      data: {
        "firstName": data.firstname,
        "lastName": data.lastname,
        "email": data.email,
        "mobilePhone": data.phone1,
        "postCode": data.postcode,
        "street": data.street1,
        "city": data.towncity,
        "houseName": data.street1,
        "houseNumber": data.street1,
        "productId": "176",
        "price": "0",
        "dob": data.dob,
        "titleId": data.titleId,
        "employmentStatus": data.employmentStatus,
        "handset": data.handset,
        "source": data.source,
        "userAgent": data.user_agent,
        "clickid": data.clickid,
        "pub": data.pub,
        "webSiteUrl": window.location.href,
        "county": data.county,
        "residentialStatus": data.residentialStatus,
        "age": data.age,
      },
      success: function(data) {
        debugger
        if(data.data.redirect_url != "" &&  data.data.redirect_url != undefined && data.data.redirect_url != null) {
          window.location.href = data.data.redirect_url
        }
        if(data.data.rejectUrl != ""  &&  data.data.rejectUrl != undefined && data.data.rejectUrl != null)
          window.location.href = data.data.rejectUrl
        
        console.log(data)
      },
      error: function (jqXhr, textStatus, errorMessage) { // error callback 
        console.log(textStatus)
        console.log(errorMessage)
      },
      dataType: "json"
    })
  }

  handleCreditCheckConsent(){
    if ( $('#credit-check').is(':checked') == true) {
      window.open('https://secure.uk.rspcdn.com/xprr/red/PID/2626/SID/'+this.getSid()+'?check=1'+ this.parmsforCreditReport(), "_blank");
    }
  }



  getData() {
    var track = "";
    try {
      track = AnyTrack('formSubmit') || "";
    }
    catch (e) {}
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      age: this.getUrlParameter('age') || '',
      county: this.getUrlParameter('county') || '',
      residentialStatus: this.getUrlParameter('residentialStatus') || '',
      dob: this.getUrlParameter('dob') || '',
      titleId: this.getUrlParameter('titleId') || $(".titleId").val() || '',
      employmentStatus: this.getUrlParameter('employmentStatus') || $(".employmentStatus").val() || '',
      clickid: this.getUrlParameter('gclid') || "",
      pub: this.getUrlParameter("pub") || '',
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || 'unknown',
      street2: this.getUrlParameter('street2') || $(".street2").val() || 'unknown',
      building: this.getUrlParameter('building') || $(".building").val() || 'unknown',
      towncity: this.getUrlParameter('towncity') || $(".towncity").val() || 'unknown',
      sid: this.getUrlParameter('sid') || 722,
      ssid: this.getUrlParameter('ssid') || 1,
      ad_set: this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || 'social',
      traffictype: 'social',
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com/hq',
      url_with_params: window.location.href,
      ipaddress: this.details.ipaddress,
      uu_id: this.details.uu_id,
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      anytrack: track,
      utm_source: this.getUrlParameter('utm_source'),
      matchtype: this.getUrlParameter('matchtype') || "",
      tps_result: this.tps_result,
      apidown: this.apiDown,
      conversion_token: this.details.token,
      user_agent: window.navigator.userAgent,
      lead_from_local_storage: this.userStorage,
      adopted_url: this.adoptedUrl,
      campaign_name: this.details.camp_id,
      device:this.device || '',
      device_browser:this.deviceBrowser || '',
      devive_search_engine:this.deviveSearchEngine || '',
      device_brand:this.deviceBrand || '',
      device_name:this.deviceName || '',
      incometype: this.getUrlParameter("incometype") || '' ,
      residentialstatus: this.getUrlParameter("residentialstatus") || '' ,
      clearStorage: false
    };
  }

}
export default new HQ();
