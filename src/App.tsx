import React, { useState } from 'react';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonModal, IonIcon } from '@ionic/react';
import Menu from './components/Menu';
import { power, informationCircle } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// TODO: FIX LAYOUT AND DESIGN OF BUTTONS, CHANGE FONT AND FONT SIZES

const App: React.FC = () => {
  const [appPower, setAppPower] = useState<boolean>(false);
  const [modeCounter, setModeCounter] = useState<number>(0);
  const [intensityCounter, setIntensityCounter] = useState<number>(0);
  const [temperature, setTemperature] = useState<number>(23);
  const [swing, setSwing] = useState<boolean>(false);
  const [minutes, setMinutes]  = useState(0);
  const [seconds, setSeconds] =  useState(0);
  const [timerAction, setTimerAction] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const handlePower = () => {
    setAppPower(!appPower);
  };

  const handleMode = () => {
    setModeCounter((modeCounter + 1) % 4);
  };

  const handleIntensity = () => {
    setIntensityCounter((intensityCounter + 1) % 4);
  };

  const handleTemperature = (event: any) => {
    if (
      !(
        (temperature === 32 && event.target.id === "plus") ||
        (temperature === 18 && event.target.id === "minus")
      )
    ) {
      if(event.target.id === "plus"){
        setTemperature(temperature + 1);
      } else {
        setTemperature(temperature - 1);
      } 
    }
  };

  const handleSwing = () => {
    setSwing(!swing);
  };

  const handleTimerAction = () => {
    setTimerAction(!timerAction);
  };

  const handleTimerButtons = (event: any) => {
    if(event.target.id === "plus"){
      if(minutes < 60){
        if(minutes > 50){
          setMinutes(60);
          setSeconds(0);
        } else {
          setMinutes(minutes + 10);
        }
        
      }
    } else {
      if(minutes > 0){
        if(minutes < 10){
          setMinutes(0);
          setSeconds(0);
        } else {
          setMinutes(minutes - 10);
        }
      }
    } 
  }
  
  const handleMinutes = (min: number) => {
    setMinutes(min);
  }

  const handleSeconds = (sec: number) => {
    setSeconds(sec);
  }
  
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary" className="ion-align-items-center">
          <IonTitle className="ion-text-center">
            ΜΟΝΤΕΡΝΑ ΔΙΕΠΑΦΗ ΜΕ IONIC
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonButton size="large" expand="block" color="light" onClick={handlePower}>
                <IonIcon className="powerButton" size="large" icon={power} color={appPower ? "danger" : "success"}/>
              </IonButton>
            </IonCol>
          </IonRow>
          <Menu 
            isOn={appPower}
            mode={modeCounter}
            intensity={intensityCounter}
            temperature={temperature}
            swing={swing}
            minutes={minutes}
            seconds={seconds}
            timerOn={timerAction}
            modeHandler={handleMode}
            intensityHandler={handleIntensity}
            temperatureHandler={handleTemperature}
            swingHandler={handleSwing}
            timerHandler={handleTimerAction}
            timerChanger={handleTimerButtons}
            minutesHandler={handleMinutes}
            secondsHandler={handleSeconds}
          />
          <IonRow className="ion-align-items-center">
            <IonCol className="ion-text-center">
            <IonButton onClick={() => setShowHelp(true)} size="large" fill="outline">
                ΒΟΗΘΕΙΑ
                <IonIcon slot="start" icon={informationCircle} />
            </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonModal isOpen={showHelp} onDidDismiss={() => setShowHelp(false)}>
          ΠΕΡΙΕΧΟΜΕΝΟ ΒΟΗΘΕΙΑΣ ΓΙΑ ΤΗΝ ΕΦΑΡΜΟΓΗ
          <IonButton onClick={() => setShowHelp(false)}>ΕΠΙΣΤΡΟΦΗ</IonButton>
        </IonModal>
      </IonContent>
    </IonApp>
  );
};

export default App;
