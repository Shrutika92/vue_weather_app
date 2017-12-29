<template>
<div>
<div  v-if="['cities'].indexOf($route.name) > -1">
<v-alert color="warning" icon="priority_high" v-show="already_present_city">
The city is already present in the list. Try adding another city    </v-alert>

<v-alert color="warning" icon="priority_high" v-show="limit_exceeded">
The city list is already full. Try deleting some from the list to add new.  </v-alert>
<v-alert color="warning" icon="priority_high" v-show="no_city_name">
Type only valid city names from google search results </v-alert>
<v-container sm4 text-xs-center>
 <vuetify-google-autocomplete
           id="map"
           googleApiKey="AIzaSyDgay74Vf_nLhqMvAKMBC-Gh2OAeAs6aHE"
            append-icon="search"
            classname="form-control"
            placeholder="Please type your address"
            value="kolkata"
            v-on:placechanged="getAddressData"
            
        >
        </vuetify-google-autocomplete>
         <v-btn round color="primary" dark v-on:click="addCity">Add City</v-btn>
  </v-container>
 <v-layout row wrap>
 <v-flex class="pa-2"  v-for="(currentCity,index) in cityList" :key="index" @click="weather_rep(currentCity)">
        <v-card>
         <router-link v-bind:to="'/cities/'+currentCity"> <v-btn flat class="px-0"> {{currentCity}}</v-btn></router-link>
         
          <v-btn fab flat small @click="delCity(currentCity)"><v-icon  >delete</v-icon></v-btn>
        </v-card>
         
      </v-flex>
 </v-layout>
 

</div>
  
     <router-view></router-view>
</div>
</template>
 
<script>
/* eslint-disable */
import { mapState } from "vuex";
    import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete'


export default {
  components: {
    VuetifyGoogleAutocomplete 
  },
  data: function() {
    return {
      address: '',
      no_city_name:false
    
    };
  },
  methods: {
   
    getAddressData: function(addressData, placeResultData) {
      if (addressData.locality) {
        this.address = addressData.locality;
      }
      else if (addressData.administrative_area_level_3) {
        this.address = addressData.administrative_area_level_3;
      }
       else {
        this.no_city_name=true;
         setTimeout(() => {
          this.no_city_name=false;
        },2000);
      }
    },
    addCity: function(event) {
        if(this.address==""){
            this.no_city_name=true;
         setTimeout(() => {
          this.no_city_name=false;
        },2000);
        }
        else{
this.$store.dispatch("ADD_CITY", this.address);
        }
      
    },
    delCity: function(key) {
      this.$store.dispatch("DELETE_CITY", key);
    },
    weather_rep: function(city_name) {
      this.$store.dispatch("WEATHER_REP", city_name);
    }
  },
  computed: mapState(["cityList","already_present_city","limit_exceeded"])
};
</script>

<style>
.city-block {
  border: 1px solid black;
  font-size: 26px;
  display: inline-block;
  padding: 1%;
  cursor: pointer;
  color: cornflowerblue;
}

#cityList {
  padding: 2%;
}

.deleteCity {
  width: 5%;
  float: right;
}

.side-bar {
  width: 182px;
}
</style>