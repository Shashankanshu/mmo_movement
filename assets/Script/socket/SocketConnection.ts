
import { Component, Primitive, TERRAIN_HEIGHT_BASE, _decorator } from 'cc';
import Colyseus from 'db://colyseus-sdk/colyseus.js';
import { Player } from '../Player';

const { ccclass, property } = _decorator;

@ccclass('SocketConnection')
export class SocketConnection extends Component {

    static instance: SocketConnection;
    playerName: string;
    isConnected: boolean = false;

    @property hostname = "localhost";
    @property port = 2567;
    @property useSSL = false;

    client!: Colyseus.Client;
    room!: Colyseus.Room;

    constructor() {
        super();
        SocketConnection.instance = this;
    }

    start() {

        // Instantiate Colyseus Client
        // connects into (ws|wss)://hostname[:port]

        /* let domain = window.location.href.split('/')[2];
        let url = "ws://" + domain.split(':')[0] + ':2567'; */

        let url = `${this.useSSL ? "wss" : "ws"}://${this.hostname}${([443, 80].includes(this.port) || this.useSSL) ? "" : `:${this.port}`}`;
        this.client = new Colyseus.Client(`${this.useSSL ? "wss" : "ws"}://${this.hostname}${([443, 80].includes(this.port) || this.useSSL) ? "" : `:${this.port}`}`);

        console.log(`Connecting server to ${url}`);
        this.connect();
    }


    async connect() {
        try {
            this.room = await this.client.joinOrCreate("SumoRoom");

            console.log("Room joined successfully!");
            console.log("user's sessionId:", this.room.sessionId);

            // this.room.onStateChange((state) => {
            //     console.log("onStateChange: ", state);
            // });

            this.room.onLeave((code) => {
                console.log("onLeave:", code);
                this.isConnected = false;
            });

            /* this.room.state.playerMap.onChange = (player, key) => {
                console.log(player, "have changes at", key);
            };
            */

            this.room.state.playerMap.onAdd = (player, key) => {
                console.log(player, "has been added at", key);

                this.isConnected = true;

                // add your player entity to the game world!
                this.addPlayerToWorld(player, key);

                // If you want to track changes on a child object inside a map, this is a common pattern:
                player.onChange = function (changes) {
                    SocketConnection.instance.onPlayerChange(this);
                };

                // force "onChange" to be called immediatelly
                player.triggerAll();
            };

            

        } catch (e) {
            console.error(e);
        }
    }

    send(msg) {
        this.room.send('action', msg)
    }

    onPlayerChange(playerContext) {

    }

    addPlayerToWorld(player, key) {
    }
}
