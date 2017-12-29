<template>
<div >
<v-toolbar dark color="primary" fixed>
      <v-toolbar-title>{{$route.path.split("/cities/")[1]}}</v-toolbar-title>
     <v-spacer></v-spacer>
    <router-link xs6  v-bind:to="'/cities'"><v-btn flat>Cities</v-btn></router-link>
     <v-spacer></v-spacer>
     <v-btn flat v-on:click="viewChange" ><img/>Change View</v-btn>
      <v-spacer></v-spacer>
      <v-flex xs4>
            <v-select
              v-bind:items="cityList"
              
              label="Select"
              single-line
                v-on:change="onChange"
              autocomplete
            ></v-select>
           </v-flex>
    </v-toolbar>
<v-layout column style="margin-top:8%">
 
        <v-container fluid grid-list-md >
          <v-layout row wrap >
          
            <v-flex v-if="!viewList"
             v-bind="{ [`xs${item.flex}`]: true }" v-for="item in currentWeather"
              :key="item.main.temp"
            >
            <v-card>
               <span class="subheading">{{item.dt_txt.split(' ')[0]}}</span>
                <v-card-media
                  :src="item.icon"
                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline black--text">{{item.main.temp}} &#8451;</span>
                        <div>
                        <span class="subheading">Min-temp </span><span class="extraDesc">{{item.main.temp_min}} &#8451;</span><br>
                        </div>
                        <div>
                        <span class="subheading">Max-temp </span><span class="extraDesc">{{item.main.temp_max}} &#8451;</span><br>
                        </div>
                          <div>
                        <span class="subheading">{{item.weather[0].description}}</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-flex>
            <v-flex xs12 v-if="viewList"
              v-for="item in currentWeather"
              :key="item.main.temp"
            >
              <v-card >
               <span class="subheading">{{item.dt_txt.split(' ')[0]}}</span>
                <v-card-media
                  :src="item.icon"
                  height="200px"
                >
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <span class="headline black--text">{{item.main.temp}} &#8451;</span>
                        <div>
                        <span class="subheading">Min-temp </span><span class="extraDesc">{{item.main.temp_min}} &#8451;</span><br>
                        </div>
                        <div>
                        <span class="subheading">Max-temp </span><span class="extraDesc">{{item.main.temp_max}} &#8451;</span><br>
                        </div>
                          <div>
                        <span class="subheading">{{item.weather[0].description}}</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card-media>
                <v-card-actions class="white">
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-layout>
</div>
</template>
<script>
/* eslint-disable */
import {mapState} from 'vuex'
export default {
  name: 'city',
   data: () => ({
     'viewList':false
    }),
  
    methods:{
         onChange (currentCity) {
           this.$router.push('/cities/' + currentCity)
     this.$store.dispatch("WEATHER_REP", currentCity);
    },
   viewChange:function(){
     if(this.viewList){
       this.viewList=false
     }
     else{
       this.viewList=true
     }
     
   }
    },
     created: function() {
     },
      computed:mapState([
        'currentWeather',
        'cityList'
      ]),
}
</script>