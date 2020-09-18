import Common from "./common.js"

class CreditReport extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showTab(this.currentTab);
    $(".tab").removeClass("in-progress")

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
      $(".tab").removeClass("in-progress")
    });

  }

  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*45)+"%";
      $('.progress-percent').text((num*45) + "%" + " Complete");
      $('.progress-steps').text("Step " + (num + 1) + "/4");
      if( num ==  0){
        $('.progress-percent').text("");
      }
    }
  }
  successUrl(){}

  submitLead(data, campid){
    var CI = this
    $("#loaderPopup").css('height', '100%')
    $.ajax({
      type: "POST",
      url: "https://go.webformsubmit.com/dukeleads/waitsubmit?key=b6edc802af30c3165f2e13118715d362&campid=" + campid,
      data: data,
      success: function(json) {
        console.log(json)
        if (json.code == 1) {
          window.location = json.records[0].lead.c1
        }else{
          window.location = CI.details.success_url
        }
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
      trafficid: this.getUrlParameter('trafficid')|| 'megamobiledeals/credit-report',
      c1: this.getUrlParameter('transid')|| this.getUrlParameter('c1') || 'unknown',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'http://deals.megamobiledeals.com/credit-report',
      ipaddress: this.ip_Address,
      timestamp: new Date,
      matchtype: this.getUrlParameter('matchtype') || "",
      user_agent: window.navigator.userAgent,
    }
  }
}

export default new CreditReport();
