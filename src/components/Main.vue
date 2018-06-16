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
      url_short: ""
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
