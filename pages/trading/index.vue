<template>
<section>
<div class="card card-1">
    <h1>Select exchange currencies</h1>
    <table>
        <tr>
            <th><h1>From</h1></th>
            <th>
                <div class="select-style">
                <select v-model="selectedFrom" @change="onchange()">
                <option v-for="item in apiData" :value="item.id" :key="item.currency">
                {{ item.currency }}
                </option>
                </select>
                </div>
            </th> 
            <th><h1>To</h1></th>
            <th>
                <div class="select-style">
                <select v-model="selectedTo" @change="onchange()">
                <option v-for="item in apiData" :value="item.id" :key="item.currency">
                {{ item.currency }}
                </option>
                </select>
                </div>
            </th>
            <th>
                <div class="loader" v-if="loading"></div>
                <div class="loader2" v-if="!loading"></div>
            </th>
            <th>
                <div class="card card-1">
                    <p>Real time exchange rate</p>
                    <h2 v-if="realTimeExchangeRate!==0">{{ realTimeExchangeRate }}</h2>
                    <p>{{ selectedFrom }} ⮀ {{ selectedTo }}</p>
                </div>
            </th>
        </tr>
    </table>
    <p v-if="apiError.isError" style="color:red;">{{ apiError.message }}</p>
    
        <table style="width:100%">
            <tr>
            <th>
                <vue-anychart class="container" :options="LineData" ref="lineChart"></vue-anychart>
            </th>
            <th>
                <input type="radio" id="radio_one" value="1" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_one">1W</label>
                <br>
                <input type="radio" id="radio_two" value="2" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_two">1M</label>
                <br>
                <input type="radio" id="radio_three" value="3" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_three">1Y</label>
                <br>
                <input type="radio" id="radio_four" value="4" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_four">2Y</label>
                <br>
                <input type="radio" id="radio_five" value="5" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_five">5Y</label>
                <br>
                <input type="radio" id="radio_six" value="6" v-model="radio_picked" v-on:change="onchange()">
                <label for="radio_six">10Y</label>
            </th> 
            </tr>
        </table>
</div>
</section>
</template>

<script>
import VueAnychart from "@/components/VueAnychart";
import Anychart from "anychart";

import axios from "axios";

export default {
  components: {
    VueAnychart
  },
  computed: {
    isAuthenticated() {
      if (this.$store.getters.isAuthenticated) {
        return this.$store.getters.isAuthenticated;
      } else {
        return false;
      }
    }
  },
  data() {
    return {
      selectedFrom: "",
      selectedTo: "",
      apiResponse: [],
      loading: false,
      apiError: {
        isError: false,
        message: ""
      },
      realTimeExchangeRate: 0.00,
      radio_picked: "3",
      LineData: {
        chart: {
          type: "line",
          series: [
            {
              data: []
            }
          ],
          title: "Historical exchange chart"
        }
      }
    };
  },
  methods: {
    onchange: function() {
      //console.log(this.selectedFrom);

      if (this.selectedFrom !== "" && this.selectedTo !== "" && this.selectedTo !== this.selectedFrom) {
        //console.log(this.selectedFrom + " to " + this.selectedTo);
        this.loading = true;
        axios
          .get(
            "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=" +
              this.selectedFrom +
              "&to_symbol=" +
              this.selectedTo +
              "&outputsize=full&apikey=PV4K2I37RESX6NW6"
          )
          .then(response => {
            this.loading = false;
            //console.log(response.data);
            if (
              typeof response.data["Time Series FX (Daily)"] !== "undefined"
            ) {
              this.apiError.isError = false;
              this.apiError.message = "";
              var now = new Date();
              var tempData = [];
              var iDateString;
              var startingDate = new Date();

              if (this.radio_picked === "1") {
                startingDate.setDate(startingDate.getDate() - 7);
              } else if (this.radio_picked === "2") {
                startingDate.setDate(startingDate.getDate() - 31);
              } else if (this.radio_picked === "3") {
                startingDate.setDate(startingDate.getDate() - 365);
              } else if (this.radio_picked === "4") {
                startingDate.setDate(startingDate.getDate() - 730);
              } else if (this.radio_picked === "5") {
                startingDate.setDate(startingDate.getDate() - 1825);
              } else if (this.radio_picked === "6") {
                startingDate.setDate(startingDate.getDate() - 3650);
              }

              //console.log(startingDate);
              for (var d = startingDate; d < now; d.setDate(d.getDate() + 1)) {
                iDateString = d.toISOString().substring(0, 10);
                //console.log(
                //  "iDateString = " + iDateString + " getDay = " + d.getDay()
                //);
                //console.log(typeof response.data["Time Series FX (Daily)"]);

                if (
                  typeof response.data["Time Series FX (Daily)"][
                    iDateString
                  ] !== "undefined" &&
                  typeof response.data["Time Series FX (Daily)"][iDateString][
                    "1. open"
                  ] !== "undefined"
                ) {
                  tempData.push({
                    x: iDateString,
                    value:
                      response.data["Time Series FX (Daily)"][iDateString][
                        "1. open"
                      ]
                  });
                }
              }
              this.removeAll();
              this.add(tempData);
              axios
                .get(
                  "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" +
                    this.selectedFrom +
                    "&to_currency=" +
                    this.selectedTo +
                    "&apikey=PV4K2I37RESX6NW6"
                )
                .then(response => {
                  if (
                    typeof response.data["Realtime Currency Exchange Rate"] !== "undefined" &&
                    typeof response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] !== "undefined"
                  ){
                      this.realTimeExchangeRate = response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"];
                  }
                });
            } else {
              this.removeAll();
              this.apiError.isError = true;
              this.apiError.message = "API sent wrong response. Wait a second and try again.";
            }
          })
          .catch(error => {
            console.log(error.message);
            this.loading = false;
          });
      }
    },
    oneWeekOnClick: function() {
      var chart = this.$refs.lineChart;
      console.log(chart);
    },
    add(data) {
      this.$refs.lineChart.addSeries(data);
      this.lineSeriesCount++;
    },
    removeAll() {
      this.$refs.lineChart.removeAllSeries();
      this.lineSeriesCount = 0;
    }
  },
  async asyncData({ app }) {
    const apiResponse = await app.$axios.$get(
      "https://openexchangerates.org/api/currencies.json"
    );
    //console.log(apiResponse);
    var apiData = [];
    for (var key in apiResponse) {
      if (apiResponse.hasOwnProperty(key)) {
        //console.log(key + " -> " + apiResponse[key]);
        apiData.push({ id: key, currency: apiResponse[key] });
      }
    }
    //console.log(apiData);
    return { apiData };
  }
};
</script>


<style scoped>
.container {
  width: 100%;
  height: 500px;
  margin: 0;
  padding: 0;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  align-self: center;
}

.loader2 {
  width: 120px;
  height: 120px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.select-style {
  border: 1px solid #ccc;
  width: 120px;
  border-radius: 3px;
  overflow: hidden;
  background: #fafafa no-repeat 90% 50%;
}

.select-style select {
  padding: 5px 8px;
  width: 130%;
  border: none;
  box-shadow: none;
  background: transparent;
  background-image: none;
  -webkit-appearance: none;
}

.select-style select:focus {
  outline: none;
}

.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  width: 98%;
  padding: 30px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>

