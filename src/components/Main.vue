<template>
  <div>
    <div class="container">
      <h1>Acortador Url</h1>
        <div class="form-group">
          <fieldset >
            <label class="control-label" for="disabledInput">Ingresa la url</label>
            <input class="form-control" placeholder="URL" type="text" v-model="txtUrl">
          </fieldset>
          <br>
          <button type="button" class="btn btn-primary" v-on:click="shortClick">Acortar</button>
          <p></p>
          <input type="file" name="fileToUpload" @change="processFile($event)">
          <button type="button" class="btn btn-primary" v-on:click="uploadBulk">Subir</button>
          <p></p>

          <table class="table">
            <thead>
                <tr>
                    <th>Url Original</th>
                    <th>Url corta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in listUrlShort">
                    <td>{{data.url}}</td>
                    <td><a v-bind:href="data.url_short" class="btn btn-link" target="_blank">{{data.url_short}}</a></td>
                </tr>
            </tbody>
        </table>

          <a v-bind:href="url_short" class="btn btn-link" target="_blank">{{url_short}}</a>
          <p></p>
          <router-link to="/all" class="btn btn-link">Ver todas las url</router-link>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      txtUrl: "",
      url_short: "",
      listUrl: [],
      listUrlShort: []
    };
  },
  methods: {
    shortClick: function() {
      var self = this;
      ///
      var data = JSON.stringify({
        url: this.txtUrl
      });

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          let result = JSON.parse(this.responseText);

          self.url_short = result.content.url_shorter;
        }
      });

      xhr.open("POST", "http://localhost:3000/api/shortener/url");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(data);
      ///
    },
    processFile(event) {
      var self = this;
      let file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = function(e) {
        var list = reader.result.split("\n");
        self.listUrl = list;
      };
    },
    uploadBulk: function() {
      var self = this;
      ///
      var data = JSON.stringify({
        url_bulk: this.listUrl
      });

      var xhr = new XMLHttpRequest();

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          let result = JSON.parse(this.responseText);
          self.listUrlShort = result.content.url_bulk;
        }
      });

      xhr.open("POST", "http://localhost:3000/api/shortener/urlbulk");
      xhr.setRequestHeader("Content-Type", "application/json");

      xhr.send(data);
      ///
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
