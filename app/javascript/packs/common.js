import 'flipclock/dist/flipclock.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import "@fortawesome/fontawesome-free/js/all"
import "parsleyjs";

class Common {
  constructor() {
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
    this.phoneName = null;

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

  popupTerms(){
    $( ".close-b" ).click(function() {
      $('.modal2').hide();
    });

    $('.term-text').click(function(){
      $('.modal2').show();
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
          if (json.status == "Valid") {
            CI.isPhone = true
            return true
          }else if(json.status == "Error"){
             CI.isPhone = true
             CI.apiDown =  true
            return true
          }else{
            return $.Deferred().reject("Please Enter Valid UK Phone Number");
          }
        })
      },
      messages: {
         en: 'Please Enter Valid UK Phone Number',
      }
    });
  }

  validateTsp(){
    var CI = this
    if (this.tps_result == null) {
      var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/tps?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.phone').val())
      return xhr.then(function(json) {
        CI.tps_result =  json.status
      })
    }
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
          }else{
            return $.Deferred().reject("Please Enter Valid Email Address");
          }
        })
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
    window.Parsley.addValidator('validapipostcode', {
      validateString: function(value){
        var xhr = $.ajax({
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
          error: function(error){
            console.log(error.statusText)
            xhr.abort();
            if (error.statusText == "timeout") {
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

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || 'unknown',
      towncity: this.getUrlParameter('towncity') || $(".towncity").val() || 'unknown',
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
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
      ipaddress: this.ip_Address,
      uu_id: this.details.uu_id,
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      apidown: this.apiDown,
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }

  firePixel(){
    if (this.details.camp_id == 'MEGA-MOBILE-DEALS'){
      dataLayer.push({'event': 'transaction'})
    }
  }

  postData() {
    // doubel verify tsp
    this.validateTsp()
    // Getting Data
    var CI = this;
    var data = this.getData();
    // Form Submisson
    this.updateFacebookAudience(data)
    this.submitLead(data, this.details.camp_id)
    // Redirection after submisson
    this.successUrl()
  }

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

  getBcFromParams(){
    return this.isBadCustomer(this.getUrlParameter('keyword')) ||  (this.getUrlParameter('bc') == "yes")
  }

  updateFacebookAudience(data){
    $.ajax({
      type: "POST",
      url: '/facebook_custom_audience',
      data: data,
      dataType: "json",
      success: function(e) {
        console.log(e.response);
      }
    })
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
           window.location = "/success2"
        }
        if(data.code == 1 && data.records[0].response.code == 1){
          dataLayer.push({'transactionId': data.records[0].response.leadId, "transactionTotal": 3})
          CI.submitCustomerIo(formData, data.records[0].response.leadId)
        }
      },
      dataType: "json"
    })
    this.firePixel()
  }

  submitCustomerIo(formData, leadId){
     try {
      const timestamp = Math.round(new Date() / 1000)
      var phone = `+44${parseInt(formData.phone1.toString().split("").splice(-10).join(""))}`
      _cio.identify($.extend(formData, {id: leadId, lead_date: timestamp, created_at: timestamp, phone: phone}))
      _cio.track("leadSold");
    }
    catch (e) {}
  }

  sendMmdExitLead(){
    if (this.details.camp_id == 'MEGA-MOBILE-DEALS'){
      // Get data for lead
      var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes")
      var phone1 = this.getUrlParameter('phone1') || $(".phone").val() || ''
      var bc = (customer_type) ? "yes" : "no"
      var c3 = this.getUrlParameter('sid') || this.details.sid || 1
      var handset = this.getUrlParameter('handset') || this.phoneName || ''
      var postcode = this.getUrlParameter('postcode') || $(".postcode").val() || ''
      var source = this.getUrlParameter('source') || this.details.source || 'google3'
      var CI = this

      $.ajax({
        type: "POST",
        url: "/mmd-exit-lead?campid=MMDEXIT",
        data: {phone1: phone1, bc: bc, c3: c3, source: source, handset: handset, postcode: postcode },
        success: function(json) {
          console.log(json)
          if(json.response.code == 1){
            CI.fetchRedirectUrl(json.response.leadId)
          }
        },
        error: function(s){
          setTimeout(function(){
            CI.redirectUrl =  "https://mtrk11.co.uk/?a=14118&c=33110"
          }, 2000);
        },
        dataType: "json"
      })
    }
  }

  fetchRedirectUrl(lead_id){
    var CI = this
    $.ajax({
      type: "get",
      url: `/fetch-redirect-url/${lead_id}`,
      success: function(response) {
        console.log(response)
        if(response.status == 200){
          CI.redirectUrl = response.lead.redirect_url
          CI.deliveryName = response.lead.delivery_name
          CI.details.bad_success_url = CI.redirectUrl
          CI.details.success_url = CI.redirectUrl
        }else{
          CI.setTimerToApiCall(lead_id)
        }
      },
      error: function(res) {
          console.error(res)
      },
    })
  }

  setTimerToApiCall(lead_id){
    var CI = this
    this.fetchRequest = this.fetchRequest + 1
    if(this.fetchRequest < 10 && this.redirectUrl ==  null){
      setTimeout(function(){
        CI.fetchRedirectUrl(lead_id)
      }, 2000);
    }else{
      this.redirectUrl =  "https://mtrk11.co.uk/?a=14118&c=33110"
    }
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
    return this.getUrlParameter('sid') || '';
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

}

export default Common;
