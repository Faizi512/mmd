import Common from "./common.js"

class SweetMobile extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealslistform")
    this.showToolTip()
    this.fillform()
    this.showTab(this.currentTab)

    $( ".property" ).change(function() {
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
    });

    $(".numbertt").change(function() {
      if ($("#numbertt :selected").val() == "yes") {
        $('.div-numbr').show();
      }
    });


    $( "#btn-nextstep" ).click(() => {
      CI.nextStep(1)
    });

    $( "#btn-backstep" ).click(function() {
      CI.backStep(-1)
    });

  }

  fixStepIndicator(num) {
    var progress = $('.custom-progress-bar');
    if(num >= 0) {
      $('.custom-progress-bar').find("li").eq(num).addClass("is-active")
      $('.custom-progress-bar').find("li").eq(num - 1).addClass("is-complete")
      $('.custom-progress-bar').find("li").eq(num - 1).removeClass("is-active")
      $('.custom-progress-bar').find("li").eq(0 - 1).removeClass("is-complete")
    }
  }

  nextStep(n) {
    var CI = this;
    $('#dealslistform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      if (CI.currentTab >= tabs.length) {
        var data = CI.getData();
        var params = Object.keys(data).map(key => key + '=' + data[key]).join('&');
       window.location = '' + '?' +params;
      }
      CI.showTab(CI.currentTab);
    })
  }

  getData() {
    var dayofb = $("#dayOfBirth :selected").val();
    var yearofb = $("#yearOfBirth :selected").val();
    var monthofb = $("#monthOfBirth :selected").val();
    var dateofbirth = dayofb+"/"+monthofb+"/"+yearofb
    return {
      Postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      FirstName: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      LastName: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      Email: this.getUrlParameter('email') || $(".email").val() || '',
      Mobile: this.getUrlParameter('phone1') || $(".phone").val() || '',
      Address1: this.getUrlParameter('address') || $(".street1").val() || $(".address").val() || '',
      Town: this.getUrlParameter('towncity') || $(".towncity").val() || '',
      County: this.getUrlParameter('County') || '',
      NumberstoTransfer: this.getUrlParameter('NumberstoTransfer') ||  $(".NumberstoTransfer").val() || '',
      pay_amount: this.getUrlParameter('pay_amount') || $(".pay_amount") || '',
      subid: this.getUrlParameter('subid') || $(".subid").val() || '',
      DealId: this.getUrlParameter('subid') || $(".dealid").val() || '',
      Quantity: this.getUrlParameter('keyword') || $("#quantity :selected").val() || '',
      PAC: this.getUrlParameter('pac') || $(".pac").val() || '',
      DOB: this.getUrlParameter('dateofbirth') || dateofbirth || '',
    };
  }
}
export default new SweetMobile();




