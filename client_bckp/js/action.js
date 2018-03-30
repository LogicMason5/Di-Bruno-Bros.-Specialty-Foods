Vue.component('todo-item', {
  props: ['todo'],
  template: '<li :data-id="todo.id" :data-type="todo.type">{{ todo.text }}</li>'
})

var app7 = new Vue({
  el: '#app-7',
  data: {
    name:"aditya",
    groceryList: [
      { id: 0, text: 'Sukhakarta Dukhaharta', "type": "aarti" },
      { id: 1, text: 'Lavthavti Vikrala', "type": "aarti"},
      { id: 2, text: 'Durge Durghat', "type": "aarti"}
    ],
    song: {
      audio: null,
      lyrics: ""
    },
  },
  methods: {
    getAarti: function (event) {
      // `this` inside methods points to the Vue instance
      console.log(event);
      console.log("http://localhost:3000/api/"+event.target.dataset.type+"/"+event.target.dataset.id);

      this.$http.get("http://localhost:3000/api/"+event.target.dataset.type+"/"+event.target.dataset.id)
      .then(response => {
          this.song.lyrics = response.body.lyrics;
          console.log(response.body.lyrics);
        }, response => {
        // error callback
      });

      //alert('Hello ' + this.groceryList[parseInt(event.target.attributes["0"].value)].text + '! ');
    }
  }
});
