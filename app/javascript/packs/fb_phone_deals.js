import Common from "./common.js"

class FbPhoneDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.showTab(this.currentTab);

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
    });

    $("input[name='save-energy-bc-no']").click(function() {
      if (this.value == "yes") {
        CI.nextStep(1);
        $( "#btn-continue").show()
      }else{
        if(CI.getBcFromParams()){
           CI.nextStep(2);
        }else{
          CI.successUrl()
        }
      }
    });

    $("input[name='finance']").click(function() {
      console.log("fance")
      if (this.value == "yes") {
        CI.financeLead()
      }
      CI.successUrl();
    });

    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });
    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
    });

    $(document).on("click", '.open-form', function() {
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });
  }

  nextStep(n) {
    this.showCircle()
    var CI = this;
    $('#dealform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.handleBadCustomerForm()
      CI.currentTab = CI.currentTab + n;
      CI.showTab(CI.currentTab);
    })
  }

  mmdLead(){
    if (this.customValidator('#dealform') == true && this.isPhone == true && this.isEmail == true){
      this.postMMDData()
    }else{
      $('#dealform').parsley().validate()
    }
  }

  postMMDData() {
    var data = this.getData();
    $( "#btn-continue").hide()
    $( "#btn-back").hide()
    $( ".progress").hide()
    $(".postcode_holder").html($(".postcode").val() || this.getUrlParameter("postcode")  || "");
    // Form Submisson
    this.updateFacebookAudience(data)
    this.sendMmdExitLead()
    this.submitLead(data, this.details.camp_id)
    this.firePixel()
  }

  energyLead(){
    var data = this.getDataEnergy();
    this.submitLead(data, "ENERGY")
    if(!this.getBcFromParams()){
      this.currentTab  = 3
      this.successUrl()
    }
  }

  firePixel(){
    if (this.details.camp_id == 'MEGA-MOBILE-DEALS'){
      dataLayer.push({'event': 'fb-form-submit'})
    }
  }

  financeLead(){
    var data = this.getData();
    this.submitLead(data, "MMD-finance")
  }

  handleBadCustomerForm(){
    if (this.currentTab == 2) {
      this.mmdLead()
      if(this.getBcFromParams()){
        if (this.currentTab == 4) {
          $( "#btn-continue").hide()
          $( "#btn-back").hide()
          this.energyLead()
        }
      }else{
        this.successUrl()
      }
    }
  }

  urlSelection(){
    window.location = this.details.success_url+this.additionalParamsFoBC()+this.paramsforSuccess()
  }

  successUrl(){
    var CI = this;
    $("#loaderPopup").css('height', '100%')
    setTimeout(function(){
      if (CI.redirectUrl) {
        CI.urlSelection()
      }else{
        CI.successUrl()
      }
    }, 1000)
  }

  getData(){
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || "taboola",
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      ipaddress: this.ip_Address,
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      apidown: this.apiDown,
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }

  getDataEnergy() {
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1')|| $(".street1").val(),
      lead_id: this.getUrlParameter('lead_id')|| '',
      sid: 1,
      source: 'MMD',
      ssid: this.getUrlParameter('ssid') || 'unknown',
      paymentmethod: this.getUrlParameter('paymentmethod')|| 'prepayment',
      currentprovider: this.getUrlParameter('currentprovider')|| 'other',
      prize: this.getUrlParameter('prize')|| 'mobilephone',
      trafficid: this.getUrlParameter('trafficid')|| 'Save Energy Bill',
      towncity: this.getUrlParameter('towncity')|| 'unknown',
      title: this.getUrlParameter('title')|| 'Mr',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'http://deals.megamobiledeals.com/',
      ipaddress: this.ip_Address,
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }
}
export default new FbPhoneDeals();
