import React, { useState } from 'react';
import { IonApp, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonGrid, IonRow, IonCol, IonModal, IonIcon, IonText } from '@ionic/react';
import Menu from './components/Menu';
import { power, informationCircle, caretUp, caretDown, play, pause } from 'ionicons/icons';

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
        } else {
          setMinutes(minutes - (minutes % 10) + 10);
        }
        setSeconds(0);
      }
    } else {
      if(minutes > 0){
        if(minutes < 10){
          setMinutes(0);
        } else {
          if(minutes % 10 === 0){
            setMinutes(minutes - 10);
          } else {
            setMinutes(minutes - (minutes % 10));
          }  
        }
        setSeconds(0);
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
                <IonIcon slot="start" className="powerButton" size="large" icon={power} color={appPower ? "danger" : "success"}/>
                {appPower ? "ΑΠΕΝΕΡΓΟΠΟΙΗΣΗ" : "ΕΝΕΡΓΟΠΟΙΗΣΗ"}
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
            powerHandler={handlePower}
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
          <IonToolbar className="ion-align-items-center">
            <IonTitle className="ion-text-center">ΠΛΗΡΟΦΟΡΙΕΣ ΓΙΑ ΤΗ ΧΡΗΣΗ ΤΟΥ ΧΕΙΡΙΣΤΗΡΙΟΥ</IonTitle>
            </IonToolbar>
          <p>Για την προσαρμογή της ΘΕΡΜΟΚΡΑΣΙΑΣ στο επίπεδο που θέλετε, πατήστε <IonIcon icon={caretUp} color="primary"/> για αύξηση και <IonIcon icon={caretDown} color="primary"/> για μείωση.</p>
          <p>Πατήστε το κουμπί <IonText color="primary">ΑΛΛΑΓΗ</IonText> στο πεδίο της ΛΕΙΤΟΥΡΓΙΑΣ για να αλλάξετε σε ΘΕΡΜΑΝΣΗ, ΨΥΞΗ, ΑΦΥΓΡΑΝΣΗ ή ΑΥΤΟΜΑΤΗ ΛΕΙΤΟΥΡΓΙΑ.</p>
          <p>Στο πεδίο της ΕΝΤΑΣΗΣ πατήστε το κουμπί <IonText color="primary">ΑΛΛΑΓΗ</IonText> για να την προσαρμόσετε σε ΧΑΜΗΛΗ, ΜΕΣΑΙΑ, ΥΨΗΛΗ ή ΑΥΤΟΜΑΤΗ.</p>
          <p>Στο πεδίο ΚΙΝΗΣΗ ΠΕΡΣΙΔΩΝ πατήστε το κουμπί <IonText color="primary">ΑΛΛΑΓΗ</IonText> για να ενεργοποιήσετε ή να απενεργοποιήσετε την κίνηση των περσίδων, για καλύτερη κατανομή του αέρα στον χώρο.</p>
          <p>Αν θέλετε το κλιματιστικό να απενεργοποιηθεί αυτόματα μετά από μερικά λεπτά, στο πεδίο ΧΡΟΝΟΜΕΤΡΟ προσαρμόστε την χρονική διάρκεια με τα βελάκια <IonIcon icon={caretUp} color="primary"/>, <IonIcon icon={caretDown} color="primary"/> και πατήστε το κουμπί με την ένδειξη <IonIcon icon={play} color="primary"/>. Το χρονόμετρο θα αρχίσει να λειτουργεί και θα κλείσει το κλιματιστικό μόλις φτάσει στο 0. Όσο το χρονόμετρο τρέχει, μπορείτε να πατήστε το κουμπί με την ένδειξη <IonIcon icon={pause} color="primary"/> για να σταματήσετε την λειτουργία του.</p>
          <IonButton onClick={() => setShowHelp(false)}>ΕΠΙΣΤΡΟΦΗ</IonButton>
        </IonModal>
      </IonContent>
    </IonApp>
  );
};

export default App;
