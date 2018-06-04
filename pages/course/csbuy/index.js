

let pageConfig = {
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }
};

Page(pageConfig);
