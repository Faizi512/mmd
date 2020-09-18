import Common from "./common.js"

class UkCreditRatings extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showTab(this.currentTab);

    $( ".property" ).change(function() {
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("housenumber"))
    });

    $( ".nextStep" ).click(function() {
      CI.nextStep(1);
    });
    $( ".back-btn" ).click(function() {
      CI.backStep(-1);
    });

    $('#btn-submit').click(function() {
      CI.showCircle();
      $('#dealform').parsley().whenValidate().done(() =>{
        CI.postData();
      })
    });

    $(".dob").change(function() {
      if ($("#dayOfBirth :selected").val() !== "" && $("#monthOfBirth :selected").val() !== "" && $("#yearOfBirth :selected").val() !== "" ) {
        CI.nextStep(1);
      }
    });

    $( ".gender" ).change(function() {
      if ($("input[name='gender']:checked").val() !== "") {
        CI.nextStep(1);
      }
    });

    $( ".title" ).change(function() {
      if ($("input[name='title']:checked").val() !== "") {
        $(".header-top").show();
        CI.nextStep(1);
      }
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
    });

  }

  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*33.33)+"%";
      $('.progress-percent').text((num*33.33) + "%" + " Complete");
      $('.progress-steps').text("Step " + (num + 1) + "/4");
      if( num ==  0){
        $('.progress-percent').text("");
      }
    }
  }

  successUrl(){
     window.location = this.details.success_url + this.paramsforSuccessCreditRating()
  }

  paramsforSuccessCreditRating(){
    return this.getSid() + "&city=" + this.getCity() + "&straddr=" + this.getStreet() + "&title=" + this.getTitle() + "&fname=" + this.getFirstName() + "&lname=" + this.getLastName() + "&zip=" + this.getPostcode() + "&dbd=" + this.getDayOfBirth() + "&dbm=" + this.getMonthOfBirth() + "&dby=" + this.getYearOfBirth() + "&phone=" + this.getPhone1() + "&email=" + this.getEmail() ;
  }

  getSid(){
    return this.getUrlParameter('sid') || 1;
  }

  getTitle(){
    return this.getUrlParameter('title') || $("input[name='title']:checked").val() || '';
  }

  getDayOfBirth(){
    return  $("#dayOfBirth :selected").val() || '';
  }

  getMonthOfBirth(){
    return $("#monthOfBirth :selected").val() || '';
  }

  getYearOfBirth(){
    return $("#yearOfBirth :selected").val() || '';
  }

  submitLead(data, campid){
    $("#loaderPopup").css('height', '100%')
    $.ajax({
      type: "POST",
      url: "https://go.webformsubmit.com/dukeleads/waitsubmit?key=b6edc802af30c3165f2e13118715d362&campid=" + campid,
      data: data,
      success: function(json) {
        console.log(json)
      },
      dataType: "json"
    })
  }

  getData() {
    var dayofb = $("#dayOfBirth :selected").val();
    var yearofb = $("#yearOfBirth :selected").val();
    var monthofb = $("#monthOfBirth :selected").val();
    var dateofbirth = dayofb+"/"+monthofb+"/"+yearofb
    return {
      postcode: this.getUrlParameter('postcode') ||  '',
      firstname: this.getUrlParameter('firstname') ||  '',
      lastname: this.getUrlParameter('lastname') || '',
      email: this.getUrlParameter('email') || '',
      phone1: this.getUrlParameter('phone1') || '',
      street1: this.getUrlParameter("street1") || $(".street1").val() || 'unknown',
      towncity: this.getUrlParameter('towncity')|| $(".towncity").val() || 'unknown',
      county: this.getUrlParameter('county')|| $(".county").val() || 'unknown',
      housenumber: this.getUrlParameter('houseNumber')|| $(".houseNumber").val() || 'unknown',
      title:  this.getUrlParameter('title') || $("input[name='title']:checked").val() || "Mr",
      gender:  this.getUrlParameter('gender') || $("input[name='gender']:checked").val() || "1",
      lead_id: this.getUrlParameter('lead_id')|| 'unknown',
      sid: this.getUrlParameter('sid')|| this.details.sid || 1,
      source: this.getUrlParameter('source') || this.details.source || 'unknown',
      ssid: this.getUrlParameter('ssid') || 1,
      dob: this.getUrlParameter('dob') || dateofbirth,
      keyword: this.getUrlParameter('keyword') || '',
      prize: this.getUrlParameter('prize')|| '2',
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid')|| 'megamobiledeals/uk-credit-ratings',
      c1: this.getUrlParameter('transid')|| this.getUrlParameter('c1') || 'unknown',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'http://deals.megamobiledeals.com/uk-credit-ratings',
      ipaddress: this.ip_Address,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    }
  }

  validatePostcode(){
    var CI = this;
    $(".tab").addClass("in-progress")
    var xhr = $.ajax(`https://api.getAddress.io/find/${CI.getUrlParameter('postcode')}?api-key=NjGHtzEyk0eZ1VfXCKpWIw25787&expand=true`)
    return xhr.then(function(json) {
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
              data-housenumber="${result[i].building_number}"
              >
              ${result[i].formatted_address.join(" ").replace(/\s+/g,' ')}
              </option>
            `)
          }
          $('#property').html(adresses)
          $(".tab").removeClass("in-progress")
          $('#address').show()
          $('.towncity').val($("#property").find("option:selected").data("city"))
          $('.street1').val($("#property").find("option:selected").data("street"))
          $('.county').val($("#property").find("option:selected").data("province"))
          $('.houseNumber').val($("#property").find("option:selected").data("housenumber"))

        return true
      }else{
        $(".tab").removeClass("in-progress")
      }
    })
  }
}

export default new UkCreditRatings();
