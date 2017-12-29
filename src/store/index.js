/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    cityList: ['Mumbai',
      'Delhi',
      'Bangalore',
      'Hyderabad',
      'Ahmedabad',
      'Chennai'],
    currentWeather: [],
    selectedCity: '',
    already_present_city:false,
    limit_exceeded:false,
    currentPath: true
  },
  actions: {
    ADD_CITY: function ({ commit }, item) {
      commit('ADD_CITY', item)
    },
    DELETE_CITY: function ({ commit }, item) {
      commit('DELETE_CITY', item)
    },
    WEATHER_REP: function ({ commit, state }, item) {

      axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=` + item + `&APPID=24135440a214d43b879b8e4dcf5d47aa&units=metric`)
        .then(response => {
          commit('WEATHER_SET', response)
        })
        .catch(e => {
        })
    },
    SET_WEA_SRC: function ({ commit }, item) {
      commit('SET_WEA_SRC', item)
    }
  },
  mutations: {
    WEATHER_SET: (state, weather_rep) => {
      var item_splice = parseInt((weather_rep.data.list.length + 1) / 5);
      for (var i = 0; i <= weather_rep.data.list.length; i++) {
        weather_rep.data.list.splice(i + 1, item_splice);
      }
      weather_rep.data.list[0].flex = 12;
      weather_rep.data.list[1].flex = 3;
      weather_rep.data.list[2].flex = 3;
      weather_rep.data.list[3].flex = 3;
      weather_rep.data.list[4].flex = 3;
      state.currentWeather = weather_rep.data.list.filter(item => {
        if (item.weather[0].description.indexOf('clear') != -1) {
          item.icon = '../src/assets/clear_sky.png';
        }
        else if (item.weather[0].description.indexOf('thunder') != -1) {
          item.icon = '../src/assets/thunder.jpg';
        }
        else if (item.weather[0].description.indexOf('rain') != -1) {
          item.icon = '../src/assets/rain.jpg';
        }
        else {
          item.icon = '../src/assets/clouds.png';
        }
        return item;
      });

    },
    ADD_CITY: (state, city) => {
      if(state.cityList.length>=24){
        state.limit_exceeded=true;
        setTimeout(() => {
          state.limit_exceeded=false;
        },2000);
      }
      else{
        if(state.cityList.indexOf(city)==-1){
          state.cityList.push(city);
        }
        else{
          state.already_present_city=true;
          setTimeout(() => {
            state.already_present_city=false;
          },2000);
        }
      }
        
      
    },
    DELETE_CITY: (state, index) => {
      state.cityList.splice(state.cityList.indexOf(index), 1)
    }
  },
  getters: {

  }
})
export default store