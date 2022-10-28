import 'flipclock/dist/flipclock.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import "parsleyjs";
import _ from 'lodash'


class Common {
  constructor() {
    var CI = this;
    this.formValidation = {}
    this.isEmail =false
    this.isPhone =false
    this.apiDown = false
    this.currentTab = 0;
    this.submtForm = false;
    this.details = {};
    this.tps_result = null
    this.redirectUrl = null
    this.fetchRequest = 0
    this.productId = 118
    this.deliveryName = null
    this.phoneName = null
    this.networkName= null
    this.device=null
    this.deviceBrowser=null
    this.deviceSearchEngine=null
    this.debiceBrand=null
    this.deviceName=null
    this.formResponse=null
    this.allowedNetworks=["vodafone","3"]
    this.allowedDevices=["iphone10","iphone11"," galaxy S10"]
    this.userStorage = false
    this.adoptedUrl = ""
    // this.deviceDetection()

    $(window).on("load", function(){
      if (localStorage.getItem('user_data') != null) {
        var adopted_url = JSON.parse(localStorage.getItem('user_data')).adopted_url.split(/[: /]+/)
        adopted_url = adopted_url.length > 1 ? adopted_url[1] : adopted_url[0]
        if (adopted_url == '') {
          adopted_url = adopted_url[0]
        }
        var clearStorgaeData = JSON.parse(localStorage.getItem('user_data')).clearStorage
        if( (adopted_url == 'switch-mobile.co.uk' || adopted_url == 'bill-switchers.com') && ( clearStorgaeData == undefined)){
          localStorage.removeItem('user_data')
        }
      }
    })

    $('#deal-form-modal').on('hide.bs.modal', function (e) {
      $('.clock').show()
    });

    window.FontAwesomeConfig = {
      searchPseudoElements: true
    }
  }
  TogglePopUp() {
    $( ".close-btn1" ).click(function() {
     $('.modal4').hide();
    })
    $('.partner-text').click(function(){
      $('.modal4').show();
    })
  }

  ToggleCheckBox(){
    var chk1 = $("input[type='checkbox'][name='agree']");
    var chk2 = $("input[type='checkbox'][name='partners-tp']");
    chk1.on('change', function(){
      chk2.prop('checked',this.checked);
    });
  }

  updateUserInStorage(){
    var CI=this
    var previousData = this.getItemFromStorage("user_data")
    var currentData = this.getData();
    var userData = _.mergeWith(currentData,previousData, (current, previous) => current == "" || current == "unknown"  ? previous : current)
    CI.setItemToStorage("user_data", userData)
  }

  getItemFromStorage(name){
    return JSON.parse(localStorage.getItem(name))
  }

  setItemToStorage(name, data){
    if (data.adopted_url == "" ||  data.adopted_url == null) {
      data.adopted_url = data.optinurl
    }else{
      this.adoptedUrl = data.adopted_url
    }
    return localStorage.setItem(name, JSON.stringify(data))
  }

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

    $(document).on("click", '.content', function(event) {
      $('[data-toggle="tooltip"]').tooltip('toggle');
    });
  }

  showClock(){
    var clockElement = $(".clock");
    var clock = new FlipClock(clockElement, 6600, {
        countdown: true
    })
  }

  deviceDetection(){
    this.device=FRUBIL.device.class_code   //Desktop
    this.deviceBrowser=FRUBIL.client.class_code // Browser
    this.deviceSearchEngine=FRUBIL.client.name_code // Chrome
    this.deviceBrand=FRUBIL.device.brand_code // Samsung
    this.deviceName=FRUBIL.device.marketname // Galaxy A5
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
            return $.Deferred().reject("Please Enter Valid UK Phone Number");
          }else{
            CI.isPhone = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid UK Phone Number") {
            return $.Deferred().reject("Please Enter Valid UK Phone Number")
          }else{
            CI.isPhone = true
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
            CI.isEmail = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid Email Address") {
            return $.Deferred().reject("Please Enter Valid Email Address")
          }else{
            CI.isEmail = true
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
                    data-street="${result[i].thoroughfare || result[i].line_1}"
                    data-city="${result[i].town_or_city}"
                    data-province="${result[i].county || result[i].town_or_city}"
                    data-street2="${result[i].line_2}"
                    data-building="${result[i].building_name || result[i].sub_building_name || result[i].building_number || result[i].sub_building_number}"
                    data-house-number="${result[i].building_number || result[i].sub_building_number || result[i].building_name || result[i].sub_building_name || result[i].line_1}"
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
      progress.style.width = (num*25)+"%";
      progress.innerText = "Progress " + (num*25) + "%";

      if(Number(num*25) >= 99) {
        this.nextStep(num)
      }

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
    console.log(new Date())
    console.log("NextStep: "+this.currentTab+" "+new Date())
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
    var CI = this;
    setTimeout(function(){
      window.location = `/api/v1/redirect_url?id=1&url=${CI.urlCreator('https://dl.reliatrk.com/?a=2&c=36&s1=exit')}`
    }, 20000);
  }

  exitUrl(data){
    var CI = this
    // if lead is accepted
    if(this.formResponse == "success"){
      window.location = `/api/v1/redirect_url?id=${data.sold_url.id}&url=${this.urlCreator(data.sold_url.url)}`
    }else if(this.formResponse == "reject"){
      window.location = `/api/v1/redirect_url?id=${data.unsold_url.id}&url=${this.urlCreator(data.unsold_url.url)}`
    }else{
      setTimeout(function(){
        CI.exitUrl(data)
      }, 500)
    }
  }

  exitDelivery(){
    var CI = this
    $.ajax({
      type: "GET",
      url: `/api/v1/exit_deliveries?source=${this.getSourceFromURL()}&device=${this.device}`,
      success: function(response) {
        console.log(response)
        CI.exitUrl(response)
      },
      error: function(request){

      },
    })
  }
  urlCreator(redirect_url){
    try {
      var new_url = (new URL(redirect_url))
    }
    catch(err) {
      var new_url = (new URL(location.origin + redirect_url))
    }
    var params = new_url.search.substring("1")
    var base_url = new_url.origin + new_url.pathname
    // params = "&email=[emai]l&source=[source]&sid=[sid]"
    // base_url = "https://megamobiledeals.com"
    var url = []
    if( this.getItemFromStorage("user_data") != null){
      this.updateUserInStorage()
      var data = this.getItemFromStorage("user_data")
    }else{
      var data = this.getData();
    }


    var params_array = _.split(params, '&');  //["", "email=[email]", "source=[source]", "sid=[sid]"]
    _.forEach(params_array, function(param) {
       var key_value = _.split(param, '='); // ["email", "[email]"]
       if(key_value.length > 1 && key_value[1].match(/\[(.*?)\]/)){
         url.push(`${key_value[0]}=${data[key_value[1].match(/\[(.*?)\]/)[1]]}&`) // email
       }else if(key_value.length > 1){
         url.push(`${key_value[0]}=${key_value[1]}&`) // email
       }
    });
    if (base_url.indexOf('?') != -1){ // if base_url contain ?
      return encodeURIComponent(`${base_url}&${_.join(url, "")}`)
    }else{
      return encodeURIComponent(`${base_url}?${_.join(url, "")}`)
    }
  }
// End Redirect Url Logic



// Start Lead Submit function
  firePixel(){
    dataLayer.push({
      'event': 'transaction',
      'email': $(".email").val() || this.getUrlParameter('email') || '',
      'phone': $(".phone").val() || this.getUrlParameter('phone1') ||  '',
      'firstname':  $(".first_name").val() || this.getUrlParameter('firstname') || '',
      'lastname': $(".last_name").val() || this.getUrlParameter('lastname') ||  '',
      'street': $(".street2").val() || $(".address").val() || this.getUrlParameter('street2') ||  'unknown',
      'city': $(".towncity").val() || this.getUrlParameter('towncity') ||  'unknown',
      'country': "United Kingdom",
      'postcode':  $(".postcode").val() || this.getUrlParameter('postcode') || '',
      'region': $(".county").val() || this.getUrlParameter('county') || "",
      'building': $(".building").val() || this.getUrlParameter('building') ||  'unknown'
    })
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
      street2: $(".street2").val() || this.getUrlParameter('street2') ||  'unknown',
      building: $(".building").val() || this.getUrlParameter('building') ||  'unknown',
      county: $(".county").val() || this.getUrlParameter('county') || "",
      country: $(".country").val() || this.getUrlParameter('country') || "",
      title: $(".title").val() || this.getUrlParameter('title') || "",
      dob: $(".dob").val() || this.getUrlParameter('dob') || "",
      towncity: $(".towncity").val() || this.getUrlParameter('towncity') ||  'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      handset:this.getUrlParameter('handset') || this.phoneName || this.productId || '',
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
      ipaddress: this.details.ipaddress,
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
      tier: this.getUrlParameter('tier'),
      lead_from_local_storage: this.userStorage,
      campaign_name: this.details.camp_id,
      adopted_url: this.adoptedUrl,
      // device:this.device || '',
      // device_browser:this.deviceBrowser || '',
      // device_search_engine:this.deviceSearchEngine || '',
      // device_brand:this.deviceBrand || '',
      // device_name:this.deviceName || '',
      incometype: this.getUrlParameter("incometype") || '' ,
      residentialstatus: this.getUrlParameter("residentialstatus") || '' ,
      clearStorage: false,
      employmentStatus: $("#employment_status").val() || "",
      titleId: $("#titleId").val() || "",

    };
  }

  USTransaction(){
    dataLayer.push({'event': 'USTransaction'})
  }

  postData() {
    var CI = this
    $("#loaderPopup").css('height', '100%')
    // this.validateTsp()
    // this.redirectIfNoResponse()
    // this.successUrl()
   
    var data = this.getData();
    var item = {county: this.getUrlParameter("county") || $(".county").val()}
    data = _.mergeWith(item,data, (data, item))
    CI.setItemToStorage("user_data", data)
    console.log("Postdata: "+new Date())
    // this.submitLead(data, this.details.camp_id)
    this.submitLead(data, "")
  
  }

  checkLeadStatus(formData){
    var CI = this
    $.ajax({
      type: "GET",
      url: `/lead_search?phone=${formData.phone1}`,
      success: function(data) {
        console.log(data)
        console.log("checkLeadStatus: "+new Date())
        if (data.match == 0) {
          CI.formResponse =  'success'
        }else{
          CI.formResponse =  'reject'
          // CI.submitAccpedLead(formData)
        }
      },
      error: function(request){
        console.log(request.statusText)
      },
      dataType: "json"
    })
  }

  submitLeadToStore(formData){
    var CI = this
    $.ajax({
      type: "POST",
      url: 'https://dukestore.herokuapp.com/api/v1/lead/',
      dataType: 'json',
      data: {lead: formData},
      success: function(data) {
        console.log(data)
      },
      error: function(request){
        console.log(request.statusText)
      }
    })
  }

  submitLead(formData, campid){
    // this.submitLeadToStore(formData)
    // this.exitDelivery()
    // this.checkLeadStatus(formData)
    debugger
    
    var CI = this
    $.ajax({
      type: "POST",
      url: "/submit_lead",
      data: {
        "firstName": formData.firstname,
        "lastName": formData.lastname,
        "email": formData.email,
        "mobilePhone": formData.phone1,
        "postCode": formData.postcode,
        "street": formData.street1,
        "city": formData.towncity,
        "houseName": formData.street1,
        "houseNumber": formData.street1,
        "apiId": "0F45A41BA83347E892B99209E9487E9E",
        "apiPassword": "5813061",
        "productId": "176",
        "price": "0",
        "dob": formData.dob,
        "titleId": formData.titleId,
        "employmentStatus": formData.employmentStatus,
        "handset": formData.handset,
        "source": formData.source,
        "userAgent": formData.user_agent
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
    // $.ajax({
    //   type: "POST",
    //   url: "https://go.webformsubmit.com/dukeleads/waitsubmit?key=eecf9b6b61edd9e66ca0f7735dfa033a&campid=" + campid,
    //   data: formData,
    //   success: function(data) {
    //     console.log(data)
    //     if(data.code == 1 && data.records[0].status != "Rejected"){
    //       CI.formResponse =  'success'
    //       dataLayer.push({'transactionId': data.records[0].response.leadId, "transactionTotal": 3})
    //       // window.location= 'https://mobilematcher.co.uk/success2'
    //     }
    //     else{
    //       console.log(data.records[0].status)
    //       // window.location= 'https://dl.reliatrk.com/?a=2&c=36&s1=exit'
    //     }
    //   },
    //   error: function(request){
    //     console.log(request.statusText)
    //   },
    //   dataType: "json"
    // })
    this.firePixel()
  }

// End Lead Submit function

  submitAccpedLead(formData, acceptPage = false){
    var CI = this
    $.ajax({
      type: "GET",
      url: `/accept-leads?affiliate=22&api_key=a892keduKe&handset_id=${CI.productId}&title=Mr&first_name=${formData.firstname}&last_name=${formData.lastname}&dob_d=28&dob_m=02&dob_y=1991&email=${formData.email}&home_tel=${formData.phone1}&mobile_tel=${formData.phone1}&house_number=${this.getHomeAddress() || "unknown" }&street=${formData.street1 || "unknown"}&town=${formData.towncity || "unknown"}&county=${this.getLastAddress() || "unknown"}&postcode=${formData.postcode}&ip_address=${formData.ipaddress || "192.168.1.1" }&agent_string=${formData.userAgent}&source=${formData.source}`,
      success: function(data) {
        console.log(data.response)
        if(data.response && data.response.result.accepted == "1"){
          console.log("Going to redirect accepted mobbile: "+new Date())
          var link = $("<a>");
          link.attr("href", `/accept_leads_count?url=${data.response.result.url}&accept_page=${acceptPage}&source=${formData.source}&first_name=${formData.firstname}&last_name=${formData.lastname}&email=${formData.email}&home_tel=${formData.phone1}&street=${formData.street1 || "unknown"}&town=${formData.towncity || "unknown"}&handset_id=${CI.productId}&postcode=${formData.postcode}&trafficid=${formData.trafficid}`);
          link[0].click()

        }else{
          CI.formResponse =  'reject'
        }
      },
      error: function(request){
        CI.formResponse =  'reject'
        console.log(request.statusText)
      },
      dataType: "json"
    })
}
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

  getHomeAddress(){
    if( this.getItemFromStorage("user_data") != null){
      return this.getItemFromStorage("user_data")["building"]
    }else{
      return this.getHouseNumb() || this.getUrlParameter('building') || $(".building").val() || ''
    }
  }

  getLastAddress(){
    if( this.getItemFromStorage("user_data") != null){
      return this.getItemFromStorage("user_data")["county"]
    }else{
      return this.getCounty() || this.getUrlParameter('towncity') || $(".towncity").val() || '';
    }
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

  getSourceFromURL(){
    return this.getUrlParameter('source') || '';
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
