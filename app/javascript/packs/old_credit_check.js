import Common from "./common.js"
class OldCreditCheck extends Common {
  constructor(){
    super();
    var CI = this;
    $(document).on("change", '.select-field', function(event) {
      CI.step(event)
    });
    $(document).on("click", '.residential', function(event) {
      CI.residence(event)
    });
    $(document).on("focusout", '.expenses', function(event) {
      CI.transaction(event)
    });
    $(document).on("click", '.btn-lg', function(event) {
      CI.continue(event)
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
  step(event){
    var tab = event.target.closest('.dropdown')
    if(($(tab).find(".select-field")).length > 0){
      this.ageCalculate()
      var inputs=$(tab).find(".select-field");
      var id = inputs[0]
      if(id.options){
        this.employmentStatus = id.options[id.selectedIndex].text;
        if (this.employmentStatus == "unemployed" || this.employmentStatus == "student")
        {
          window.location.href=
            "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
        }
      }
    }
  }
  residence(event){
    var tab = event.target.closest('.residential')
    if(($(tab).find(".input-tag-radio")).length > 0){
      var inputs=$(tab).find(".input-tag-radio");
      for (var i = 0; i<inputs.length;i++){
        var id = inputs[i];
        if (id.checked) {
          this.residentialStatus=id.value
        }
      }
    }
  }
  transaction(event){
    this.employmentValues=["full time employed","part time employed","self employed"]
    this.goodCreditResidentialValues=["tenent","home owner"]
    this.okCreditResidentialValues=["tenent","home owner","council tenent","living with parents"]

    var tab = event.target.closest('.input-amounts')

    if($(tab).find(".expenses")){
      var input = $(tab).find(".expenses");
      if(input.val().length > 0){
        this.transactions.push(input.val())
      }
    }
    this.income = parseInt(this.transactions[0])
    if(this.income < 800){
       window.location.href=
        "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
    }
  }
  ageCalculate(){
    var dateControl = document.querySelector('input[type="date"]');
    var dob = dateControl.value
    var year = parseInt(dob.split('-')[0])
    var today = new Date()
    var currentYear = today.getFullYear()
    this.age = currentYear - year
    if (this.age < 21 ){
        window.location.href=
        "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
    }
  }
  continue(){
    $('#dealform').parsley().validate()
    $('#dealform').parsley().whenValidate().done(() =>{
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
    })
  }
  redirect_to_switchuk(query = ''){
    if (this.savings >= this.remaining){
      window.location.href=
        `https://switchuk.uk/mobiles/contract_phone_deals${query}`;
    }
    else{
      this.redirect_to_bad_credit()
    }
  }
  redirect_to_bad_credit(){
    $('#dealform').parsley().validate()
    $('#dealform').parsley().whenValidate().done(() =>{
      window.location.href=
        "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
    })
  }
  credit_check(residentialValues){
    return this.age > 21
      && this.employmentValues.includes(this.employmentStatus)
      && residentialValues.includes(this.residentialStatus)
  }
}
export default new OldCreditCheck();
