<template>
  <div class="calculate">
    <div class="calculate-res">
      <p class="calculate-res__title">最低租金预测</p>
      <div class="calculate-res__content">
        {{ minPrice }}
      </div>
    </div>
    <div class="calculate-buttons">
      <el-input v-model="inputNum" class="calculate-input" />
      <el-button @click="clear">重置</el-button>
      <el-button type="primary" @click="getPrice(inputNum)">提交</el-button>
    </div>
  </div>
</template>

<script>
import { RequestConstant } from "@/api/RequestConstant";

export default {
  name: "Calculate",
  data() {
    return {
      inputNum: 0,
      boxList: [
        {
          title: "城市",
          key: "city",
          dropdown: {
            title: "选择城市",
            list: [
              {
                label: "深圳",
                key: "sz"
              },
              {
                label: "广州",
                key: "gz"
              },
              {
                label: "上海",
                key: "sh"
              },
              {
                label: "北京",
                key: "bj"
              }
            ]
          }
        },
        {
          title: "面积",
          key: "area",
          dropdown: {
            title: "选择面积",
            list: [
              {
                label: "0-10m2",
                key: "10"
              },
              {
                label: "10-20m2",
                key: "20"
              },
              {
                label: "20-30m2",
                key: "30"
              },
              {
                label: "30-40m2",
                key: "40"
              },
              {
                label: "40-50m2",
                key: "50"
              }
            ]
          }
        },
        {
          title: "区域",
          key: "zone",
          dropdown: {
            title: "选择区域",
            list: []
          }
        },
        {
          title: "模型",
          key: "model",
          dropdown: {
            title: "选择模型",
            list: [
              {
                label: "决策树",
                key: "1"
              },
              {
                label: "最近邻",
                key: "2"
              },
              {
                label: "逻辑回归",
                key: "3"
              }
            ]
          }
        }
      ],
      minPrice: null,
      params: {
        city: "",
        zone: "",
        area: null,
        model: null
      },
      inputMax: 0,
      inputMin: 0,
      labelMax: 0,
      labelMin: 0,
      model: "" // 模型
    };
  },
  mounted() {
    this.run();
  },
  methods: {
    /**
     * @param {string} key 表示选中的box
     * @param {object} item 表示点击的box-item
     * */
    dropdownClick(key, item) {
      this.params[key] = item.key;
      switch (key) {
        case "city":
          this.boxList[0].dropdown.title = item.label;
          break;
        case "area":
          this.boxList[1].dropdown.title = item.label;
          break;
        case "zone":
          this.boxList[2].dropdown.title = item.label;
          break;
        case "model":
          this.boxList[3].dropdown.title = item.label;
          break;
        default:
          break;
      }
      if (key === "city") {
        this.$axios
          .get(RequestConstant.CITY_ZONE, {
            params: {
              city: item.key
            }
          })
          .then(res => {
            this.boxList[2].dropdown.list = res.data.map(item => {
              return {
                key: item.value,
                label: item.name
              };
            });
          });
      }
    },
    getPrice(outNum) {
      // (x-最小值)/(最大值-最小值)
      this.inputMin.then(min => {
        this.inputMax.then(max => {
          let inputNum = (parseInt(outNum) - min) / (max - min);
          let content = this.model.predict(this.$tf.tensor1d([inputNum]));
          content.array().then(num => {
            this.labelMax.then(labelMax => {
              this.labelMin.then(labelMin => {
                this.minPrice = num * (labelMax - labelMin) + labelMin
              });
            });
          });
        });
      });
    },
    /**
     * 清空筛选条件
     * */
    clear() {
      this.params = {
        city: "",
        zone: "",
        area: null,
        model: null
      };
      this.boxList[0].dropdown.title = "选择城市";
      this.boxList[1].dropdown.title = "选择面积";
      this.boxList[2].dropdown.title = "选择区域";
      this.boxList[3].dropdown.title = "选择模型";
      this.minPrice = "";
    },
    /*
     * 创建模型
     * */
    createModel() {
      const model = this.$tf.sequential();
      model.add(
        this.$tf.layers.dense({ inputShape: [1], units: 50, useBias: true })
      );
      model.add(this.$tf.layers.dense({ units: 10, activation: "sigmoid" }));
      model.add(this.$tf.layers.dense({ units: 1, useBias: true }));
      return model;
    },
    /*
     * 获取模型数据
     * */
    async getModelData() {
      let model = {
        page: 1,
        size: 50
      };
      let cleaned = [];
      await this.$axios
        .get(RequestConstant.LIST, {
          params: model
        })
        .then(response => {
          const carsData = response.data.list;
          cleaned = carsData.map(item => ({
            rent_area: parseInt(item.rent_area),
            rent_price_listing: parseInt(item.rent_price_listing)
          }));
        });
      return cleaned;
    },
    /**
     * 模型数据转换为张量
     * */
    convertToTensor(data) {
      return this.$tf.tidy(() => {
        this.$tf.util.shuffle(data);
        const inputs = data.map(item => {
          return item.rent_area;
        });
        const labels = data.map(d => d.rent_price_listing);
        const inputTensor = this.$tf.tensor2d(inputs, [inputs.length, 1]);
        const labelTensor = this.$tf.tensor2d(labels, [labels.length, 1]);

        //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
        this.inputMax = inputTensor.max();
        this.inputMin = inputTensor.min();
        this.labelMax = labelTensor.max();
        this.labelMin = labelTensor.min();
        // (x-最小值)/(最大值-最小值)
        const normalizedInputs = inputTensor
          .sub(this.inputMin)
          .div(this.inputMax.sub(this.inputMin));
        const normalizedLabels = labelTensor
          .sub(this.labelMin)
          .div(this.labelMax.sub(this.labelMin));
        this.inputMin = this.inputMin.array();
        this.inputMax = this.inputMax.array();
        this.labelMax = this.labelMax.array();
        this.labelMin = this.labelMin.array();

        return {
          inputs: normalizedInputs,
          labels: normalizedLabels
        };
      });
    },
    /**
     * 训练过程
     * */
    async trainModel(model, inputs, labels) {
      model.compile({
        optimizer: this.$tf.train.adam(),
        loss: this.$tf.losses.meanSquaredError,
        metrics: ["mse"]
      });

      const batchSize = 32;
      const epochs = 50;

      return await model.fit(inputs, labels, {
        batchSize,
        epochs,
        shuffle: true,
        callbacks: this.$tfvis.show.fitCallbacks(
          { name: "Training Performance" },
          ["loss", "mse"],
          { height: 200, callbacks: ["onEpochEnd"] }
        )
      });
    },
    /**
     * 训练模型
     * */
    async run() {
      const data = await this.getModelData();
      this.model = this.createModel();
      const tensorData = this.convertToTensor(data);
      const { inputs, labels } = tensorData;
      await this.trainModel(this.model, inputs, labels);
    }
  }
};
</script>

<style lang="scss">
.calculate {
  background: rgba(220, 220, 220, 0.3);
  padding: 20px;
  .calculate-res {
    padding: 20px;
    background: white;
    margin-bottom: 20px;

    .calculate-res__title {
      font-size: 20px;
      font-weight: 500;
      line-height: 40px;
      height: 40px;
    }

    .calculate-res__content {
      border: 1px solid gray;
      margin: 20px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 40px;
      font-weight: 500;
    }
  }
  .calculate-input{
    width: 200px;
    display: block;
    margin: 20px auto;
  }
  .calculate-buttons {
    padding: 20px;
    background: white;
    text-align: center;
  }
}
.el-dropdown-menu {
  padding: 0;
  .el-dropdown-menu__item {
    padding: 0;
    .el-dropdown__calculate {
      width: 120px;
      text-align: center;
      &.is-active {
        background: #ecf5ff;
        color: #66b1ff;
      }
    }
  }
}
</style>
