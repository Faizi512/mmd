import Common from "./common.js"
class CreditCheck extends Common {
  constructor(){
    super();
    var CI = this;
    this.validate("#cc-form")
    $(document).on("click", '.input-tag-radio', function(event) {
      CI.step(1,event)
    });
    $(document).on("change", '.select-field', function(event) {
      CI.step(1,event)
    });
    $(document).on("click", '.back-color', function(event) {
      CI.step(1,event)
    });
    $(document).on("click", '.accordion-title', function(event) {
      var card=event.target.closest('.tab')
      CI.changeTab(card)
    });
    $(document).on("show.bs.collapse", '.collapse', function(event) {
       $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    })
    $(document).on("hide.bs.collapse", '.collapse', function(event) {
      $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });

    this.transactions = []
    this.savings = 0
    this.totalexpense=0
    this.percent=0
    this.income=0
    this.age=0
    this.remaining=0
    this.residentialStatus=null
    this.employmentStatus=null
  }
  step(n,event) {
    this.employmentValues=["full time employed","part time employed","self employed"]
    this.goodCreditResidentialValues=["tenent","home owner"]
    this.okCreditResidentialValues=["tenent","home owner","council tenent","living with parents"]
    var tab = event.target.closest('.tab')
    var CI = this;
    $('#cc-form').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      $(tabs[CI.currentTab + 1]).find('.collapse').collapse('show');
      $(tabs[CI.currentTab]).find('.collapse').collapse('hide');
      $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
      CI.currentTab = CI.currentTab + n;
    })
    if(($(tab).find(".select-field")).length > 0){
      this.ageCalculate()
      var inputs=$(tab).find(".select-field");
      var id = inputs[0]
      if(id.options){
        this.employmentStatus = id.options[id.selectedIndex].text;
        if (this.employmentStatus == "unemployed" || this.employmentStatus == "student")
        {
          window.location.href=
            "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true";
        }
      }
    }
    else if(($(tab).find(".input-tag-radio")).length > 0){
      var inputs=$(tab).find(".input-tag-radio");
      for (var i = 0; i<inputs.length;i++){
        var id = inputs[i];
        if (id.checked) {
          this.residentialStatus=id.value
        }
      }
    }else if($(tab).find(".expenses")){
      var input = $(tab).find(".expenses");
      this.transactions.push(input.val())
    }
    this.income = parseInt(this.transactions[0])
    if(this.transactions.length == 7){
      for(var i = 1; i<this.transactions.length; i++){
        this.totalexpense = parseInt(this.transactions[i]) + this.totalexpense
      }
      this.percent = (70/100) * this.income
      this.remaining=this.income-this.percent
      this.savings = this.income - this.totalexpense
      if(this.income >= 1500 && this.credit_check(this.goodCreditResidentialValues)){
        this.redirect_to_switchuk()
      }else if(this.income >= 1000 && this.income < 1500 && this.credit_check(
        this.goodCreditResidentialValues)){
        this.redirect_to_switchuk('?mmd=true&monthly_cost=35')
      }else if(this.income >= 800 && this.income < 1000 && this.credit_check(
        this.okCreditResidentialValues)){
        this.redirect_to_switchuk('?mmd=true&monthly_cost=26')
      }else{
        this.redirect_to_bad_credit()
      }
    }
    if(this.income < 800){
        this.redirect_to_bad_credit()
    }
  }
  changeTab(tab){
    var CI = this;
    var index=parseInt(tab.id);
    this.currentTab=index;
  }
  ageCalculate(){
    var dateControl = document.querySelector('input[type="date"]');
    var dob = dateControl.value
    var year = parseInt(dob.split('-')[0])
    var today = new Date()
    var currentYear = today.getFullYear()
    this.age = currentYear - year
  }

  redirect_to_switchuk(query = '') {
    if (this.savings >= this.remaining) {
      window.location.href=
        `https://switchuk.uk/mobiles/contract_phone_deals${query}`;
    }
    else{
      this.redirect_to_bad_credit()
    }
  }

  redirect_to_bad_credit() {
    window.location.href=
      "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
  }

  credit_check(residentialValues) {
    return this.age > 21
      && this.employmentValues.includes(this.employmentStatus)
      && residentialValues.includes(this.residentialStatus)
  }

}
export default new CreditCheck();
