import Common from "./common.js"

class EEDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform');
    this.validate("#dealform")
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()
    this.showTab(this.currentTab);
    this.affordabilityCondition = null;
    this.transactions = {
      'income': '',
      'rent': '',
      'credit_card': '',
      'utility_bills': '',
      'transport_costs': '',
      'food_costs': '',
      'other_costs': ''
    }
    this.savings = 0
    this.totalexpense=0
    this.percent=0
    this.income=0
    this.age=0
    this.remaining=0
    this.residentialStatus=null
    this.employmentStatus=null
    this.dealType=null
    this.clickdevice = null
    $(document).on("click", '.btn-deal', function() {
      CI.clickdevice = $(this).prev('input').val();
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });

    $( ".property" ).change(function() {
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("housenum"))
    });


    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });

    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
    });

    $(document).on("click", '.input-tag-radio', function(event) {
      CI.nextStep(1)
    });
    $(document).on("change", '.age', function(event) {
      CI.nextStep(1)
    });
    $(document).on("change", '.employment-status', function(event) {
      CI.nextStep(1)
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

  }
  successUrl(){}

  nextStep(n) {
    var CI = this;
    this.showCircle()
    var tabs = $(".tab");
    var tab = tabs[CI.currentTab];
    this.employmentValues=["full time employed","part time employed","self employed"]
    this.residentialValues=["tenent","home owner"]
    if(($(tab).find(".deal")).length > 0){
      var inputs=$(tab).find(".deal");
      for (var i = 0; i<inputs.length;i++){
        var id = inputs[i];
        if (id.checked) {
          this.dealType=id.value
        }
      }
      if(this.dealType != 'handset'){
        $('#redirect-model').modal({
          backdrop: 'static',
          keyboard: false,
        })
        CI.affordabilityCondition = 'fail'
        CI.postData()
        setTimeout(function(){
          window.location.href=
            "/ee-decline";
        }, 3000);
      }
    }else if(($(tab).find(".age")).length > 0){
      CI.age = $( "#dob option:selected" ).val()
      if(CI.age < 22) {
        $('#redirect-model').modal({
          backdrop: 'static',
          keyboard: false,
        })
        CI.affordabilityCondition = 'fail'
        CI.postData()
        setTimeout(function(){
          window.location.href=
            "/ee-decline"
        }, 3000);
      }
    }else if(($(tab).find(".employment-status")).length > 0){
      var inputs=$(tab).find(".employment-status");
      var id = inputs[0]
      if(id.options){
        this.employmentStatus = id.options[id.selectedIndex].text;
        if (!this.employmentValues.includes(this.employmentStatus))
        {
          $('#redirect-model').modal({
            backdrop: 'static',
            keyboard: false,
          })
          CI.affordabilityCondition = 'fail'
          CI.postData()
          setTimeout(function(){
            window.location.href=
              "/ee-decline";
          }, 3000);
        }
      }
    }else if(($(tab).find(".residence")).length > 0){
      var inputs=$(tab).find(".residence");
      for (var i = 0; i<inputs.length;i++){
        var id = inputs[i];
        if (id.checked) {
          this.residentialStatus=id.value
        }
      }
      if (!this.residentialValues.includes(this.residentialStatus)){
        $('#redirect-model').modal({
          backdrop: 'static',
          keyboard: false,
        })
        CI.affordabilityCondition = 'fail'
        CI.postData()
        setTimeout(function(){
          window.location.href=
            "/ee-decline";
        }, 3000);
      }
    }else if($(tab).find(".expenses").length > 0){
      var input = $(tab).find(".expenses")[0].name;
      var inputValue = $(tab).find(".expenses")
      if (input == "income") {
        this.transactions["income"] = inputValue.val()
      }else if(input == "rent"){
        this.transactions["rent"] = inputValue.val()
      }else if(input == "credit-card"){
        this.transactions["credit_card"] = inputValue.val()
      }else if(input == "utility-bills"){
        this.transactions["utility_bills"] = inputValue.val()
      }else if(input == "transport-costs"){
        this.transactions["transport_costs"] = inputValue.val()
      }else if(input == "food-costs"){
        this.transactions["food_costs"] = inputValue.val()
      }else if(input == "other-costs"){
        this.transactions["other_costs"] = inputValue.val()
      }
    }if(this.transaction_check()){
      Object.keys(this.transactions).forEach(function (tran){
        CI.totalexpense = parseInt(CI.transactions[tran]) + CI.totalexpense
      })
      CI.totalexpense = CI.totalexpense - this.transactions['income'];
      this.percent = (70/100) * this.transactions['income']
      this.remaining=this.transactions['income'] - this.percent
      this.savings = this.transactions['income'] - this.totalexpense

      if(this.transactions['income'] >= 1000 && this.savings >= this.remaining ){
        $('#redirect-model').modal({
          backdrop: 'static',
          keyboard: false,
        })
        CI.affordabilityCondition = 'pass'
        CI.postData()
        setTimeout(function(){
          window.location.href= "/ee-success-breeze?device="+ CI.clickdevice
        }, 3000);
      }else if(this.transactions['income'] < 1000){
        CI.affordabilityCondition = 'fail'
        $('#redirect-model').modal({
          backdrop: 'static',
          keyboard: false,
        })
        CI.postData()
        setTimeout(function(){
          window.location.href=
          "/ee-decline";
        }, 3000);
      }
    }
    $('#dealform').parsley().whenValidate({
      group: 'block-' + CI.currentTab
    }).done(() =>{
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      CI.showTab(CI.currentTab);
    })
  }
  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*7)+"%";
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
      traffictype: this.getUrlParameter('traffictype') || "",
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      anytrack: track,
      utm_source: this.getUrlParameter('utm_source'),
      tps_result: this.tps_result,
      apidown: this.apiDown,
      user_agent: window.navigator.userAgent,
      affordability: this.affordabilityCondition || "",
      device: this.clickdevice || "",
    };
  }
  transaction_check(){
    return this.transactions.income != "" && this.transactions.rent != ""
      && this.transactions.credit_card != "" && this.transactions.utility_bills != ""
      && this.transactions.transport_costs != "" && this.transactions.food_costs != ""
      && this.transactions.other_costs != ""
  }
}
export default new EEDeals();
