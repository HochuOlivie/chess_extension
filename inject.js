window.addEventListener('message', function(event) {
    console.log(event.data)
    if (event.data.type !== 'make_move') {
        return;
    }
});

(function() {
    'use strict';

    const { set } = Object.getOwnPropertyDescriptor(window.WebSocket.prototype, 'onmessage');
    delete window.WebSocket.prototype.onmessage;

    Object.defineProperty(
        window.WebSocket.prototype,
        'onmessage',
        {
            set: function(...data) {
                this.addEventListener("message", e => {
                    handleMove(e.data);
                });
                return set.apply(this, data);
            }
        }
    );
})();


function handleMove(json) {
    var obj = JSON.parse(json);
    if (obj.t==='move' && obj.hasOwnProperty('d') && obj.d.hasOwnProperty('fen')) {
        var fen = obj.d.fen;
        var ply = obj.d.ply;

        var message =  { type: 'made_move',
            text: fen,
            seq: ply
        }
        console.log(message)
        window.postMessage( message,
            '*');
    }
}