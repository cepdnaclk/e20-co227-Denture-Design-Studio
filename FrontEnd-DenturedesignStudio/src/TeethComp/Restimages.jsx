import t10rest_middle from "./rests/t10rest_middle.png";
import t11rest_down from "./rests/t11rest_down.png";
import t11rest_middle from "./rests/t11rest_middle.png";
import t11rest_up from "./rests/t11rest_up.png";
import t12rest_down from "./rests/t12rest_down.png";
import t12rest_up from "./rests/t12rest_up.png";
import t13rest_down from "./rests/t13rest_down.png";
import t13rest_up from "./rests/t13rest_up.png";
import t14rest_down from "./rests/t14rest_down.png";
import t14rest_up from "./rests/t14rest_up.png";
import t15rest_down from "./rests/t15rest_down.png";
import t15rest_up from "./rests/t15rest_up.png";
import t16rest_up from "./rests/t16rest_up.png";
import t17rest_down from "./rests/t17rest_down.png";
import t18rest_down from "./rests/t18rest_down.png";
import t18rest_up from "./rests/t18rest_up.png";
import t19rest_down from "./rests/t19rest_down.png";
import t19rest_up from "./rests/t19rest_up.png";
import t1rest_up from "./rests/t1rest_up.png";
import t20rest_down from "./rests/t20rest_down.png";
import t20rest_up from "./rests/t20rest_up.png";
import t21rest_down from "./rests/t21rest_down.png";
import t21rest_up from "./rests/t21rest_up.png";
import t22rest_down from "./rests/t22rest_down.png";
import t22rest_middle from "./rests/t22rest_middle.png";
import t22rest_up from "./rests/t22rest_up.png";
import t23rest_middle from "./rests/t23rest_middle.png";
import t24rest_middle from "./rests/t24rest_middle.png";
import t25rest_middle from "./rests/t25rest_middle.png";
import t26rest_middle from "./rests/t26rest_middle.png";
import t27rest_down from "./rests/t27rest_down.png";
import t27rest_middle from "./rests/t27rest_middle.png";
import t27rest_up from "./rests/t27rest_up.png";
import t28rest_down from "./rests/t28rest_down.png";
import t28rest_up from "./rests/t28rest_up.png";
import t29rest_down from "./rests/t29rest_down.png";
import t29rest_up from "./rests/t29rest_up.png";
import t2rest_down from "./rests/t2rest_down.png";
import t2rest_up from "./rests/t2rest_up.png";
import t30rest_down from "./rests/t30rest_down.png";
import t30rest_up from "./rests/t30rest_up.png";
import t31rest_down from "./rests/t31rest_down.png";
import t31rest_up from "./rests/t31rest_up.png";
import t32rest_down from "./rests/t32rest_down.png";
import t3rest_down from "./rests/t3rest_down.png";
import t3rest_up from "./rests/t3rest_up.png";
import t4rest_down from "./rests/t4rest_down.png";
import t4rest_up from "./rests/t4rest_up.png";
import t5rest_down from "./rests/t5rest_down.png";
import t5rest_up from "./rests/t5rest_up.png";
import t6rest_down from "./rests/t6rest_down.png";
import t6rest_middle from "./rests/t6rest_middle.png";
import t6rest_up from "./rests/t6rest_up.png";
import t7rest_middle from "./rests/t7rest_middle.png";
import t8rest_middle from "./rests/t8rest_middle.png";
import t9rest_middle from "./rests/t9rest_middle.png";
import t8rest_center from "./rests/t8rest_center.png";
import t9rest_center from "./rests/t9rest_center.png";
import t9rest_left from "./rests/t9rest_left.png";
import t9rest_right from "./rests/t9rest_right.png";
import t8rest_left from "./rests/t8rest_left.png";
import t8rest_right from "./rests/t8rest_right.png";

const RestImages = [
  /*occlusal*/

  t1rest_up,
  t2rest_down,
  t2rest_up,
  t3rest_down,
  t3rest_up,
  t4rest_down,
  t4rest_up,
  t5rest_down,
  t5rest_up,
  t12rest_down,
  t12rest_up,
  t13rest_down,
  t13rest_up,
  t14rest_down,
  t14rest_up,
  t15rest_down,
  t15rest_up,
  t16rest_up,
  t17rest_down,
  t18rest_down,
  t18rest_up,
  t19rest_down,
  t19rest_up,
  t20rest_down,
  t20rest_up,
  t21rest_down,
  t21rest_up,
  t28rest_down,
  t28rest_up,
  t29rest_down,
  t29rest_up,
  t30rest_down,
  t30rest_up,
  t31rest_down,
  t31rest_up,
  t32rest_down,

  /*cingulum*/
  t6rest_down,
  t6rest_middle,
  t6rest_up,
  t11rest_down,
  t11rest_middle,
  t11rest_up,
  t22rest_down,
  t22rest_middle,
  t22rest_up,
  t27rest_down,
  t27rest_middle,
  t27rest_up,

  /*incisal*/
  t7rest_middle,
  t8rest_middle,
  t9rest_middle,
  t10rest_middle,
  t23rest_middle,
  t24rest_middle,
  t25rest_middle,
  t26rest_middle,

  //cingulam
  t8rest_right,
  t8rest_center,
  t8rest_left,
  t9rest_right,
  t9rest_center,
  t9rest_left,
];

const cingulam = {
  type: "cingulam",
  array: [
    t6rest_down,
    t6rest_middle,
    t6rest_up,
    t11rest_down,
    t11rest_middle,
    t11rest_up,
    t22rest_down,
    t22rest_middle,
    t22rest_up,
    t27rest_down,
    t27rest_middle,
    t27rest_up,
    t8rest_right,
    t8rest_center,
    t8rest_left,
    t9rest_right,
    t9rest_center,
    t9rest_left,
  ],
};
const incisal = {
  type: "incisal",
  array: [
    t7rest_middle,
    t8rest_middle,
    t9rest_middle,
    t10rest_middle,
    t23rest_middle,
    t24rest_middle,
    t25rest_middle,
    t26rest_middle,
  ],
};

const occlusal = {
  type: "occlusal",
  array: [
    t1rest_up,
    t2rest_down,
    t2rest_up,
    t3rest_down,
    t3rest_up,
    t4rest_down,
    t4rest_up,
    t5rest_down,
    t5rest_up,
    t12rest_down,
    t12rest_up,
    t13rest_down,
    t13rest_up,
    t14rest_down,
    t14rest_up,
    t15rest_down,
    t15rest_up,
    t16rest_up,
    t17rest_down,
    t18rest_down,
    t18rest_up,
    t19rest_down,
    t19rest_up,
    t20rest_down,
    t20rest_up,
    t21rest_down,
    t21rest_up,
    t28rest_down,
    t28rest_up,
    t29rest_down,
    t29rest_up,
    t30rest_down,
    t30rest_up,
    t31rest_down,
    t31rest_up,
    t32rest_down,
  ],
};
const RestIndex = {
  1: [null, 1],
  2: [2, 3],
  3: [4, 5],
  4: [6, 7],
  5: [8, 9],
  12: [10, 11],
  13: [12, 13],
  14: [14, 15],
  15: [16, 17],
  16: [null, 18],
  17: [19],
  18: [20, 21],
  19: [22, 23],
  20: [24, 25],
  21: [26, 27],
  28: [28, 29],
  29: [30, 31],
  30: [32, 33],
  31: [34, 35],
  32: [36],
  6: [37, 38, 39],
  11: [40, 41, 42],
  22: [43, 44, 45],
  27: [46, 47, 48],
  7: [49],
  8: [50, 57, 58, 59],
  9: [51, 60, 61, 62],
  10: [52],
  23: [53],
  24: [54],
  25: [55],
  26: [56],
};

export { RestImages, incisal, cingulam, occlusal, RestIndex };
