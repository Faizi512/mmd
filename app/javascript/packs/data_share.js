import App from '../channels/data_share.js'
import _ from 'lodash'
import CableReady from 'cable_ready'

class DataShare {
  constructor() {
    this.subscribeChannel()
  }
  // Start Action Cable
   subscribeToDataShare(channel) {
     console.log(channel)
     console.log("channel anme from mmd")
     const split = channel.split('_')
     var CI = this
     CI.channelName = split[0]
     this.room = split[1]
     if (!_.isNull(this.channelName) && !_.isUndefined(this.channelName)) {
       this.channelName = App.subscriptions.create(
         { channel: this.channelName  , room: this.room },
         {
           received: (data) => {
             console.log(data)
             console.log("I received data mmd")
             CI.setItemToStorage("user_data", data.lead)
           },
         }
       )
     }
   }
   subscribeChannel(){
     this.subscribeToDataShare(`DataShareChannel_${this.getUrlParameter("user_id")}`)
   }
  // End Action Cable

  setItemToStorage(name, data){
    return localStorage.setItem(name, JSON.stringify(data))
  }

// Start Paramataer
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


}

export default new DataShare;
