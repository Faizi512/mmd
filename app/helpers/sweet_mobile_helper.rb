module SweetMobileHelper
  def sweet_deals_data
      @dealslist = [
       {
          title: "100GB Sim Only Deal",
          data: "100GB",
          image: "new-sims/100gb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£31",
          contract: "12",
          toptext: "EU Roaming included"
        },
        {
          title: "500MB Sim Only Deal",
          data: "500MB",
          image: "new-sims/500mb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£19",
          contract: "12",
          toptext: "Great UK coverage using O2"
        },
        {
          title: "2GB Sim Only Deal",
          data: "2GB",
          image: "new-sims/2gb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£20",
          contract: "12",
          toptext: "Great UK coverage using O2"
        },
        {
          title: "5GB Sim Only Deal",
          data: "5GB",
          image: "new-sims/5gb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£23",
          contract: "12",
          toptext: "Great UK coverage using O2"
        },
        {
          title: "10GB Sim Only Deal",
          data: "10GB",
          image: "new-sims/10gb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£26",
          contract: "12",
          toptext: "Great UK coverage using O2"
        },
        {
          title: "Unlimited Sim Only Deal",
          data: "Unlimited",
          image: "new-sims/2gb.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£32",
          contract: "12",
          toptext: "EU Roaming included"
        },
        {
          title: "Alcatel 1B",
          data: "2GB",
          image: "new-sims/alcatel.png",
          calls: "Unlimited",
          texts: "Unlimited",
          monthly: "£47",
          contract: "12",
          toptext: "£20 for airtime plus 3 payments of £27 phone finance"
        }
      ]
  end
end