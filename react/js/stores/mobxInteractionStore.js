import { observable, action } from 'mobx';
import config from "../../config/main.config";

class MobxInteractionStore {
    // diese Variable ist ein Observable. Wenn in einer Komponente auf diese Variable gehört wird
    // wird die Komponente neu gerendert.
    @observable rabbit = '';

    // Hinweis: Counter soll ein Integer sein, daher Initialisierung mit 0
    @observable counter = 0;

    @observable messageText  = '';

    // 3. Action wird aufgerufen. Parameter ist in diesem Beispiel nun "francis"
    @action selectRabbit(rabbit) {
        console.log("selectRabbit Action: " + rabbit);
        // observable rabbit wird auf den Parameter der Methode rabbit gesetzt.
        this.rabbit = rabbit;
    }

    // d. die Action wird aufgerufen und das Observable counter um 1 erhöht.
    @action countUp() {
        this.counter += 1;
    }

    // d. die Action wird aufgerufen und das Observable counter um 1 verringert.
    @action countDown() {
        this.counter -= 1;
    }

    @action setMessageText(messageText) {
        this.messageText = messageText;
    }


}

const store = new MobxInteractionStore();

export default store;