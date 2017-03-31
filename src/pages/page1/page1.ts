import { Component } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController } from 'ionic-angular';

import * as io from "socket.io-client";

import * as crel from 'crel';
import * as capture from 'rtc-capture';
import * as attach from 'rtc-attach';
import { qsa } from 'fdom';
// import { quickconnect } from 'rtc-quickconnect';
// import { signaller } from 'rtc-signaller-socket.io';
// import { freeice } from 'freeice';
@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})

export class Page1 {
  socket: any
  plugins = [
    require('rtc-plugin-temasys')
  ]
  public camera: boolean
  public lStream:any
  lol:any
  remote = crel('div', { class: 'remote' })
  remotos = []
  local = []
  sanador: any
  
  constructor(public navCtrl: NavController,private sanitizer: DomSanitizer) {
    // this.connect()
    // console.log(this.plugins)
    this.sanador = sanitizer
    this.camera = false
  }

  connect(): void {
    var self = this
    this.lol = "lol"
    capture({ audio: true, video: true }, { plugins: this.plugins }, function (err, localStream) {
      if (err) {
        return console.error('could not capture media: ', err);
      }

      // render the local media
      // console.log(this.plugins)
      // console.log(self.plugins)
      var URL = typeof window != 'undefined' && window.URL;
      
      attach(localStream, { plugins: self.plugins }, function (err, el) {
        // self.local=el;
        console.log(el)
        let aux=URL.createObjectURL(localStream).toString();
        self.lStream = self.sanitizer.bypassSecurityTrustResourceUrl(aux)
        self.camera = true
        self.local.push(self.lStream)
        console.log(self.local)
        setInterval(()=>{

        },100)
      });
      self.socket = io("https://192.168.0.109:3000")
      self.socket.on('connect', () => {
        // alert("lol")
      })
      // console.log(localStream)
      var signaller = require('rtc-signaller-socket.io')(self.socket)
      // console.log(signaller)
      // signaller(self.socket);

      // initiate connection
      
      require('rtc-quickconnect')(signaller, {
        iceServers: require('freeice')(),
        room: 'test-room',
        plugins: self.plugins
      })
        // broadcast our captured media to other participants in the room
        .addStream(localStream)
        .on('channel:opened:test', function (id, dc) {
          //alert("channel:opened:test")
          console.log('data channel opened with peer: ' + id);
        })
        // when a peer is connected (and active) pass it to us for use
        .on('call:started', function (id, pc, data) {
          //alert("call:started")
          console.log(pc)
          var pcs = pc.getRemoteStreams();
          for (var i = 0; i < pcs.length; i++) {
            attach(pcs[i], { plugins: self.plugins }, function (err, el) {
              if (err) return;
              //alert("Por aqui paso")
              el.dataset.peer = id;

              self.remotos.push(el);
              console.log("Streamss")
              console.log(el)
            });
          }
        })
        // when a peer leaves, remove teh media
        .on('call:ended', function (id) {
          //alert("call:ended")
          qsa('*[data-peer="' + id + '"]', self.remote).forEach(function (el) {
            el.parentNode.removeChild(el);
          });
        });
    });

    /* extra code to handle dynamic html and css creation */

    // // add some basic styling
    document.head.appendChild(crel('style', [
      '.local { position: absolute;  right: 10px; }',
      '.local video { max-width: 200px; }',
      // '.remote { position: absolute;  right: 10px; }',
      '.remote video { max-width: 300px; }'
    ].join('\n')));

    // window.addEventListener('load',fin);
    // add the local and remote elements
    // document.getElementById("local").appendChild(self.local);
    // console.log(document.querySelector('#body'))
    // document.getElementById("remoto").appendChild(self.remote);
    this.listo()
  }
  
  listo(): void {
      // this.local = this.lStream;
    // document.body.querySelector("#local").innerHTML=this.local;
    // console.log(this.local)
    // document.body.querySelector("#remote").innerHTML=this.remote;
  }
  public iniciar(){
    console.log("Click")
    this.connect()
  }
}
