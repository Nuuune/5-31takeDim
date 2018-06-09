/**
 * 用于对请求来的数据进行格式化
 */

export const course_fmt = {
  list: function(data) {
    return data.map((item) => {
            let w, i, numOfClasses = 0;
            if(item.chapters.length > 0) {
              w = item.chapters.length;
            }else {
              return {
                ...item,
                numOfClasses
              }
            }
            for(let i = 0; i < w; i++) {
              numOfClasses += item.chapters[i].items.length;
            }
            return {
              ...item,
              numOfClasses
            };
          });
  },
  detail: function(data) {
    let w, i, numOfClasses = 0;
    if(data.chapters.length > 0) {
      w = data.chapters.length;
    }else {
      return {
        ...data,
        numOfClasses
      }
    }
    for(let i = 0; i < w; i++) {
      numOfClasses += data.chapters[i].items.length;
    }
    return {
      ...data,
      numOfClasses
    };
  }
}
