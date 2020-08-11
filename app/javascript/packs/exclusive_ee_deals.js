import Common from "./common.js"

class ExclusiveEEDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform')
    this.showToolTip()

  }
}
export default new ExclusiveEEDeals();
