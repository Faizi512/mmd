import 'flipclock/dist/flipclock.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import "parsleyjs";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
// import ActionCable from './redirect_url_connection.js'
import CableReady from 'cable_ready'
import App from '../channels/consumer.js'
import _ from 'lodash'


class Common {
  constructor() {
    Sentry.init({
      dsn: "https://335f4f951f3b40f4889ac4fc120bfdb7:b27eab222bfd4d8a9ff474ed658451ed@o423834.ingest.sentry.io/5354739",
      release: "Mega Mobile Deals@" + process.env.npm_package_version,
      integrations: [new Integrations.BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,

    });
    var CI = this;
    this.formValidation = {}
    this.isEmail =false
    this.isPhone =false
    this.apiDown = false
    this.ip_Address = '';
    this.currentTab = 0;
    this.submtForm = false;
    this.details = {};
    this.tps_result = null
    this.redirectUrl = null
    this.fetchRequest = 0
    this.deliveryName = null
    this.phoneName = null
    this.networkName= null
    this.device=null
    this.deviceBrowser=null
    this.deviveSearchEngine=null
    this.debiceBrand=null
    this.deviceName=null
    this.formResponse=null
    this.allowedNetworks=["vodafone","3"]
    this.allowedDevices=["iphone10","iphone11"," galaxy S10"]

    $.getJSON('https://ipapi.co/json/', function(data) {
      if (data != null && data.ip != undefined && typeof (data.ip) == "string") {
        CI.ip_Address = data.ip;
      }
    });

    $('#deal-form-modal').on('hide.bs.modal', function (e) {
      $('.clock').show()
    });

    window.FontAwesomeConfig = {
      searchPseudoElements: true
    }
  }

  // Start Action Cable
  subscribeToRedirectUrl(channel) {
    console.log(channel)
    console.log("channel anme")
    const split = channel.split('_')
    var CI = this
    CI.channelName = split[0]
    this.room = split[1]

    if (!_.isNull(this.channelName) && !_.isUndefined(this.channelName)) {
      this.channelName = App.subscriptions.create(
        { channel: this.channelName  , room: this.room },
        {
          received: (data) => {
            console.log(data)
            CI.exitUrl(data)
          },
        }
      )
    }
  }

  unsubscribeToRedirectUrl() {
    if (_.isUndefined(this.channelName)) {
      this.channelName.unsubscribe()
    }
  }

  subscribeChannel(){
    this.channel_token = this.details.uu_id
    this.subscribeToRedirectUrl(`RedirectUrlChannel_${this.channel_token}`)
  }

  // End Action Cable

  popupTerms(){
    $( ".close-b" ).click(function() {
      $('.modal2').hide();
    });

    $('.term-text').click(function(){
      $('.modal2').show();
    });
  }
  popupPrivacy(){
    $( ".close-bu" ).click(function() {
      $('.modal3').hide();
    });

    $('.privacy-text').click(function(){
      $('.modal3').show();
    });
  }
  getFormDetails(form){
    var data = $(form)[0].dataset.details
    this.details = JSON.parse(data)
  }
  showCircle(){
    $(".btn-success").addClass("in-progress")
  }
  showToolTip(){
    $('[data-toggle="tooltip"]').tooltip();
  }

  showClock(){
    var clockElement = $(".clock");
    var clock = new FlipClock(clockElement, 6600, {
        countdown: true
    })
  }

  //Start Sentry error handling logic
  sentryNotification(error, response , message){
    Sentry.withScope(function(scope) {
      scope.setLevel(error);  // on error "critical", on timout api "info",
      scope.setContext('Error Details', {response})
      Sentry.captureException(new Error(message), scope);
    });
  }
  //Start Sentry error handling logic


  // Start SwitchUk Logic
  redirectTOSwitchuk(first_name){
    if (this.allowedNetworks.includes(this.networkName)) {
      window.location='https://switchuk.uk'
    }else if (this.allowedDevices.includes(this.device)) {
      window.location='https://switchuk.uk/'
    }
    else{
     window.location=`https://megamobiledeals.com/credit_check?name=${first_name}`
    }
  }
  deviceDetection(){
    this.device=FRUBIL.device.class_code   //Desktop
    this.deviceBrowser=FRUBIL.client.class_code // Browser
    this.deviveSearchEngine=FRUBIL.client.name_code // Chrome
    this.debiceBrand=FRUBIL.device.brand_code // Samsung
    this.deviceName=FRUBIL.device.marketname_code // Galaxy A5
  }
  // End SwitchUk Logic



// Start Validations Logic
  validateTsp(){
    var CI = this
    if (this.tps_result == null) {
      var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/tps?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.phone').val())
      return xhr.then(function(json) {
        CI.tps_result =  json.status
      })
    }
  }

  validate(form){
    this.formValidation = $(form).parsley({
        trigger: "focusout",
        errorClass: 'error',
        successClass: 'valid',
        errorsWrapper: '<div class="parsley-error-list"></div>',
        errorTemplate: '<label class="error"></label>',
        errorsContainer (field) {
          if(field.$element.hasClass('approve')){
            return $('.error-checkbox')
          }
          if(field.$element.hasClass('postcode')){
            return $('.postcode-error')
          }
          if(field.$element.hasClass('error-on-button')){
            return $(field.element.closest(".tab").querySelector(".error-box"))
          }
          return field.$element.parent()
        },
    })

    this.validatePhone()
    this.validateEmail()
    this.validatePostcode()
    this.validateApiPostcode()
  }

  validatePhone(){
    var CI = this
    window.Parsley.addValidator('validphone', {
      validateString: function(value){
        var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/mobile?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.phone').val())
        return xhr.then(function(json) {
          CI.validateTsp()
          var skipresponse = ["EC_ABSENT_SUBSCRIBER", "EC_ABSENT_SUBSCRIBER_SM", "EC_CALL_BARRED", "EC_SYSTEM_FAILURE","EC_SM_DF_memoryCapacityExceeded", "EC_NO_RESPONSE", "EC_NNR_noTranslationForThisSpecificAddress", "EC_NNR_MTPfailure", "EC_NNR_networkCongestion"]
          if (skipresponse.includes(json.response) ) {
            CI.isPhone = true
            return true
          }
          else if (json.status == "Valid") {
            CI.isPhone = true
            // CI.networkName=json.hlr_data.orn.split(" ")[0]
            // console.log(CI.networkName)
            return true
          }else if(json.status == "Invalid"){
            return $.Deferred().reject("Please Enter Valid UK Phone Number");
          }else if(json.status == "Error"){
            CI.isPhone = true
            CI.sentryNotification("critical", json , "PHONE: Error Some network api is down")
            return true
          }else{
             CI.sentryNotification("info", json , "PHONE: Error other than the ApiDown")
            CI.isPhone = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid UK Phone Number") {
            return $.Deferred().reject("Please Enter Valid UK Phone Number")
          }else{
            CI.isPhone = true
            CI.sentryNotification("critical", e , "PHONE: Error API Down")
            return true
          }
        });
      },
      messages: {
         en: 'Please Enter Valid UK Phone Number',
      }
    });
  }

  validateEmail(){
    var CI = this
    window.Parsley.addValidator('validemail', {
      validateString: function(value){
        var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/email?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.email').val())
        return xhr.then(function(json) {
          if (json.status == "Valid") {
            CI.isEmail = true
            return true
          }else if(json.status == "Invalid"){
            return $.Deferred().reject("Please Enter Valid Email Address");
          }else{
            CI.sentryNotification("info", json , "EMAIL: Error other than the ApiDown")
            CI.isEmail = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid Email Address") {
            return $.Deferred().reject("Please Enter Valid Email Address")
          }else{
            CI.isEmail = true
            CI.sentryNotification("critical", e , "EMAIL: Error API Down")
            return true
          }
        });
      },
      messages: {
         en: 'Please Enter Valid Email Address',
      }
    });
  }

  validatePostcode(){
    window.Parsley.addValidator('validPostcode', {
      validateString: function(value){
       return /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/i.test(value);
      },
      messages: {
         en: 'Please Enter Valid UK Postcode',
      }
    });
  }

  validateApiPostcode(){
    var CI = this;
    window.Parsley.addValidator('validapipostcode', {
      validateString: function(value){
       return $.ajax({
          url:`https://api.getAddress.io/find/${$(".postcode").val()}?api-key=NjGHtzEyk0eZ1VfXCKpWIw25787&expand=true`,
          success: function(json){
            if (json.addresses.length > 0) {
              var result = json.addresses
              var adresses = []
               adresses.push( `
                <option
                disabled=""
                selected=""
                >
                Select Your Property
                </option>
              `)
              for (var i = 0; i < result.length; i++) {
                adresses.push( `
                    <option
                    data-street="${result[i].line_1}"
                    data-city="${result[i].town_or_city}"
                    data-province="${result[i].county}"
                    >
                    ${result[i].formatted_address.join(" ").replace(/\s+/g,' ')}
                    </option>
                  `)
                }
                $('#property').html(adresses)
                 $(".address-div").remove();
                $(".property-div").show()
              return true
            }else{
              $(".tab").removeClass("in-progress")
              return $.Deferred().reject("Please Enter Valid Postcode");
            }
          },
          error: function(request){
            if (!request.status == 400) {
              CI.sentryNotification("info", request , "POSTCODE: Error ApiDown")
            }
            console.log(request.statusText)
            request.abort();
            if (request.statusText == "timeout") {
              $(".property-div").remove();
              $(".address-div").show();
            }
          },
          timeout: 5000
        })
      },
      messages: {
         en: 'Please Enter Valid Postcode',
      }
    });
  }

  customValidator(form){
    var tabs = $(".tab");
    if ($('.first_name').val().length < 1
      || $('.last_name').val().length < 1
    ){
      tabs[0].style.display = "block";
      tabs[1].style.display = "none";
      tabs[2].style.display = "none";
      this.currentTab = 0
      $(form).parsley().validate()
      return false
    }else if( $('.postcode').val().length < 3 || $( "#property option:selected" ).val() ==""){
      tabs[1].style.display = "block";
      tabs[0].style.display = "none";
      tabs[2].style.display = "none";
      this.currentTab = 1
      $(form).parsley().validate()
      return false
    }else if($('.email').val().length < 3
      || $('.phone').val().length < 3){
      tabs[2].style.display = "block";
      tabs[0].style.display = "none";
      tabs[1].style.display = "none";
      this.currentTab = 2
      $(form).parsley().validate()
      return false
    }
    return true
  }
// End Validations Logic


// Start Step Form Logic
  showTab(n=0) {
    var tabs = $(".tab");
    if (!tabs[n]) return;
    tabs[n].style.display = "block";
    this.fixStepIndicator(n)
    $(".btn-success").removeClass("in-progress")
    $(".postcode").focus();
  }

  fillform(){
    $(".first_name").val(this.getUrlParameter("firstname") || "");
    $(".last_name").val(this.getUrlParameter("lastname")  || "");
    $(".postcode").val(this.getUrlParameter("postcode")  || "");
    $(".email").val(this.getUrlParameter("email")  || "");
    $(".telephone").val(this.getUrlParameter("phone1") || this.getUrlParameter("mobile") || "");
  }

  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*33)+"%";
      progress.innerText = "Progress " + (num*33) + "%";
      if( num ==  0){
        progress.innerText = '';
      }
    }
  }

  backStep(n){
    if (this.currentTab > 0) {
      $('.nextStep').prop('disabled', false);
      var tabs = $(".tab");
      tabs[this.currentTab].style.display = "none";
      this.currentTab = this.currentTab + n;
      this.showTab(this.currentTab);
    }
  }

  nextStep(n) {
    var CI = this;
    this.showCircle()
    $('#dealform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      if (CI.currentTab >= tabs.length) {
        if (CI.customValidator('#dealform') == true && CI.isPhone == true && CI.isEmail == true){
          $('.but_loader').show()
          $('.nextStep').prop('disabled', true);
          CI.postData()
        }else{
          $('#dealform').parsley().validate()
        }
        return true
      }
      CI.showTab(CI.currentTab);
    })
  }
// End Step Form Logic


// Start Redirect Url Logic
  successUrl(){
    var CI = this;
    setTimeout(function(){
      CI.urlSelection()
    }, 1000)
  }

  urlSelection(){
    if(this.getBcFromParams()){
      window.location = this.details.bad_success_url+this.additionalParamsFoBC()
    }else{
       window.location = this.details.success_url+this.additionalParams()
    }
  }

  redirectIfNoResponse(){
    setTimeout(function(){
      window.location =  "https://mtrk11.co.uk/?a=14118&c=33110"
    }, 20000);
  }

  exitUrl(data){
    var CI = this
    // if lead is accepted
    if(this.formResponse == "success"){
      window.location = this.urlCreator(data.lead.success_params, data.lead.success_url)
    }else if(this.formResponse == "reject"){
      window.location = this.urlCreator(data.lead.reject_params, data.lead.reject_url)
    }else{
      setTimeout(function(){
        CI.exitUrl(data)
      }, 500)
    }
  }

  urlCreator(params, base_url){
    // params = "&email=email&source=source&sid=sid"
    // base_url = "https://megamobiledeals.com"
    var url = []
    var data = this.getData();
    var params_array = _.split(params, '&');  //["", "email=email", "source=source", "sid=sid"]
    _.forEach(params_array, function(param) {
       var key_value = _.split(param, '='); // ["email", "email"]
       if(key_value.length > 1){
         url.push(`${key_value[0]}=${data[key_value[1]]}&`)
       }
    });
    if (base_url.indexOf('?') != -1){ // if base_url contain ?
      return `${base_url}&${_.join(url, "")}`
    }else{
      return `${base_url}?${_.join(url, "")}`
    }
  }
// End Redirect Url Logic



// Start Lead Submit function
  firePixel(){
    if (this.details.camp_id == 'MEGA-MOBILE-DEALS'){
      dataLayer.push({'event': 'transaction'})
    }
  }

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode:  $(".postcode").val() || this.getUrlParameter('postcode') || '',
      firstname:  $(".first_name").val() || this.getUrlParameter('firstname') || '',
      lastname: $(".last_name").val() || this.getUrlParameter('lastname') ||  '',
      email: $(".email").val() || this.getUrlParameter('email') || '',
      phone1: $(".phone").val() || this.getUrlParameter('phone1') ||  '',
      street1: $(".street1").val() || $(".address").val() || this.getUrlParameter('street1') ||  'unknown',
      towncity: $(".towncity").val() || this.getUrlParameter('towncity') ||  'unknown',
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
      gclid: this.getUrlParameter('gclid') || "",
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      traffictype: this.getUrlParameter('traffictype') || "",
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      utm_source: this.getUrlParameter('utm_source'),
      tps_result: this.tps_result,
      apidown: this.apiDown,
      user_agent: window.navigator.userAgent,
    };
  }

  postData() {
    $("#loaderPopup").css('height', '100%')
    // doubel verify tsp
    this.validateTsp()
    // Getting Data
    var CI = this;
    var data = this.getData();
    // Form Submisson
    this.redirectIfNoResponse()
    this.submitLead(data, this.details.camp_id)
    // Redirection after submisson
    this.successUrl()
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
          this.formResponse =  'success'
          dataLayer.push({'transactionId': data.records[0].response.leadId, "transactionTotal": 3})
        }else{
          this.formResponse =  'reject'
        }
      },
      error: function(request){
        CI.sentryNotification("critical", request , "SubmitLead: Error on leadbyte API")
        console.log(request.statusText)
      },
      dataType: "json"
    })
    this.firePixel()
  }
// End Lead Submit function



// Start Date helper
  getFormattedCurrentDate() {
    var date = new Date();
    var day = this.addZero(date.getDate());
    var monthIndex = this.addZero(date.getMonth() + 1);
    var year = date.getFullYear();
    var min = this.addZero(date.getMinutes());
    var hr = this.addZero(date.getHours());
    var ss = this.addZero(date.getSeconds());

    return day + '/' + monthIndex + '/' + year + ' ' + hr + ':' + min + ':' + ss;
  }

  addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
// End Date helper



// Start Paramataer
  getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;
    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }

  getBcFromParams(){
    return this.isBadCustomer(this.getUrlParameter('keyword')) ||  (this.getUrlParameter('bc') == "yes")
  }

  additionalParams(){
    return "&s1=exit-" + this.getSource() + "&s2=" + this.getC1() + "&s3=" + this.getEmail() + "&s4=" + this.getPhone1() ;
  }

  additionalParamsFoBC(){
    return "&s1=exit-" + this.getSource() + "&s2=" + this.getC1() + "&s3=" + this.getEmail() + "&s4=" + this.getPhone1() ;
  }

  paramsforSuccess(){
    return "&houseNumber=" + this.getHouseNumb() + "&county=" + this.getCounty() + "&towncity=" + this.getCity() + "&street1=" + this.getStreet() + "&firstname=" + this.getFirstName() + "&lastname=" + this.getLastName() + "&postcode=" + this.getPostcode() + "&phone1=" + this.getPhone1() + "&email=" + this.getEmail() + "&source=" + this.getSource() + "&c1=" + this.getC1() + "&sid=" + this.getSid() + "&ssid=" + this.getSsid();
  }
  paramsforSuccess2(){
    return "&houseNumber=" + this.getHouseNumb() + "&county=" + this.getCounty() + "&towncity=" + this.getCity() + "&street1=" + this.getStreet() + "&firstname=" + this.getFirstName() + "&lastname=" + this.getLastName() + "&postcode=" + this.getPostcode() + "&phone1=" + this.getPhone1() + "&email=" + this.getEmail() + "&c1=" + this.getC1() + "&sid=" + this.getSid() + "&ssid=" + this.getSsid();
  }
  paramsforSuccesstv(){
    return "&houseNumber=" + this.getHouseNumb() + "&county=" + this.getCounty() + "&towncity=" + this.getCity() + "&street1=" + this.getStreet() + "&firstname=" + this.getFirstName() + "&lastname=" + this.getLastName() + "&postcode=" + this.getPostcode() + "&phone1=" + this.getPhone1() + "&email=" + this.getEmail() + "&c1=" + this.getC1() + "&sid=" + this.getSid() + "&ssid=" + this.getSsid() + "&source=exit";
  }
  parmsforCreditReport(){
    return this.getSid() + "&city=" + this.getCity() + "&straddr=" + this.getStreet()  + "&fname=" + this.getFirstName() + "&lname=" + this.getLastName() + "&zip=" + this.getPostcode() + "&phone=" + this.getPhone1() + "&email=" + this.getEmail();
  }

  getStreet(){
    return this.getUrlParameter('street1') || $(".street1").val() || '';
  }

  getCity(){
    return this.getUrlParameter('towncity') || $(".towncity").val() || '';
  }

  getHouseNumb(){
    return this.getUrlParameter('houseNumber') || $(".houseNumber").val() || '';
  }

  getCounty(){
    return this.getUrlParameter('county') || $(".county").val() || '';
  }

  getC1(){
    return this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '';
  }

  getSid(){
    return this.getUrlParameter('sid') || 1;
  }

  getSsid(){
    return this.getUrlParameter('ssid') || '';
  }

  getSource(){
    return this.getUrlParameter('source') || this.details.source || 'google3';
  }

  getEmail(){
    return this.getUrlParameter('email') || $(".email").val() || '' ;
  }

  getPhone1(){
    return this.getUrlParameter('phone1') || $(".phone").val() || '' ;
  }

  getFirstName(){
    return this.getUrlParameter('firstname') || $(".first_name").val() || '' ;
  }

  getLastName(){
    return this.getUrlParameter('lastname') || $(".last_name").val() || '' ;
  }

  getPostcode(){
    return this.getUrlParameter('postcode') || $(".postcode").val() || '';
  }
// End Paramataer

  isBadCustomer(query) {
    if(query){
      var keywords = ["credit", "accepted", "bad", "score", "sunshine",
                       "no credit", "free", "guaranteed", "gift", "win", "wining", "very",
                       "phone check", "check" , "no upfront", "cheap", "catalogues", "later",
                       "sun", "no deposit", "accepted", "No deposit", "0 deposit"]
      query = query.toLowerCase();
      for(var index in keywords) {
        var word = keywords[index];
        var matchedIndex = query.indexOf(word);
        if (matchedIndex != -1) {
          return true;
          break;
        }
      }
      return false;
    }
  }

}

export default Common;
