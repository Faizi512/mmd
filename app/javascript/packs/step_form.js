import Common from "./common.js"

class StepForm extends Common {
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

    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });

    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
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
      CI.nextStep(1);
    });

    $("input[name='free-credit']").click(function() {
      if (this.value == "yes") {
        CI.freeCreditLead()
      }
      CI.checklastStep()
    });

    $("input[name='casino']").click(function() {
      if (this.value == "yes") {
        CI.casinoLead()
      }
      CI.checklastStep()
    });

    $(document).on("click", '.open-form', function() {
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });
  }

  checklastStep(){
    var CI = this
    if($("input[name='free-credit']:checked").length > 0 && $("input[name='casino']:checked").length > 0){
      this.successUrl()
    }
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
    this.firePixel()
    var data = this.getData();
    $( "#btn-continue").hide()
    $( "#btn-back").hide()
    $( ".progress").hide()
    $(".postcode_holder").html($(".postcode").val() || this.getUrlParameter("postcode")  || "");
    // Form Submisson
    this.updateFacebookAudience(data)
    this.submitLead(data, this.details.camp_id)
  }

  energyLead(){
    var data = this.getDataEnergy();
    this.submitLead(data, "ENERGY")
    if(!this.getBcFromParams()){
      this.currentTab  = 3
      this.successUrl()
    }
  }

  financeLead(){
    var data = this.getData();
    this.submitLead(data, "MMD-finance")
  }

  freeCreditLead(){
    var data = this.getData();
    this.submitLead(data, "MMD-free-credit")
  }
  casinoLead(){
    var data = this.getData();
    this.submitLead(data, "MMD-Casino")
  }

  handleBadCustomerForm(){
    if (this.currentTab == 2) {
      this.mmdLead()
    }else if (this.currentTab == 4) {
      $( "#btn-continue").hide()
      $( "#btn-back").hide()
      this.energyLead()
    }
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
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      ad_set:this.getUrlParameter('ad_set') || 1,
      source:  this.details.source ,
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      ipaddress: this.ip_Address,
      apidown: this.apiDown,
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }

  getSource(){
    return  this.details.source;
  }
}
export default new StepForm();
