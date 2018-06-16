<template>
  <div>
    <div class="container">
      <h1>Listado</h1>
      <router-link to="/" class="btn btn-link">Home</router-link>
        <table class="table">
            <thead>
                <tr>
                    <th>Url Original</th>
                    <th>Url corta</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="data in list">
                    <td>{{data.url}}</td>
                    <td><a v-bind:href="data.url_short" class="btn btn-link" target="_blank">{{data.url_short}}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import config from "../appsettings";
export default {
  data() {
    return {
      list: []
    };
  },
  mounted: function() {
    ///
    var self = this;
    var data = null;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        let result = JSON.parse(this.responseText);
        self.list = result.content.urls;
      }
    });

    xhr.open("GET", config.API_URL + "/shortener/urlall");

    xhr.send(data);
    ///
  },
  methods: {}
};
</script>
