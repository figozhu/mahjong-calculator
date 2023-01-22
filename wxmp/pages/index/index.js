//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    fuItems: [
      { name: '20', value: 20 },
      { name: '25', value: 25 },
      { name: '30', value: 30, checked: 'true' },
      { name: '40', value: 40 },
      { name: '50', value: 50 },
      { name: '60', value: 60 },
      { name: '70', value: 70 },
      { name: '80', value: 80 },
      { name: '90', value: 90 },
      { name: '100', value: 100 },
      { name: '110', value: 110 },
    ],
    iCurrFuNum: 30,

    fanItems: [
      { name: '1', value: 1 },
      { name: '2', value: 2, checked: 'true' },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
      { name: '11', value: 11 },
      { name: '12', value: 12 },
      { name: '13+（役满）', value: 13 },
    ],
    iCurrFanNum: 2,

    iDealerZM: 0, // 庄家自摸，每家输的分数
    iDealerCHONG: 0,  // 冲给庄家，输的分数

    iOhterZM_Dealer: 0, // 闲家自摸，庄家输的分数
    iOhterZM_Other: 0,  // 闲家自摸，闲家输的分数
    iOhterCHONG: 0, // 冲给闲家，输的分数
  },

  onLoad: function () {
    this.calcWinningPoints();
  },

  // 计算真正的最后得分
  getRealWinningPoints: function (iPoints) {
    const iHundredPart = parseInt(iPoints / 100) * 100;
    const iOtherPart = iPoints % 100 === 0 ? 0 :100;
    return iHundredPart + iOtherPart;
  },

  // 计算真正的基础得分
  getRealBasePoints: function (iFu, iFan) {
    let iBasePoints = iFu * Math.pow(2, iFan + 2);

    // a>2000时，a固定为2000点。
    if (iBasePoints > 2000) {
      iBasePoints = 2000;
    }

    /*
      满贯
        5翻，a固定为2000点。
      跳满
        6～7翻，a=3000点。
      倍满
        8～10翻，a=4000点。
      三倍满
        11～12翻，a=6000点。
      役满
        一些高难度的役叫做役满。役满的a是8000点。
     */
    if (iFan === 5) {
      iBasePoints = 2000;
    }
    else if (iFan >= 6 && iFan <= 7) {
      iBasePoints = 3000;
    }
    else if (iFan >= 8 && iFan <= 10) {
      iBasePoints = 4000;
    }
    else if (iFan >= 11 && iFan <= 12) {
      iBasePoints = 6000;
    }
    else if (iFan >= 13) {
      iBasePoints = 8000;
    } 
    
    console.log(`结果：基本分=${iBasePoints}`);

    return iBasePoints;
  },

  calcWinningPoints: function () {
    const iFu = parseInt(this.data.iCurrFuNum);
    const iFan = parseInt(this.data.iCurrFanNum);
    console.log(`计算：[${iFu}]符，[${iFan}]番`);

    const iBasePoints = this.getRealBasePoints(iFu, iFan);

    let iOhterZM_Dealer = this.getRealWinningPoints(iBasePoints * 2);
    let iOhterZM_Other = this.getRealWinningPoints(iBasePoints);

    let iOhterCHONG = this.getRealWinningPoints(iBasePoints * 4);
    let iDealerZM = this.getRealWinningPoints(iBasePoints * 2);
    let iDealerCHONG = this.getRealWinningPoints(iBasePoints * 6);

    // 一些特例处理
    if (iFan === 1) {
      if (iFu === 20) {
        iDealerZM = '-';
        iDealerCHONG = '-';

        iOhterZM_Dealer = '-';
        iOhterZM_Other = '-';
        iOhterCHONG = '-';
      }
      else if (iFu === 25) {
        iDealerZM = '-';
        iDealerCHONG = '-';

        iOhterZM_Dealer = '-';
        iOhterZM_Other = '-';
        iOhterCHONG = '-';
      }
      else if (iFu === 110) {
        iDealerZM = '-';

        iOhterZM_Dealer = '-';
        iOhterZM_Other = '-';
      }
    }
    else if (iFan === 2) {
      if (iFu === 20) {
        iDealerCHONG = '-';

        iOhterCHONG = '-';
      }
      else if (iFu === 25) {
        iDealerZM = '-';

        iOhterZM_Dealer = '-';
        iOhterZM_Other = '-';
      }
    }
    else if (iFan === 3) {
      if (iFu === 20) {
        iDealerCHONG = '-';

        iOhterCHONG = '-';
      }
    }
    else if (iFan === 4) {
      if (iFu === 20) {
        iDealerCHONG = '-';

        iOhterCHONG = '-';
      }
    }

    this.setData({
      iOhterZM_Dealer: iOhterZM_Dealer,
      iOhterZM_Other: iOhterZM_Other,
      iOhterCHONG: iOhterCHONG,

      iDealerZM: iDealerZM,
      iDealerCHONG: iDealerCHONG,
    });
  },


  fuChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      iCurrFuNum: e.detail.value,
    });

    this.calcWinningPoints();
  },
  fanChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      iCurrFanNum: e.detail.value,
    });

    this.calcWinningPoints();
  },

  adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    console.log('Banner 广告加载失败', err)
  },
  adClose() {
    console.log('Banner 广告关闭')
  }
})
