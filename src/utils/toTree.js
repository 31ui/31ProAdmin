/* eslint-disable*/
/**
 * isArray - 判断数据是否为数组类型
 * ======================================================================
 * @param {Array} arr - 需要检测的数据
 * @returns {Boolean}
 */
const isArray = arr => {
  const OP = Object.prototype;

  return OP.toString.apply(arr) === '[object Array]';
};

/**
 * isUndefined - 判断是否未定义
 * ======================================================================
 * @param {*} val - 需要检测的数据
 * @returns {Boolean}
 */
const isUndefined = val => typeof val === 'undefined';
/**
 * delChildrenFn - 判断node 节点下的children 长度是否为0 是则删除
 * ======================================================================
 * @param {* 必填} arr
 */

const delChildrenFn = arr => {
  arr.forEach(element => {
    if (element.children.length > 0) {
      delChildrenFn(element.children);
    }
    if (element.children && element.children.length === 0) {
      delete element.children;
    }
  });
};
/**
 * toTree - 将扁平的一维数组转化成树结构格式数据的工具，使用起来非常方便快捷。
 * ======================================================================
 * @param {Array} list - 希望转成树结构的数组格式数据
 * @param {Object} [options] - （可选）配置对象
 * @param {String|Number} [options.rootParentValue] - （可选）根节点的父节点值（默认值：-1）
 * @param {String} [options.parentKey] - （可选）父节字段（属性）名（默认值：'pid'）
 * @param {String} [options.nodeKey] - （可选）节点字段（属性）名（默认值：'id'）
 * @param {String} [options.nodeLabel] - （可选）自定义节点文本字段名称（默认值：''）
 * @param {String} [options.nodeText] - （可选）自定义文本字段（在节点属性中）取值的字段名称（默认值：''）
 * @returns {Array|Object}
 */

const toTree = (list, options) => {
  // map 对象，格式为：唯一标识 : 索引值
  const map = {};
  // 最终的树结构的数组对象
  const root = [];

  // 默认配置
  let rootParentValue = -1;
  let parentKey = 'pid';
  let nodeKey = 'id';
  let nodeLabel = '';
  let nodeText = '';
  // 不是数组类型数据，返回空对象
  if (!isArray(list)) {
    return null;
  }

  // 如果是空数组，则返回空数组
  if (list.length < 1) {
    return root;
  }

  // 设置了自定义配置
  if (options) {
    // 自定义的根节点 parent 值
    if (!isUndefined(rootParentValue)) {
      rootParentValue = options.rootParentValue;
    }

    // 自定义的父节点字段名称
    if (!isUndefined(options.parentKey)) {
      parentKey = options.parentKey;
    }

    // 自定义的节点字段名称
    if (!isUndefined(options.nodeKey)) {
      nodeKey = options.nodeKey;
    }

    // 自定义节点文本字段名称
    if (!isUndefined(options.nodeLabel)) {
      nodeLabel = options.nodeLabel;
    }

    // 自定义文本字段（在节点属性中）取值的字段名称
    if (!isUndefined(options.nodeText)) {
      nodeText = options.nodeText;
    }
  }
  list.forEach((node, i) => {
    // 获取 map 对象的属性名称
    const key = node[nodeKey];
    // 希望配置自定义的 node 显示文本的字段
    // 必须同时设置 nodeLabel 和 nodeText
    if (nodeText && nodeLabel) {
      // 添加自定义的文本字段（属性）
      node[nodeLabel] = node[nodeText];
    }
    // 生成 map 数据，（注意）每个属性的值设置为 list 每个值的索引值
    map[key] = i;
    // 为每个节点添加 children 属性，用来存储子节点
    node.children = [];
  });
  list.forEach(node => {
    // 获取 node 节点的父节点字段（属性）的值
    const parentValue = node[parentKey];
    // 获取子节点
    const child = list[map[parentValue]];
    // 根（一级）节点之外的子节点
    if (String(parentValue) !== String(rootParentValue)) {
      child.children.push(node);
    } else {
      // 添加根节点
      root.push(node);
    }
  });
  if (root.length > 0) {
    delChildrenFn(root);
  }
  return root;
};
export default toTree;
