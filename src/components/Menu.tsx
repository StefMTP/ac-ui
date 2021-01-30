import React from "react";
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonItem, IonIcon, IonCardContent, IonItemDivider,IonButton, IonLabel } from "@ionic/react";
import { thermometer, swapVertical, timer, pause, play, caretUp, caretDown } from "ionicons/icons";
import { modes, modesIcons, intensity, intensityIcons } from "../data";

import Timer from './Timer';

const Menu: React.FC<{
    isOn: boolean; 
    mode: number; 
    intensity: number; 
    temperature: number; 
    swing: boolean; 
    minutes: number;
    seconds: number;
    timerOn: boolean;
    powerHandler: () => void;
    modeHandler: () => void; 
    intensityHandler: () => void; 
    temperatureHandler: (event: any) => void; 
    swingHandler: () => void; 
    timerHandler: () => void;
    timerChanger: (event: any) => void;
    minutesHandler: (min: number) => void;
    secondsHandler: (sec: number) => void;
    }>
    = (props) => {

    return props.isOn ? (
        <section>
            <IonRow>
                <IonCol size="10">
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonItem>
                                <IonLabel>ΘΕΡΜΟΚΡΑΣΙΑ</IonLabel>
                                <IonIcon slot="start" icon={thermometer} color="primary"/>
                            </IonItem>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItemDivider>{props.temperature}°C</IonItemDivider>
                    </IonCardContent>
                </IonCard>
                </IonCol>
                <IonCol size="2" className="ion-align-items-center">
                    <IonRow>
                        <br/>
                    </IonRow>
                    <IonRow>
                        <IonButton id="plus" onClick={props.temperatureHandler}><IonIcon size="large" icon={caretUp} /></IonButton>
                    </IonRow>
                    <IonRow>
                        <IonButton id="minus" onClick={props.temperatureHandler}><IonIcon size="large" icon={caretDown} /></IonButton>
                    </IonRow>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonItem>
                                ΛΕΙΤΟΥΡΓΙΑ
                                <IonIcon slot="start" icon={modesIcons[props.mode]} color="primary"/>
                            </IonItem>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItemDivider>{modes[props.mode]}</IonItemDivider>
                        <IonButton expand="block" onClick={props.modeHandler}>ΑΛΛΑΓΗ</IonButton>
                    </IonCardContent>
                </IonCard>
                </IonCol>
                <IonCol>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonItem>
                                ΕΝΤΑΣΗ
                                <IonIcon slot="start" icon={intensityIcons[props.intensity]} color="primary"/>
                            </IonItem>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItemDivider>{intensity[props.intensity]}</IonItemDivider>
                        <IonButton expand="block" onClick={props.intensityHandler}>ΑΛΛΑΓΗ</IonButton>
                    </IonCardContent>
                </IonCard>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonItem>
                                ΚΙΝΗΣΗ ΠΕΡΣΙΔΩΝ
                                <IonIcon slot="start" icon={swapVertical} color="primary"/>
                            </IonItem>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonItemDivider>{props.swing ? "ΑΝΟΙΧΤΗ" : "ΚΛΕΙΣΤΗ"}</IonItemDivider>
                        <IonButton expand="block" onClick={props.swingHandler}>ΑΛΛΑΓΗ</IonButton>
                    </IonCardContent>
                </IonCard>
                </IonCol>
                <IonCol>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>
                            <IonItem>
                                ΧΡΟΝΟΜΕΤΡΟ
                                <IonIcon slot="start" icon={timer} color="primary"/>
                            </IonItem>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                    <IonItemDivider><Timer isOn={props.timerOn} minutes={props.minutes} seconds={props.seconds} minutesHandler={props.minutesHandler} secondsHandler={props.secondsHandler} timerOff={props.timerHandler} appOff={props.powerHandler} /></IonItemDivider>
                        <IonButton onClick={props.timerHandler}>{props.timerOn ? <IonIcon size="large" icon={pause} color="danger"/> : <IonIcon size="large" icon={play} color="success"/>}</IonButton>
                        <IonButton id="plus" onClick={props.timerChanger}><IonIcon  icon={caretUp} /></IonButton>
                        <IonButton id="minus" onClick={props.timerChanger}><IonIcon  icon={caretDown} /></IonButton>
                    </IonCardContent>
                </IonCard>
                </IonCol>
            </IonRow>
          </section>
    ): null;
}

export default Menu;