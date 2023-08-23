import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  SmartMeter!:any[]| [];
  Batteries:any[]| undefined;
  Consumers:any[] | undefined;
  
  SolarPanels: any[] | undefined;
  Turbines: any[] | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
   
  
    
    
    
    setInterval(() => {
      this.getAddedSolarPanels();
    }, 2000);

     setInterval(() => {
     this.getAddedTurbines();
     }, 2000);
     setInterval(() => {
      this.getAddedConsumers();
     }, 2500);  
 
     setInterval(() => {
      this.getAddedBatterys();
     }, 2500);
    setInterval(() => {
     this.getSmartMeterInfos();
     }, 2000);
   
      this.check();
    
     
     
    
  }
  getSmartMeterInfos() {
    this.http.get<any[]>('http://localhost:8080/api/v1/smart-home/smart-meter-show').subscribe({
      next: (response: any[]) => {

        this.SmartMeter = response;
      },
      error: (error: any) => {
        console.log('Error fetching Batterys:', error);
      },
    });
  }
  // updateSmartgrid URL soll noch hinzugefügt werden
updateSmartMeterData(SmartMeterData: any) {
  this.http.put<any>('http://localhost:8080/', SmartMeterData)
    .subscribe();
}
  getAddedBatterys() {
    this.http.get<any[]>('http://localhost:8080/api/v1/home-battary/home-battary-show').subscribe({
      next: (response: any[]) => {
        this.Batteries = response;
        console.log("IAM HERE BATTERY");
      },
      error: (error: any) => {
        console.log('Error fetching Batterys:', error);
      },
    });
  }
  //URL SOLL NOCH BEARBEITET WERDEN --------------------------------------------------------------------------
  updateBattery(battery: any) {
    battery.status = !battery.status;
    this.http.put<any>('http://localhost:8080/api/v1/home-battary-update', battery)
      .subscribe({
        next: response => {
          console.log('Solarpanel updated successfully:', response);
        },
        error: error => {
          console.error('Error updating battery:', error);
        }
      });
  }
  getAddedConsumers() {
    this.http
      .get<any[]>('http://localhost:8080/api/v1/energy-consumer/consumer-show')
      .subscribe({
        next: respons => {
          console.log("IAM HEREEEEstandardconsumer");
          this.Consumers = respons;
        },
        error: (error: any) => {
          console.log('Error fetching Standard Consumers:', error);
        },
      });
  }
  //URL SOLL NOCH Consumer WERDEN--------------------------------------------
  updateConsumers(Consumer: any) {
    Consumer.status = !Consumer.status;
    this.http.put<any>('http://localhost:8080/api/v1/standart-consumer-update', Consumer)
      .subscribe({
        next:   response => {
          console.log('Solarpanel updated successfully:', response);
        },
        error:error => {
          console.error('Error updating solarpanel:', error);
        }
  });
  }
 
  getAddedSolarPanels() {
    this.http.get<any[]>('http://localhost:8080/api/v1/energy-producer/solar-panel-show').subscribe({
      next: response=> {
        console.log("IAM HEREEEE");
       
        this.SolarPanels = response;
      },
      error: (error: any) => {
        console.log('Error fetching Solar Panels:', error);
      },
    });
  }
//URL SOLL NOCH SolarPanel WERDEN--------------------------------------------
  updateSolarpanel(solarpanel: any) {
    solarpanel.status = !solarpanel.status;
    this.http.put<any>('http://localhost:8080/api/v1/solar-panel-update', solarpanel)
      .subscribe({
        next:   response => {
          console.log('Solarpanel updated successfully:', response);
        },
        error:error => {
          console.error('Error updating solarpanel:', error);
        }
  });
  }
  getAddedTurbines() {
    this.http.get<any[]>('http://localhost:8080/api/v1/energy-producer/turbine-show').subscribe({
      next: response => {
        console.log("IAM HEREEEETURBINE");
        this.Turbines = response;
      },
      error: (error: any) => {
        console.log('Error fetching Turbines:', error);
      },
    });
  }
  //URL SOLL NOCH BEARBEITET WERDEN --------------------------------------------------------------------------
  updateTurbine(turbine: any) {
    turbine.status = !turbine.status;
    this.http.put<any>('http://localhost:8080/api/v1/turbine-update', turbine)
      .subscribe({
        next: response => {
          console.log('Solarpanel updated successfully:', response);
        },
        error: error => {
          console.error('Error updating solarpanel:', error);
        }
      });
  }
  
  check()
  {
    if(this.SmartMeter[0]?.electricityConsumedWithoutTariff>this.SmartMeter[0]?.electricityProduced){
      alert("Strom wird von SGS gefördert");
    }
  }

}
  /*
  batteryToggleButton(battery: any) {
    const button = document.getElementById('batteryButton');
    if (button?.innerHTML === 'OFF') {
      button.innerHTML = 'ON';
      button.classList.add('on');
      button.classList.remove('off');
      setInterval(() => {
        this.http
          .put<any>('http://localhost:9595/api/v1/home-battary/home-battary-update', battery)
          .subscribe({
            next: (response) => {
              console.log('battery updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating battery:', error);
            },
          });
      }, 2000);
    } else {
      button?.innerHTML === 'OFF';
      button?.classList.add('off');
      button?.classList.remove('on');
    }
  }
/*
  StandardConsumerToggleButton(StandardConsumer: any) {
    const button = document.getElementById('StandardConsumerButton');
    if (button?.innerHTML === 'OFF') {
      button.innerHTML = 'ON';
      button.classList.add('on');
      button.classList.remove('off');
      setInterval(() => {
        this.http
          .put<any>('Backend-link', StandardConsumer)
          .subscribe({
            next: (response) => {
              console.log('StandardConsumer updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating StandardConsumer:', error);
            },
          });
      }, 2000);
    } else {
      button?.innerHTML === 'OFF';
      button?.classList.add('off');
      button?.classList.remove('on');
    }
  }
  VariableConsumerToggleButton(VariableConsumer: any) {
    const button = document.getElementById('VariableConsumerButton');
    if (button?.innerHTML === 'OFF') {
      button.innerHTML = 'ON';
      button.classList.add('on');
      button.classList.remove('off');
      setInterval(() => {
        this.http
          .put<any>('Backend-link', VariableConsumer)
          .subscribe({
            next: (response) => {
              console.log('VariableConsumer updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating VariableConsumer:', error);
            },
          });
      }, 2000);
    } else {
      button?.innerHTML === 'OFF';
      button?.classList.add('off');
      button?.classList.remove('on');
    };
  }

  SolarPanelToggleButton(SolarPanel: any) {
    const button = document.getElementById('SolarPanelButton');
    if (button?.innerHTML === 'OFF') {
      button.innerHTML = 'ON';
      button.classList.add('on');
      button.classList.remove('off');
      setInterval(() => {
        this.http
          .put<any>('Backend-link', SolarPanel)
          .subscribe({
            next: (response) => {
              console.log('SolarPanel updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating SolarPanel:', error);
            },
          });
      }, 2000);
    } else {
      button?.innerHTML === 'OFF';
      button?.classList.add('off');
      button?.classList.remove('on');
    }
  }

  TurbineToggleButton(Turbine: any) {
    const button = document.getElementById('TurbineButton');
    if (button?.innerHTML === 'OFF') {
      button.innerHTML = 'ON';
      button.classList.add('on');
      button.classList.remove('off');
      setInterval(() => {
        this.http
          .put<any>('Backend-link', Turbine)
          .subscribe({
            next: (response) => {
              console.log('Turbine updated successfully:', response);
            },
            error: (error) => {
              console.error('Error updating Turbine:', error);
            },
          });
      }, 2000);
    } else {
      button?.innerHTML === 'OFF';
      button?.classList.add('off');
      button?.classList.remove('on');
    }
  }
  
}

*/

